# Laravel Tinker és Seeding Parancsok

## User létrehozása és lekérdezése

### Tinker használata

```php
// Tinker indítása
php artisan tinker

// Új felhasználó létrehozása
User::create([
    'name' => 'Joe', 
    'email' => 'joe@example.com', 
    'password' => 'password123'
]);

// Felhasználó lekérdezése
User::find(1);
```

## DatabaseSeeder.php példa

### Adatfeltöltés factory használat nélkül

```php
$users = User::factory(10)->create();
$posts = collect();

for ($i = 0; $i < 20; $i++) {
    $posts->add(Post::create([
        'title' => fake()->words(3, true),
        'content' => fake()->paragraph(),
        'is_public' => fake()->boolean(),
        'author_id' => $users->random()->id // 1:N kapcsolat
    ]));
}

for ($i = 0; $i < 5; $i++) {
    $c = Category::create([
        'name' => fake()->word(),
        'color' => fake()->hexColor()
    ]);
    $c->posts()->sync($posts->random(rand(1, 5))->pluck('id')); // N:N kapcsolat
}
```


### DatabaseSeeder.php - Factory alapú adatfeltöltés

```php
// 10 rendes felhasználó létrehozása
User::factory(10)->create();

// Admin felhasználó létrehozása specifikus email és is_admin flag-gel
User::factory()->create(['email'=>'admin@admin.admin', 'is_admin'=> true]);

// 20 bejegyzés létrehozása
$posts = Post::factory(20)->create();

// 5 kategória létrehozása és mindegyikhez N:N kapcsolat szinkronizálása
Category::factory(5)->create()->each(function ($c) use ($posts){
    // Véletlenszerűen 1-5 bejegyzést rendelünk hozzá az aktuális kategóriához
    $c->posts()->sync($posts->random(rand(1, 5))->pluck('id'));
});
```


### Megjegyzések

- **1:N kapcsolat**: Egy user több post-ot írhat
- **N:N kapcsolat**: Egy post több category-ben lehet, egy category több post-ot tartalmazhat
- **Factory vs Create**: Factory-k újrahasznosíthatók, create() direkt adatbevitel