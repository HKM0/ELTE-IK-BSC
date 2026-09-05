<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Membership>
 */
class MembershipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(), // ez csak random szo, de a DatabaseSeeder-ben amugy is felulirom
            'max_reservations' => fake()->numberBetween(1, 5),
            'max_loans' => fake()->numberBetween(1, 5),
        ];
    }
}
