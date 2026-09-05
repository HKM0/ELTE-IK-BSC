<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Country extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = ["name", "email", "password"];
    protected $hidden = ["password"];

    public function songs(){
        return $this -> hasMany(Song::class);
    }

    public function votes(){
        return $this -> hasMany(Vote::class, "from_country_id");
    }
}
