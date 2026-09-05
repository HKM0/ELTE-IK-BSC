<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = ["title", "artist", "year", "country_id"];

    public function country(){
        return $this -> belongsTo(Country::class);
    }

    public function votes(){
        return $this -> hasMany(Vote::class, "to_song_id");
    }
}
