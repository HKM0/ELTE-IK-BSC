<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory(10)->create();
    
        User::factory()->create(['email'=>'admin@admin.admin', 'is_admin'=> true]);
        $posts = Post::factory(20)->create();
        Category::factory(5)->create()->each(function ($c) use ($posts){
            $c->posts()->sync($posts->random(rand(1, 5))->pluck('id'));
        });
        

    }
}
