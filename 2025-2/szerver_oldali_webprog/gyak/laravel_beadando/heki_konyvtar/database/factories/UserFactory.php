<?php

namespace Database\Factories;

//use App\Models\Membership;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),

            //a leiras alapjan ugye nem kell tagnak lennie regisztracio utan, de ha mar megirtam itt maradt.
            //'membership_id' => Membership::factory(),
            //'member_until_date' => fake()->dateTimeBetween('now', '+1 year')->format('Y-m-d'),

            'membership_id' => null,
            'member_until_date' => null,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
