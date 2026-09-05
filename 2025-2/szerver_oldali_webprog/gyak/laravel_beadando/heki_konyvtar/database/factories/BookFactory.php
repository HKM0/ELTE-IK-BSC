<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->words(rand(2, 3), true),
            'writer' => fake()->name(),
            'type' => fake()->randomElement(['könyv', 'folyóirat', 'kotta', 'térkép', 'képregény']),
            'year' => fake()->numberBetween(1900, 2026),
            'language' => fake()->randomElement(['hu', 'en', 'de', 'fr', 'it', 'ru', 'es', 'la', 'pl']),
            'isbn' => str_replace('-', '', fake()->isbn13()), // 'isbn' => fake()->numerify('#############'),
            'cover_image' => null,
        ];
    }
}
