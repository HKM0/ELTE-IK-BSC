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
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->boolean('televote');
            $table->foreignId('from_country_id')->constrained('countries', 'id')->onDelete('cascade');
            $table->foreignId('to_song_id')->constrained('songs', 'id')->onDelete('cascade');
            $table->integer('points');
            $table->timestamps();
            $table->unique(['televote', 'from_country_id', 'to_song_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
