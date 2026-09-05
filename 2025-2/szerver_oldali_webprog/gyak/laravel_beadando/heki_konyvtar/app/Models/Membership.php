<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Membership extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'max_reservations', 'max_loans'];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
