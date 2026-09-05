<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Membership;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'membership_id' =>
            Membership::factory()->create([
                'name' => 'Adminisztrátor',
                'max_reservations' => 99,
                'max_loans' => 99
            ])->id,
            'member_until_date' => '9999-12-31',
        ]);

        // sima user
        $tagsag = Membership::factory()->createMany([
            ['name' => 'Bronz', 'max_reservations' => 1, 'max_loans' => 2],
            ['name' => 'Ezüst', 'max_reservations' => 2, 'max_loans' => 4],
            ['name' => 'Arany', 'max_reservations' => 5, 'max_loans' => 10],
        ]);

        $felhasznalo = User::factory(5)->create([
            'membership_id' => fn() => $tagsag->random()->id,
        ]);

        $konyvek = Book::factory(20)->create();

        // aktiv kolcsonzes - 5
        $konyvek->take(5)->each(function ($konyv) use ($felhasznalo) {
            $kezdNap = now()->subDays(rand(1, 15));
            $konyv->users()->attach($felhasznalo->random()->id, [
                'start_date' => $kezdNap->format('Y-m-d'),
                'deadline_date' => $kezdNap->copy()->addDays(30)->format('Y-m-d'),
                'end_date' => null,
                'is_reserved' => false,
            ]);
        });

        // regi kolcsonzes - 5
        $konyvek->skip(5)->take(5)->each(function ($konyv) use ($felhasznalo) {
            $kezdNap = now()->subDays(rand(40, 60));
            $konyv->users()->attach($felhasznalo->random()->id, [
                'start_date' => $kezdNap->format('Y-m-d'),
                'deadline_date' => $kezdNap->copy()->addDays(30)->format('Y-m-d'),
                'end_date' => $kezdNap->copy()->addDays(rand(5, 25))->format('Y-m-d'),
                'is_reserved' => false,
                'payed_total_fee' => rand(0, 5) > 3 ? 500 : 0,
            ]);
        });

        // elojegyzesek - 4
        $konyvek->skip(10)->take(4)->each(function ($konyv) use ($felhasznalo) {
            $konyv->users()->attach($felhasznalo->random()->id, [
                'start_date' => null,
                'deadline_date' => null,
                'end_date' => null,
                'is_reserved' => true,
                'payed_total_fee' => 300,
            ]);
        });

        // 6 konyv szabadon maradt

    }
}
