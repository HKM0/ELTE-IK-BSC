<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name'
    ];

    public function students(){
        return $this -> belongsToMany(Student::class) -> withPivot(['high_level', 'result_percent']);
    }
}
