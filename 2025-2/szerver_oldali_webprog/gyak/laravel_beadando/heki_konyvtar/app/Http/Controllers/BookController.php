<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBookRequest;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateBookRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\User;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::query();

        // szures
        if ($request->filled('writer')) {
            $query->where('writer', 'like', '%' . $request->writer . '%');
        }
        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }
        if ($request->filled('year')) {
            $query->where('year', $request->year);
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('language')) {
            $query->where('language', $request->language);
        }

        // rendezes, lapozas
        $books = $query->orderBy('writer')
            ->orderBy('title')
            ->paginate(10)
            ->withQueryString();

        return view('books.index', compact('books'));
    }

    public function show(Book $book)
    {
        // aktualis kolcsonzesek
        $activeLoan = $book->users()
            ->wherePivot('is_reserved', false)
            ->whereNull('book_user.end_date')
            ->first();

        // reserved
        $activeReservation = $book->users()
            ->wherePivot('is_reserved', true)
            ->whereNull('book_user.start_date')
            ->first();

        // felhasznalok lekerese
        $users = [];
        $user = Auth::user();

        if ($user && $user->membership?->name === 'Adminisztrátor') {
            $users = User::all();
        }

        return view('books.show', compact('book', 'activeLoan', 'activeReservation', 'users'));
    }


    public function create(Request $request)
    {
        Gate::authorize('create', Book::class);

        return view('books.create');
    }

    public function store(StoreBookRequest $request)
    {
        /*
        // admin check
        if ($request->user()->membership?->name !== 'Adminisztrátor') {
            abort(403, 'Nincs jogosultságod könyv létrehozásához!');
        }
        */

        $validated = $request->validated();

        // kep mentes ha fel van toltve
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('covers', 'public');
            $validated['cover_image'] = $path;
        }

        Book::create($validated);

        // vissza a fooldalra
        return redirect()->route('books.index')->with('success', 'A könyv sikeresen létrejött!');
    }

    // modosit
    public function edit(Book $book)
    {
        Gate::authorize('update', $book);
        return view('books.edit', compact('book'));
    }

    public function update(UpdateBookRequest $request, Book $book)
    {
        Gate::authorize('update', $book);
        $validated = $request->validated();

        if ($request->hasFile('cover_image')) {
            // regi kep torles
            if ($book->cover_image && Storage::disk('public')->exists($book->cover_image)) {
                Storage::disk('public')->delete($book->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('covers', 'public');
        }

        $book->update($validated);

        return redirect()->route('books.show', $book)->with('success', 'A könyv adatai sikeresen frissültek!');
    }

    // soft delete
    public function destroy(Book $book)
    {
        Gate::authorize('delete', $book);

        $book->delete();

        return redirect()->route('books.index')->with('success', 'Könyv archiválva!');
    }

    // hard delete
    public function forceDestroy($id)
    {
        $book = Book::withTrashed()->findOrFail($id);

        Gate::authorize('forceDelete', $book);

        // regi kep torles
        if ($book->cover_image && Storage::disk('public')->exists($book->cover_image)) {
            Storage::disk('public')->delete($book->cover_image);
        }

        $book->users()->detach();

        $book->forceDelete();

        return redirect()->route('books.index')->with('success', 'A könyv véglegesen törölve lett!');
    }

    public function cancelReservation(Request $request, Book $book)
    {
        // elojegyzo keres, lecsatol
        $reservation = $book->users()->wherePivot('is_reserved', true)->first();

        if ($reservation) {
            Gate::authorize('deleteReservation', [$book, $reservation]);

            $book->users()->wherePivot('is_reserved', true)->detach($reservation->id);
        }

        return redirect()->back()->with('success', 'Előjegyzés törölve!');
    }

    public function borrow(Request $request, Book $book)
    {
        Gate::authorize('borrow', $book);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $targetUser = User::findOrFail($validated['user_id']);

        // foglalt check
        $activeLoan = $book->users()->wherePivot('is_reserved', false)->whereNull('book_user.end_date')->first();
        if ($activeLoan) {
            return redirect()->back()->with('error', 'A könyv már ki van kölcsönözve!');
        }

        $activeReservation = $book->users()->wherePivot('is_reserved', true)->whereNull('book_user.start_date')->first();
        if ($activeReservation && $activeReservation->id !== $targetUser->id) {
            return redirect()->back()->with('error', 'A könyvet más már előjegyezte!');
        }

        // tag check
        if (!$targetUser->membership) {
            return redirect()->back()->with('error', 'A felhasználónak nincs tagsága!');
        }

        // tag ervenyes check
        if ($targetUser->member_until_date && $targetUser->member_until_date < now()->startOfDay()) {
            return redirect()->back()->with('error', 'A felhasználó tagsága lejárt!');
        }

        // kolcson limit check
        $activeLoansCount = $targetUser->books()->wherePivot('is_reserved', false)->whereNull('book_user.end_date')->count();
        if ($activeLoansCount >= $targetUser->membership->max_loans) {
            return redirect()->back()->with('error', 'A felhasználó elérte a maximális kölcsönzési limitet!');
        }

        // datum
        $startDate = now()->startOfDay();
        $defaultDeadline = now()->addDays(30)->startOfDay();
        $deadlineDate = $defaultDeadline;

        if ($targetUser->member_until_date && $targetUser->member_until_date < $defaultDeadline) {
            $deadlineDate = $targetUser->member_until_date->startOfDay();
        }

        /// mentes
        if ($activeReservation && $activeReservation->id === $targetUser->id) {
            // elojegyzes -> kolcsonzes konverzio
            $book->users()
                ->wherePivot('is_reserved', true)
                ->wherePivotNull('start_date')
                ->updateExistingPivot($targetUser->id, [
                    'is_reserved' => false,
                    'start_date' => $startDate->format('Y-m-d'),
                    'deadline_date' => $deadlineDate->format('Y-m-d'),
                ]);
        } else {
            // Új kölcsönzés
            $book->users()->attach($targetUser->id, [
                'is_reserved' => false,
                'start_date' => $startDate->format('Y-m-d'),
                'deadline_date' => $deadlineDate->format('Y-m-d'),
                'payed_total_fee' => 0,
            ]);
        }

        return redirect()->back()->with('success', 'A könyv sikeresen kikölcsönözve!');
    }

    public function returnBook(Request $request, Book $book)
    {
        Gate::authorize('returnBook', $book);

        $activeLoan = $book->users()
            ->wherePivot('is_reserved', false)
            ->whereNull('book_user.end_date')
            ->first();

        if (!$activeLoan) {
            return redirect()->back()->with('error', 'Nincs aktív kölcsönzés ezen a könyvön!');
        }

        $endDate = now()->startOfDay();
        $deadlineDate = Carbon::parse($activeLoan->pivot->deadline_date)->startOfDay();

        // kesedelmi dij
        $lateFee = 0;
        if ($endDate > $deadlineDate) {
            $daysLate = $deadlineDate->diffInDays($endDate);
            $lateFee = $daysLate * 100;
        }

        $newTotalFee = $activeLoan->pivot->payed_total_fee + $lateFee;

        //visszahoz kezel
        $book->users()
            ->wherePivot('is_reserved', false)
            ->wherePivotNull('end_date')
            ->updateExistingPivot($activeLoan->id, [
                'end_date' => $endDate->format('Y-m-d'),
                'payed_total_fee' => $newTotalFee,
            ]);

        return redirect()->back()->with('success', 'A könyv sikeresen visszahozva! Késedelmi díj: ' . $lateFee . ' Ft.');
    }

    // lefoglal
    public function reserve(StoreReservationRequest $request, Book $book)
    {
        // elojegyzes check
        if ($book->users()->wherePivot('is_reserved', true)->exists()) {
            return back()->with('error', 'A könyv már elő van jegyezve.');
        }

        $book->users()->attach($request->user()->id, [
            'is_reserved' => true,
            'payed_total_fee' => 300,
        ]);

        return back()->with('success', 'Sikeres előjegyzés.');
    }

    // kolcsonzes hosszabit
    public function extend(User $user, Book $book)
    {
        //Gate::authorize('extendLoan', $book);
        Gate::authorize('extendLoan', [$book, $user]);

        $loan = $book->users()
            ->wherePivot('user_id', $user->id)
            ->wherePivot('is_reserved', false)
            ->wherePivotNull('end_date')
            ->firstOrFail();

        if ($loan->pivot->is_extended) {
            return back()->with('error', 'A kölcsönzés már volt hosszabbítva.');
        }

        $now = now()->startOfDay();
        $deadline = Carbon::parse($loan->pivot->deadline_date)->startOfDay();

        // kesedelmi dij
        $lateFee = 0;
        if ($now > $deadline) {
            $lateFee = $deadline->diffInDays($now) * 100;
        }

        // hatarido
        // keseses hisszabitas kicsit cseles lett, vege+30 nap kulonben pedig aktualis+30 nap.
        $baseDate = $now > $deadline ? $deadline : $now;
        $newDeadline = $baseDate->copy()->addDays(30);

        // tagsag lejart check
        if ($user->member_until_date && Carbon::parse($user->member_until_date) < $newDeadline) {
            $newDeadline = Carbon::parse($user->member_until_date);
        }

        $book->users()->wherePivotNull('end_date')->updateExistingPivot($user->id, [
            'deadline_date' => $newDeadline->format('Y-m-d'),
            'is_extended' => true,
            'payed_total_fee' => $loan->pivot->payed_total_fee + $lateFee,
        ]);

        return back()->with('success', 'Sikeres hosszabbítás! Következő határidő: ' . $newDeadline->format('Y-m-d'));
    }
}
