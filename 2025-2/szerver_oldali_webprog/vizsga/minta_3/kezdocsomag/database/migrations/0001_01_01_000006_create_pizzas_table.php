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
        Schema::create('pizzas', function (Blueprint $table) {
            $table -> id();
            $table -> string('name') -> nullable();
            $table -> enum('size', [26, 32, 50]);
            $table -> enum('base', ['tomato', 'cream', 'bbq', 'none']);
            $table -> boolean('cheese_crust') -> default(false);
            $table -> foreignId('customer_id') -> constrained() -> onDelete('cascade');
            $table -> timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pizzas');
    }
};
