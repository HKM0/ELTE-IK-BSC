<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = ["televote", "from_country_id", "to_song_id", "points"];

    public function country(){
        return $this -> belongsTo(Country::class, "from_country_id");
    }

    public function song(){
        return $this -> belongsTo(Song::class, "to_song_id");
    }
}
