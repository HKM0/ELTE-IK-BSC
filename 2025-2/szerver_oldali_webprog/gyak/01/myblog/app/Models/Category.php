<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'color'
    ];

    public function posts(){
        return $this->belongsToMany(Post::class)->withTimestamps();
    }

}
