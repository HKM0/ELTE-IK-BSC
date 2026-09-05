<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function dashboard()
    {
        if (Auth::user()->membership?->name !== 'Adminisztrátor') {
            return redirect()->route('books.index')->with('success', 'Sikeres bejelentkezés!');
        }

        Gate::authorize('viewAny', User::class);

        // stat szamit
        $bookCount = Book::count();

        // kolcsonzesek
        $loanCount = DB::table('book_user')
            ->where('is_reserved', false)
            ->count();

        // ossz dijak
        $totalFees = DB::table('book_user')->sum('payed_total_fee');

        // felhasznalo lista
        $users = User::with('membership')->paginate(10);

        return view('admin.dashboard', compact('bookCount', 'loanCount', 'totalFees', 'users'));
    }
}
