<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //

    protected $fillable = [
        'name',
        'color'
    ];

    public function posts(){
        return $this->belongsToMany(Post::class)->withTimestamps();
    }

}
