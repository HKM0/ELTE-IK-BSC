<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class School extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'address',
        'password'
    ];

    protected $hidden = [
        'password'
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    public function students(){
        return $this -> hasMany(Student::class);
    }
}
