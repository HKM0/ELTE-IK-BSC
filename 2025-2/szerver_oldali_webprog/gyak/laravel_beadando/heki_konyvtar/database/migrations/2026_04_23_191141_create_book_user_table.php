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
        Schema::create('book_user', function (Blueprint $table) {
            $table->id();
            // az onDelete('cascade') amit oran hasznaltunk, ugyanaz.
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('book_id')->constrained()->cascadeOnDelete();
            $table->date('start_date')->nullable();
            $table->date('deadline_date')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('is_extended')->default(false);
            $table->boolean('is_reserved')->default(false);
            $table->unsignedInteger('payed_total_fee')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_user');
    }
};