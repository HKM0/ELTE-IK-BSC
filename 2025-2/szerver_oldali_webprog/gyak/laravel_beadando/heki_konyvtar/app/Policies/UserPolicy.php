<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
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
    public function view(User $user, User $model): bool
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
    //felhasznalo adat modositas
    public function update(User $user, User $model): bool
    {
        return $user->id === $model->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    //picit kerdeses, nem talaltam a leirasban barmit ami tiltana hogy a felhasznalo torolhesse a sajat profiljat.
    public function delete(User $user, User $model): bool
    {
        return $user->id === $model->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return false;
    }

    // global admin, mindenhez hozzafer.
    public function before(User $user, string $ability): ?bool
    {
        if ($user->membership?->name === 'Adminisztrátor') {
            return true;
        }
        return null;
    }

    //felhasznalo kolcsonzes lista
    public function viewLoans(User $user, User $model): bool
    {
        return false;
    }


}
