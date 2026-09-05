<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topping extends Model
{
    protected $fillable = [
        'name',
        'price'
    ];

    public function pizzas(){
        return $this -> belongsToMany(Pizza::class) -> withPivot('amount');
    }
}
