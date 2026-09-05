<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'writer',
        'type',
        'year',
        'language',
        'isbn',
        'cover_image',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot(['start_date', 'deadline_date', 'end_date', 'is_extended', 'is_reserved', 'payed_total_fee'])
            ->withTimestamps();
    }
}
