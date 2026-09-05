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
        Schema::create('pizza_topping', function (Blueprint $table) {
            $table -> foreignId('pizza_id') -> constrained() -> onDelete('cascade');
            $table -> foreignId('topping_id') -> constrained() -> onDelete('cascade');
            $table -> integer('amount') -> default(1);
            $table -> primary(['pizza_id', 'topping_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pizza_topping');
    }
};
