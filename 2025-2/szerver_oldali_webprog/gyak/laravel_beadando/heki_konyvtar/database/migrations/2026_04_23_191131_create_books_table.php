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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->string('writer', 255);
            $table->enum('type', ['könyv', 'folyóirat', 'kotta', 'térkép', 'képregény']);
            $table->unsignedSmallInteger('year');
            $table->enum('language', ['hu', 'en', 'de', 'fr', 'it', 'ru', 'es', 'la', 'pl']);
            $table->char('isbn', 13);
            $table->string('cover_image')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
