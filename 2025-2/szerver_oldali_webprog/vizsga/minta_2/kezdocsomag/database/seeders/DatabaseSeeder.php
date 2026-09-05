<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\Song;
use App\Models\Vote;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Generate the 37 + 1 participating countries
        $countries = ["Albania", "Armenia", "Australia", "Austria", "Azerbaijan", "Belgium", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Iceland", "Ireland", "Israel", "Italy", "Latvia", "Lithuania", "Luxemburg", "Malta", "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "San Marino", "Serbia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom"];
        $countryIds = collect();
        foreach ($countries as $country){
            $safe = strtolower(str_replace(" ", "_", $country));
            $c = Country::create([
                "name" => $country,
                "email" => "jury_{$safe}@eurovision.tv",
                "password" => password_hash("pw_$safe", PASSWORD_DEFAULT)
            ]);
            $countryIds -> add($c -> id);
        }

        // Pick 26 finalists from 2023 to 2025
        for ($year = 2023; $year <= 2025; $year++){
            $finalistCountryIds = $countryIds -> random(26);
            $songs = collect();
            foreach($finalistCountryIds as $finalist){
                $song = Song::create([
                    "title" => $faker -> words(rand(2, 5), true),
                    "artist" => $faker -> name(),
                    "country_id" => $finalist,
                    "year" => $year
                ]);
                $songs -> add($song);
            }
            // All countries pick their top 10 songs twice (jury and televote)
            $points = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];
            $votes = [];
            for ($type = 0; $type <= 1; $type++){
                foreach($countryIds as $country){
                    $topSongs = $songs -> filter(fn($s) => $s -> country_id !== $country) -> random(10);
                    foreach($topSongs as $i => $topSong){
                        $votes[] = [
                            "from_country_id" => $country,
                            "to_song_id" => $topSong -> id,
                            "points" => $points[$i],
                            "televote" => boolval($type),
                            "created_at" => now(),
                            "updated_at" => now()
                        ];
                    }
                }
            }
            DB::table('votes')->insert($votes); // Bulk insert for speed
        }
    }
}
