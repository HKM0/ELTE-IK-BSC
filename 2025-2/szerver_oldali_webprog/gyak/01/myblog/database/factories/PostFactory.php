<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
                'title' => fake()->words(3, true),
                'content' => fake()->paragraph(),
                'is_public' => fake()->boolean(),
                'author_id' => User::inRandomOrder()->first()->id // 1:N
            // 'author_id' => User::factory()
        ];
    }
}
