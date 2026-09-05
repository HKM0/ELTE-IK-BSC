<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table -> id();
            $table -> string('family_name');
            $table -> string('given_name');
            $table -> string('mother_name');
            $table -> date('birthdate');
            $table -> string('birthplace');
            $table -> foreignId('school_id') -> constrained() -> onDelete('restrict');
            $table -> timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
