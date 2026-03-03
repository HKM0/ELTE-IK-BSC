<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //

    protected $fillable = [
        'title',
        'content',
        'is_public',
        'author_id'

    ];
    public function author(){
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories(){
        return $this->belongsToMany(Category::class)->withTimestamps();
    }
}
