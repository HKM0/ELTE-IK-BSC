<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'id',
        'family_name',
        'given_name',
        'mother_name',
        'birthdate',
        'birthplace',
        'school_id'
    ];

    public function school(){
        return $this -> belongsTo(School::class);
    }

    public function subjects(){
        return $this -> belongsToMany(Subject::class) -> withPivot(['high_level', 'result_percent']);
    }
}
