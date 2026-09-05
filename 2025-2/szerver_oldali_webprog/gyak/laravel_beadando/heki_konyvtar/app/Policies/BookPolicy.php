<?php

namespace App\Policies;

use App\Models\Book;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BookPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Book $book): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Book $book): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Book $book): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Book $book): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Book $book): bool
    {
        return false;
    }

    public function before(User $user, string $ability): bool|null
    {
        if ($user->membership?->name === 'Adminisztrátor') {
            return true;
        }
        return null;
    }

    // kolcsonzes hosszabit
    public function extendLoan(User $user, Book $book, User $targetUser): bool
    {
        return $user->id === $targetUser->id && $book->users()
            ->wherePivot('user_id', $user->id)
            ->wherePivot('is_reserved', false)
            ->wherePivotNull('end_date')
            ->exists();
    }

    public function deleteReservation(User $user, Book $book, User $reservationOwner): bool
    {
        return $user->id === $reservationOwner->id;
    }

    //konyv kolcsonzes
    public function borrow(User $user, Book $book): bool
    {
        return false;
    }
    //konyv visszahozas
    public function returnBook(User $user, Book $book): bool
    {
        return false;
    }
}
