<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Membership;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, ?User $user = null): View
    {
        $targetUser = $user ?? $request->user();

        Gate::authorize('update', $targetUser);

        return view('profile.edit', [
            'user' => $targetUser,
            'memberships' => Membership::all(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request, ?User $user = null): RedirectResponse
    {
        $targetUser = $user ?? $request->user();

        Gate::authorize('update', $targetUser);

        $targetUser->fill($request->validated());

        if ($targetUser->isDirty('email')) {
            $targetUser->email_verified_at = null;
        }

        $targetUser->save();

        if (Auth::id() === $targetUser->id) {
            return Redirect::route('profile.edit')->with('status', 'profile-updated');
        }

        return Redirect::route('profile.edit.user', $targetUser)->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request, ?User $user = null): RedirectResponse
    {
        $targetUser = $user ?? $request->user();

        Gate::authorize('delete', $targetUser);

        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        //sajat profil torol
        if (Auth::id() === $targetUser->id) {
            Auth::logout();
            $targetUser->delete();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return Redirect::to('/');
        }

        //admin felhasznalo torles
        $targetUser->delete();
        return Redirect::route('dashboard')->with('success', 'Felhasználó törölve.');
    }

    public function loans(Request $request, User $user): View
    {
        // auth check, policy miatt csak admin.
        Gate::authorize('viewLoans', $user);

        // aktiv kolcsonzesek
        $activeLoans = $user->books()
            ->wherePivot('is_reserved', false)
            ->wherePivotNull('end_date')
            ->orderByPivot('deadline_date', 'asc')
            ->get();

        // regi kolcsonzesek
        $pastLoans = $user->books()
            ->wherePivot('is_reserved', false)
            ->wherePivotNotNull('end_date')
            ->orderByPivot('end_date', 'desc')
            ->get();

        // elojegyzesek
        $reservations = $user->books()
            ->wherePivot('is_reserved', true)
            ->get();

        return view('profile.loans', compact('user', 'activeLoans', 'pastLoans', 'reservations'));
    }
}
