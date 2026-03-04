<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Post extends Model
{
    use HasFactory;

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
