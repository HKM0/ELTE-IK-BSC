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
        Schema::create('student_subject', function (Blueprint $table) {
            $table -> foreignId('student_id') -> constrained() -> onDelete('restrict');
            $table -> string('subject_id');
            $table -> foreign('subject_id') ->references('id') -> on('subjects') -> onDelete('restrict');
            $table -> boolean('high_level') -> default(false);
            $table -> integer('result_percent') -> nullable();
            $table -> primary(['student_id', 'subject_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_subject');
    }
};
