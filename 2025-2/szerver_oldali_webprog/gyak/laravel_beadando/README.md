# Laravel - konyvtar_beadando

---

A readme csak azért van hogyha valamit elrontok, tudjam mi és hol volt hibás. 
Valamint ha közzéteszem, látható legyen mások számára, hogyan haladtam a feladatokkal.
Egyébként kb. végig az [órai jegyzeteimet](titok) követtem!

---

<details>
<summary><h2>Projekt kezdés:</h2></summary>

1. projekt létrehozása
     - laravel telepítése:
         ```bash
         composer global require laravel/installer
         ```
     - laravel projekt létrehozás: 
         ```bash
         laravel new heki_konyvtar
         ```
         <details>
         <summary>Beállítások</summary>

         | Kérdés | Válasz |
         | --- | --- |
         | Which starter kit would you like to install? [None] | none |
         | Which testing framework do you prefer? [Pest] | Pest |
         | Do you want to install Laravel Boost to improve AI assisted coding? (yes/no) [yes] | no |
         | Which database will your application use? [SQLite] | sqlite |
         | Would you like to run npm install --ignore-scripts and npm run build? (yes/no) [yes] | yes |

         </details>
     - projekt könyvtár:
         ```bash
         cd heki_konyvtar
         ```

---

2. Laravel Breeze telepítése
    - csomag telepítés
        ```Bash
        composer require laravel/breeze --dev
        ```
    - beállítás:
        ```bash
        php artisan breeze:install
        ```

        <details>
        <summary>Beállítások</summary>

        | Kérdés | Válasz |
        | --- | --- |
        | Which Breeze stack would you like to install? | blade |
        | Would you like dark mode support? (yes/no) [no] | yes |
        | Which testing framework do you prefer? [Pest] | 0 |

        </details>

    - itt hibát kaptam:
        ```text
        vite v8.0.10 building client environment for production...
        ✓ 3 modules transformed.
        ✗ Build failed in 674ms
        error during build:
        Build failed with 1 error:

        [UNRESOLVED_IMPORT] Error: Could not resolve './bootstrap' in resources/js/app.js
        at resources/js/app.js:1:8
        import './bootstrap';
        Module not found.
        ```
        A megoldás, hogy a `.\resources\js\app.js` első sorát (`import './bootstrap';`) ki kommenteltem, valószínűleg nem kell nekem bootstrap. 

---

</details>

<details>
<summary><h2>Adatbázis és modellek (3 pont)</h2></summary>

- A projekt relációs adatbázisra épül, és a szerkezetet a migrációk (`database/migrations`) határozzák meg.
- Az üzleti logikát és annak a kapcsolatait pedig az Eloquent modellek (`app/models`) határozzák meg.
- a teljes projekt 4 fő táblára épül, amit a migrációs fájlok hoznak létre.

1. Hiányzó táblák és modellek:
    ```Bash
    php artisan make:model Membership --migration
    php artisan make:model Book --migration
    php artisan make:migration create_book_user_table
    ```
    `book_user`-nek nem kell model, mert pivot tábla!

---

2. Sémák megírása / kieg.
    - mivel a `users` tábla hivatkozik a `membership`-re, a migrációs dátumot át kell írni a fájl nevében a `users` előttire, hogy a futás sorrendje jó legyen:
    `2026_04_23_191124_create_memberships_table.php` => `0000_00_00_000000_create_memberships_table.php`
    
    - migrációk (`database/migrations/`):
        - `create_memberships_table.php` -ban az `up` kiegészítve: 
            - tárolja a tagsági szinteket.
            - Megadja a `max_reservations` és `max_loans` korlátokat.
            előtte:
            ```php
            public function up(): void
            {
                Schema::create('memberships', function (Blueprint $table) {
                    $table->id();
                    $table->timestamps();
                });
            }
            ``` 
            utána:
            ```php
            public function up(): void
            {
                Schema::create('memberships', function (Blueprint $table) {
                    $table->id();
                    
                    // ezeket írtam ide:
                    //--------------------------------------------------------------
                    // a leírásból: 
                    // szöveg, nem lehet null és maximum 50 karakter.
                    $table->string('name', 50); // tagsági szint neve
                    // egész szám
                    $table->integer('max_reservations'); // max előjegyzett könyvek szám
                    // egész szám
                    $table->integer('max_loans'); // max kölcsönzött könyvek száma
                    //--------------------------------------------------------------
                    
                    $table->timestamps();
                });
            }
            ```
        - `create_users_table.php` -ban szintén az `up` kieg.:
            - Ez a Laravel beépített táblája.
            - Ugye, ide is kellettek plusz adatok, tehát felvettem a `membership_id`-t ,mint külső kulcs és a `member_until_date`-et, mint érvényességi idő.
            
            [innen szedtem](https://github.com/blankalang/szerver_1_csoport/blob/main/myblog/database/migrations/2026_02_18_141952_create_category_post_table.php#L17)
            előtte:
            ```php
            public function up(): void
            {
                Schema::create('users', function (Blueprint $table) {
                    $table->id();
                    $table->string('name');
                    $table->string('email')->unique();
                    $table->timestamp('email_verified_at')->nullable();
                    $table->string('password');
                    $table->rememberToken();
                    $table->timestamps();
                });
            ...
            }
            ```

            utána:
            ```php
            public function up(): void
            {
                Schema::create('users', function (Blueprint $table) {
                    $table->id();
                    $table->string('name');
                    $table->string('email')->unique();
                    $table->timestamp('email_verified_at')->nullable();
                    $table->string('password');

                    //ezeket írtam ide:
                    //--------------------------------------------------------------
                    // - ez adja a Membership 1:N User kapcsolatot, 
                    // - nullable() mert regisztráció után nem lehet tag => null
                    // - constrained() létrehozza a tényleges fizikai kapcsolatot, az idegen kulccsal.
                    // - nullOnDelete() mert ha töröljük Membershipet, nem töröljük a felhasználót.
                    $table->foreignId('membership_id')->nullable()->constrained()->nullOnDelete();
                    // - leírásban az volt, hogy "egészítsd ki egy mezővel: member_until_date [dátum]"
                    // - mivel nincs tagság, nem lehet lejárati dátum sem => null
                    $table->date('member_until_date')->nullable();
                    //--------------------------------------------------------------
                    $table->rememberToken();
                    $table->timestamps();
                });
            ...
            }
            ```
        - `create_books_table.php`-ben `up` kieg:
            - Ez a migráció tárolja a könyvek adatait, mint a (`cím`, `író`, `kiadás éve`, `isbn` és a `kép`)
            - itt ugye kellett a `softDelete`, ez azt csinálja, hogy a törölt könyveket fizikailag nem tűnteti el az adatbázisból, csak megkapják a `deleted_at` időbélyeget.
            előtte:
            ```php
            public function up(): void
            {
                Schema::create('books', function (Blueprint $table) {
                    $table->id();
                    $table->timestamps();
                });
            }
            ```
            utána:
            ```php
            public function up(): void
            {
                Schema::create('books', function (Blueprint $table) {
                    $table->id();
                    // ------------ezeket írtam ide a leírás alapján----------------------
                    $table->string('title', 255); // könyv címe [szöveg, nem lehet null, max 255 karakter]
                    $table->string('writer', 255); // szerző neve [szöveg, nem lehet null és max 255 char]
                    // dokumentum típusa [enum, a felsorolt értékekkel, nem lehet null]
                    $table->enum('type', ['könyv', 'folyóirat', 'kotta', 'térkép', 'képregény']); 
                    // megjelenés éve [egész szám]
                    $table->unsignedSmallInteger('year'); 
                    // dokumentum nyelve [enum beállított válaszlehetőségekkel]
                    $table->enum('language', ['hu', 'en', 'de', 'fr', 'it', 'ru', 'es', 'la', 'pl']);
                    // ISBN/ISSN szám [szöveg, konverzió miatt char, pontosan 13 karakterből álljon]
                    $table->char('isbn', 13); 
                    // borítókép [szöveg a fájlelérési utalásnak, nullable]
                    $table->string('cover_image')->nullable();
                    // -------------------------------------------------------------------

                    $table->timestamps();
                    // a leírásból: a könyvek esetében "puha törlést" (soft delete) kell alkalmazni
                    $table->softDeletes(); 
                });
            }
            ```
        - `create_book_user_table.php`-ben az `up` kieg:
            - Ez egy `pivot tábla`, a felhasználók és könyvek között.
            - Itt kezelem a kölcsönzéseket és előjegyzéseket is.
            - A felépítése úgy alakul, hogy:
                - vannak ugye a mettől meddig tart a kölcsönzés mezők, ezek a (`start_date`, `deadline_date`, `end_date`)
                - van egy hosszabítva volt -e mező, ami az (`is_extended`)
                - van egy előjegyzés mező, ez az (`is_reserved`)
                - és utoljára pedig van egy fizetett büntetéss mező ami a (`payed_total_fee`)
            előtte:
            ```php
            public function up(): void
            {
                Schema::create('book_user', function (Blueprint $table) {
                    $table->id();
                    $table->timestamps();
                });
            }
            ```
            utána:
            ```php
            public function up(): void
            {
                Schema::create('book_user', function (Blueprint $table) {
                    $table->id();
                    
                    // a leírásból: ide kellett beszerezni a mezőket a pivot táblához
                    //--------------------------------------------------------------
                    // külső kulcsok: kapcsolat a felhasználó és a könyv között, cascade törléssel
                    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                    $table->foreignId('book_id')->constrained()->cascadeOnDelete();
                    
                    // kölcsönzés kezdete [dátum, alapból null a leírás szerint]
                    $table->date('start_date')->nullable();
                    // kölcsönzés határideje [dátum, null]
                    $table->date('deadline_date')->nullable();
                    // visszahozatal dátuma [dátum, null]
                    $table->date('end_date')->nullable();
                    // meghosszabbított-e állapota [logikai, alapból hamis]
                    $table->boolean('is_extended')->default(false);
                    // előjegyzés-e állapota [logikai, alapból hamis]
                    $table->boolean('is_reserved')->default(false);
                    // kifizetett teljes díj mentése [egész szám, alapból 0]
                    $table->unsignedInteger('payed_total_fee')->default(0);
                    //--------------------------------------------------------------
                    
                    $table->timestamps();
                });
            }
            ```
    - modellek (`app/Models/`):
        A modellek miatt az adatbázisban lévő adatok objektum-orientáltan és könnyen használhatók lesznek többek között a kontrollerekben.

        - `Membership.php`:
            - Ez a modell leír egy, "egy a többhöz" kapcsolatot (`hasMany(User::class)`)
            - Tehát egy tagsági szinthez több felhasználót társítok.
            előtte:
            ```php
            <?php

            namespace App\Models;

            use Illuminate\Database\Eloquent\Model;

            class Membership extends Model
            {
                //
            }
            ```
            utána:
            ```php
            <?php

            namespace App\Models;

            use Illuminate\Database\Eloquent\Model;
            use Illuminate\Database\Eloquent\Relations\HasMany;

            class Membership extends Model
            {
                protected $fillable = ['name', 'max_reservations', 'max_loans'];

                // a leírásból: 1:N kapcsolat a tagság és a felhasználók között
                public function users(): HasMany
                {
                    return $this->hasMany(User::class);
                }
            }
            ```
        - `User.php` kieg:
            - a `belongsTo(Membership::class)` mutat a tagságra.
            - a `belongsToMany(Book::class)` egy "több a többhöz" kapcsolat a könyvekkel.
            - a `->withPivot([...])`-os sor megadja, hogy a kapcsolótáblában lévő plusz mezők is meglegyenek, mikor a felhasználó könyveit kérem le. pl: `kölcsönzések száma`, `dátumok`, stb.
            előtte:
            ```php
            <?php

            namespace App\Models;

            // use Illuminate\Contracts\Auth\MustVerifyEmail;
            use Database\Factories\UserFactory;
            use Illuminate\Database\Eloquent\Attributes\Fillable;
            use Illuminate\Database\Eloquent\Attributes\Hidden;
            use Illuminate\Database\Eloquent\Factories\HasFactory;
            use Illuminate\Foundation\Auth\User as Authenticatable;
            use Illuminate\Notifications\Notifiable;

            #[Fillable(['name', 'email', 'password'])]
            #[Hidden(['password', 'remember_token'])]
            class User extends Authenticatable
            {
                /** @use HasFactory<UserFactory> */
                use HasFactory, Notifiable;

                /**
                * Get the attributes that should be cast.
                *
                * @return array<string, string>
                */
                protected function casts(): array
                {
                    return [
                        'email_verified_at' => 'datetime',
                        'password' => 'hashed',
                    ];
                }
            }
            ```
            kieg. utána:
            ```php
            //... stb import
            use Illuminate\Database\Eloquent\Relations\BelongsTo;
            use Illuminate\Database\Eloquent\Relations\BelongsToMany;

            #[Fillable(['name', 'email', 'password'])]
            #[Hidden(['password', 'remember_token'])]

            class User extends Authenticatable
            {
                /** @use HasFactory<UserFactory> */
                use HasFactory, Notifiable;

                //az eredeti azért lett törölve mert nehezebben átlátható, ez a forma ugyanazt csinálja, csak szépen külön van bontva.
                protected $fillable = [
                    'name',
                    'email',
                    'password',
                    'membership_id',
                    'member_until_date', // ide került 
                ];

                protected $hidden = [
                    'password',
                    'remember_token',
                ];

                /**
                 * Get the attributes that should be cast.
                 *
                 * @return array<string, string>
                 */
                protected function casts(): array
                {
                    return [
                        'email_verified_at' => 'datetime',
                        'password' => 'hashed',
                        // a leírásból: a tag_until_date egy dátum, érdemes kasztolni is
                        'member_until_date' => 'date',
                    ];
                }
            
                // a leírásból: N:1 (sok az egyhez) kapcsolat a Membership modellel (egy usernek egy tagsága van)
                public function membership(): BelongsTo
                {
                    return $this->belongsTo(Membership::class);
                }
            
                // a leírásból: N:M (több a többhöz) kapcsolat a könyvekkel, valamint kezelni kell az extra pivot attribútumokat
                public function books(): BelongsToMany
                {
                    return $this->belongsToMany(Book::class)
                        ->withPivot(['start_date', 'deadline_date', 'end_date', 'is_extended', 'is_reserved', 'payed_total_fee'])
                        ->withTimestamps(); // created_at és updated_at kezelés
                }
            }
            ```
        - `Book.php` kieg.:
            - itt a `softDelete`, azt csinálja, hogy a törölt könyveket fizikailag nem tűnnek el az adatbázisból, csak megkapják a `deleted_at` időbélyeget. 
            - a `softDelete` volt egyébként használva a `create_book_table`-ben is. 
            előtte:
            ```php
            <?php

            namespace App\Models;

            use Illuminate\Database\Eloquent\Model;

            class Book extends Model
            {
                //
            }
            ```
            utána:
            ```php
            <?php
            
            namespace App\Models;
            
            use Illuminate\Database\Eloquent\Model;
            use Illuminate\Database\Eloquent\SoftDeletes;
            use Illuminate\Database\Eloquent\Relations\BelongsToMany;
            
            class Book extends Model
            {
                // a leírásból: soft deletes (puha törlést) kell alkalmazni a könyvek módosításakor/törlésénél
                use SoftDeletes;
            
                protected $fillable = [
                    'title',
                    'writer',
                    'type',
                    'year',
                    'language',
                    'isbn',
                    'cover_image',
                ];
            
                // a leírásból: N:M kapcsolat a userekkel a pivot oszlopok lekérése miatt a modellekben is kell definiálni
                public function users(): BelongsToMany
                {
                    return $this->belongsToMany(User::class)
                        ->withPivot(['start_date', 'deadline_date', 'end_date', 'is_extended', 'is_reserved', 'payed_total_fee'])
                        ->withTimestamps();
                }
            }
            ```

---

</details>

<details>
<summary><h2>Seeder (5 pont)</h2></summary>

1. Factory fájlok létrehozása:
    ```Bash
    php artisan make:factory MembershipFactory
    php artisan make:factory BookFactory
    ```
    A `UserFactory` alapból benne van a Laravel-ben, csak módosítani kell.

2. Factory-k beállítása / kieg. (`database/factories/`):
    - `MembershipFactory.php` kieg.:
        ```php
        public function definition(): array
        {
            return [
                'name' => fake()->word(),
                'max_reservations' => fake()->numberBetween(1, 10),
                'max_loans' => fake()->numberBetween(1, 10),
            ];
        }
        ```
    - `BookFactory.php` kieg.:
        ```php
        public function definition(): array
        {
            return [
                'title' => fake()->words(rand(2, 3), true),
                'writer' => fake()->name(),
                'type' => fake()->randomElement(['könyv', 'folyóirat', 'kotta', 'térkép', 'képregény']),
                'year' => fake()->numberBetween(1900, 2026),
                'language' => fake()->randomElement(['hu', 'en', 'de', 'fr', 'it', 'ru', 'es', 'la', 'pl']),
                'isbn' => fake()->isbn13(),
                'cover_image' => null,
            ];
        }
        ```

3. Database Seeder beállítása:
    - A `database/seeders/DatabaseSeeder.php` fájlban:
        ```php
        public function run(): void
        {
            // a leírásból: fix "Adminisztrátor" nevű tagsági szint 99 limittel az előjegyzésre/kölcsönzésre,
            // ehhez egy dedikált admin fiókkal ('admin@admin.com'), lejárati dátum nélkül (9999-12-31)
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

            // a leírásból: további három ("Bronz", "Ezüst", "Arany") tagsági szintet is generálok
            $tagsag = Membership::factory()->createMany([
                ['name' => 'Bronz', 'max_reservations' => 1, 'max_loans' => 2],
                ['name' => 'Ezüst', 'max_reservations' => 2, 'max_loans' => 4],
                ['name' => 'Arany', 'max_reservations' => 5, 'max_loans' => 10],
            ]);

            // a leírásból: generálj még 5 felhasználót is valamelyik random ('Bronz', 'Ezüst', 'Arany') tagsággal
            $felhasznalo = User::factory(5)->create([
                'membership_id' => fn() => $tagsag->random()->id,
            ]);

            // a leírásból: generálj 20 db könyvet
            $konyvek = Book::factory(20)->create();

            // a leírásból: 5 esetben a könyv éppen ki van kölcsönözve (aktív kölcsönzés, start/deadline ki van töltve, nincs end_date mentve)
            $konyvek->take(5)->each(function ($konyv) use ($felhasznalo) {
                $kezdNap = now()->subDays(rand(1, 15));
                $konyv->users()->attach($felhasznalo->random()->id, [
                    'start_date' => $kezdNap->format('Y-m-d'),
                    'deadline_date' => $kezdNap->copy()->addDays(30)->format('Y-m-d'),
                    'end_date' => null,
                    'is_reserved' => false,
                ]);
            });

            // a leírásból: 5 esetben a könyvet már visszahozták (régi kölcsönzés, a visszahozatal end_date mentve van < ma)
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

            // a leírásból: 4 esetben a könyvre csak előjegyzés történt (nincs dátum adva, de is_reserved true)
            $konyvek->skip(10)->take(4)->each(function ($konyv) use ($felhasznalo) {
                $konyv->users()->attach($felhasznalo->random()->id, [
                    'start_date' => null,
                    'deadline_date' => null,
                    'end_date' => null,
                    'is_reserved' => true,
                    'payed_total_fee' => 300,
                ]);
            });

            // a maradék 6 könyv szabad státuszú marad automatikusan
        }
        ```

4. Adatbázis inicializálása seederekkel:
    ```bash
    php artisan migrate:fresh --seed
    ```

</details>

<details>
<summary><h2>Főoldal (5 pont)</h2></summary>


- **Gyökér útvonal**
    A `routes/wep.php`-ban lecseréltem az eredeti `'/'` útvonalat a mostani `index.blade.php` -ra.
    ```php
    //public
    Route::get('/', [BookController::class, 'index'])->name('books.index');
    ```
- **Legyen bejelentkezés nélkül elérhető** 
    Ehhez `web.php`-ben nem raktam `auth` middleware mögé az útvonalat, a nézetben pedig kezelve van a vendég/bejelentkezett állapot:
    Fájl: `resources/views/books/index.blade.php`
    ```php
    @auth
        <span style="margin-right: 15px;">Szia, <strong>{{ auth()->user()->name }}</strong>!</span>
        {{-- ... --}}
    @else
        <a href="{{ route('login') }}" style="margin-right: 15px;">Bejelentkezés</a>
        <a href="{{ route('register') }}">Regisztráció</a>
    @endauth
    ```

- **A lista legyen rendezve elsődlegesen a szerző neve, másodlagosan a könyv címe alapján és legyen lapozható...**
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    // rendezes, lapozas
    $books = $query->orderBy('writer')
        ->orderBy('title')
        ->paginate(10)
        ->withQueryString();
    ```

- **Jeleníts meg egy listát a rendszerben tárolt könyvekről... (szerzője, címe, típusa, kiadás évszáma)**
    Fájl: `resources/views/books/index.blade.php`
    ```php
    <table>
        <thead>
            <tr>
                <th>Szerző</th>
                <th>Cím</th>
                <th>Típus</th>
                <th>Kiadás éve</th>
            </tr>
        </thead>
        <tbody>
            @forelse($books as $book)
                <tr>
                    <td>{{ $book->writer }}</td>
                    <td><a href="{{ route('books.show', $book) }}">{{ $book->title }}</a></td>
                    <td>{{ $book->type }}</td>
                    <td>{{ $book->year }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="4">Nincs találat a megadott feltételek alapján.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
    ```

- **Az oldalon helyezz el egy form-ot aminek a segítségével lehet szűrni...** (Szerző, Cím, Évszám, Típus, Nyelv)
    Fájl: `resources/views/books/index.blade.php`
    ```php
    <div class="filter-form">
        <form action="{{ route('books.index') }}" method="GET">
            <input type="text" name="writer" placeholder="Szerző" value="{{ request('writer') }}">
            <input type="text" name="title" placeholder="Cím" value="{{ request('title') }}">
            <input type="number" name="year" placeholder="Évszám" value="{{ request('year') }}">
            
            <select name="type">
                <option value="">Típus (összes)</option>
                @foreach(['könyv', 'folyóirat', 'kotta', 'térkép', 'képregény'] as $type)
                    <option value="{{ $type }}" {{ request('type') == $type ? 'selected' : '' }}>{{ ucfirst($type) }}</option>
                @endforeach
            </select>

            <select name="language">
                <option value="">Nyelv (összes)</option>
                @foreach(['hu', 'en', 'de', 'fr', 'it', 'ru', 'es', 'la', 'pl'] as $lang)
                    <option value="{{ $lang }}" {{ request('language') == $lang ? 'selected' : '' }}>{{ strtoupper($lang) }}</option>
                @endforeach
            </select>

            <button type="submit">Szűrés</button>
            <a href="{{ route('books.index') }}">Alaphelyzet</a>
        </form>
    </div>
    ```
    
    Backend logika hozzá:
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    // szures
    if ($request->filled('writer')) {
        $query->where('writer', 'like', '%' . $request->writer . '%');
    }
    if ($request->filled('title')) {
        $query->where('title', 'like', '%' . $request->title . '%');
    }
    if ($request->filled('year')) {
        $query->where('year', $request->year);
    }
    if ($request->filled('type')) {
        $query->where('type', $request->type);
    }
    if ($request->filled('language')) {
        $query->where('language', $request->language);
    }
    ```

</details>

<details>
<summary><h2>Könyv adatainak megjelenítése (3 pont)</h2></summary>


- **Legyen bejelentkezés nélkül elérhető** 
    A web.php-ban a show útvonal az auth middleware-en kívül van definiálva:
    Fájl: `routes/web.php`
    ```php
    Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');
    ```

- **Legyen lehetőség megtekinteni egy könyv összes adatát külön oldalon.**
    Fájl: `resources/views/books/show.blade.php`
    ```php
    <h1>{{ $book->writer }}: {{ $book->title }}</h1>
    {{-- ... --}}
    <ul>
        <li><strong>Dokumentum típusa:</strong> {{ ucfirst($book->type) }}</li>
        <li><strong>Kiadás éve:</strong> {{ $book->year }}</li>
        <li><strong>Nyelv:</strong> {{ strtoupper($book->language) }}</li>
        <li><strong>ISBN:</strong> {{ $book->isbn }}</li>
    </ul>
    ```

- **Ha a könyv borítójának képe elérhető, jelenítsd meg, ha nincs... egy placeholder képet.**
    Fájl: `resources/views/books/show.blade.php`
    ```php
    <div>
        @if($book->cover_image)
            <img src="{{ Storage::url($book->cover_image) }}" alt="Borítókép" class="cover-image">
        @else
            <img src="https://placehold.co/200x300/png?text=Nincs+boritokep" alt="Placeholder" class="cover-image">
        @endif
    </div>
    ```

- **Jelenítsd meg, hogy a könyv kikölcsönözhető-e. Ha nem, írd ki, hogy mikor lesz elérhető újra...**
    A vezérlőben lekérdezem az aktuális kölcsönzést és az előjegyzést. 
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    // aktualis kolcsonzesek
    $activeLoan = $book->users()
        ->wherePivot('is_reserved', false)
        ->whereNull('book_user.end_date')
        ->first();

    // reserved
    $activeReservation = $book->users()
        ->wherePivot('is_reserved', true)
        ->whereNull('book_user.start_date')
        ->first();
    ```
    Majd ezután megjelenítem az eredményt, vagyis az elérhetőséget:
    Fájl: `resources/views/books/show.blade.php`
    ```php
    <h2>Elérhetőség</h2>
    @if($activeLoan)
        <div class="status unavailable">
            Jelenleg kikölcsönözve.<br>
            Várhatóan elérhető lesz újra: <strong>{{ $activeLoan->pivot->deadline_date }}</strong>
        </div>
        {{-- ... --}}
    @elseif($activeReservation)
        <div class="status unavailable">
            A könyv jelenleg elő van jegyezve.
        </div>
        {{-- ... --}}
    @else
        <div class="status available">
            Kikölcsönözhető!
        </div>
    @endif
    ```

- **Adminisztrátor felhasználó esetén jelenítsd meg, hogy a könyvhöz tartozik-e előjegyzés.**
    A nézetben ugye le van védve egy is-admin check-el, majd megjelenítem az adatot.
    Fájl: `resources/views/books/show.blade.php`
    ```php
    @if(auth()->check() && auth()->user()->membership?->name === 'Adminisztrátor')
        <div class="admin-box">
            <h3>Admin panel</h3>
            <p>
                <strong>Előjegyzés státusza:</strong> 
                @if($activeReservation)
                    <span style="color: red;">Előjegyezve - {{ $activeReservation->name }} (id: {{ $activeReservation->id }})</span>
                    {{-- ... --}}
                @else
                    <span style="color: green;">Nincs rajta előjegyzés.</span>
                @endif
            </p>
            {{-- ... admin funkciós gombok ... --}}
        </div>
    @endif
    ```

</details>

<details>
<summary><h2>Könyv létrehozása (4 pont)</h2></summary>


- **Csak adminisztrátor felhasználó érheti el & validáció**
    A jogosultságot az `authorize` metódus oldja meg, a szabályokat pedig a request osztályon belül kezeltem le. Ezen felül az ISBN mentéshez a `-` jelek szűrését implementáltam.
    Fájl: `app/Http/Requests/StoreBookRequest.php`
    ```php
    public function authorize(): bool
    {
        // admin check
        return $this->user()->membership?->name === 'Adminisztrátor';
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'writer' => ['required', 'string', 'max:255'],
            // enumok validálása engedélyezett értékekhez:
            'type' => ['required', 'in:könyv,folyóirat,kotta,térkép,képregény'],
            'year' => ['required', 'integer', 'max:2026'],
            'language' => ['required', 'in:hu,en,de,fr,it,ru,es,la,pl'],
            // isbn regexxel 13 hosszú számra:
            'isbn' => ['required', 'regex:/^(?=(?:\D*\d){13}\D*$)(?:\d-?){13}$/'],
            'cover_image' => ['nullable', 'image', 'mimetypes:image/jpeg,image/png,image/bmp,image/webp', 'max:1024'],
        ];
    }
    ```

- **Készíts egy felületet, ahol egy új könyv rögzíthető...**
    Az űrlap tartalmaz egy fájl feltöltőt (`enctype="multipart/form-data"`) és állapotőrzést hiba esetén (old hookok).
    Fájl: `resources/views/books/create.blade.php`
    ```php
    <form action="{{ route('books.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        {{-- ... többi bemeneti mező (title, writer, type, year, language, isbn) a state megtartásával: value="{{ old('mezőnév') }}" ... --}}
        <div>
            <label>Borítókép (opcionális)</label>
            <input type="file" name="cover_image" accept="image/*">
            @error('cover_image') <div class="error">{{ $message }}</div> @enderror
        </div>

        <button type="submit">Könyv mentése</button>
    </form>
    ```

- **A borítóképet fájl alapon szükséges eltárolni.**
    A `BookController@store` metódusában a public disk file storage-ot használtam a `covers` mappába:
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    public function store(StoreBookRequest $request)
    {
        $validated = $request->validated();

        // kep mentes ha fel van toltve
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('covers', 'public');
            $validated['cover_image'] = $path;
        }

        Book::create($validated);
        // vissza a fooldalra
        return redirect()->route('books.index')->with('success', 'A könyv sikeresen létrejött!');
    }
    ```

</details>

<details>
<summary><h2>Könyv módosítása (3 pont)</h2></summary>


- **Legyen lehetőség frissíteni egy könyv adatait... szerkesztő űrlapot ki kell tölteni a meglévő adatokkal.**
    Az adatok a `value="{{ old('...', $book->...) }}"` formátummal őrződnek meg/töltődnek be.
    Fájl: `resources/views/books/edit.blade.php`
    ```php
    <form action="{{ route('books.update', $book) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        
        <div>
            <label>Cím *</label>
            <input type="text" name="title" value="{{ old('title', $book->title) }}">
            @error('title') <div class="error">{{ $message }}</div> @enderror
        </div>
        {{-- ... többi módosító mező ... --}}
    </form>
    ```

- **Új borítóképet feltölteni... a fájlok között ne maradjon szemét borítókép csere esetén.**
    A controllerben a Storage facade segítségével töröljük a régi képet, mielőtt mentjük az újat:
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    public function update(UpdateBookRequest $request, Book $book)
    {
        Gate::authorize('update', $book);
        $validated = $request->validated();

        if ($request->hasFile('cover_image')) {
            // regi kep torles
            if ($book->cover_image && Storage::disk('public')->exists($book->cover_image)) {
                Storage::disk('public')->delete($book->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('covers', 'public');
        }

        $book->update($validated);
        return redirect()->route('books.show', $book)->with('success', 'A könyv adatai sikeresen frissültek!');
    }
    ```

</details>

<details>
<summary><h2>Könyv törlése (2 pont)</h2></summary>


- **Legyen lehetőség archiválni (soft delete) vagy véglegesen törölni (hard delete) könyvet.**
    A `show.blade.php` -n (ahol előzőleg be lettek illesztve a gombok), van egy archiválás és egy végleges törlés gomb, mindkettő saját végpontra mutató form-ban.
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    // soft delete
    public function destroy(Book $book)
    {
        Gate::authorize('delete', $book);
        $book->delete(); // a modellen mar apply-oltuk a SoftDeletes trait-et
        return redirect()->route('books.index')->with('success', 'Könyv archiválva!');
    }

    // hard delete
    public function forceDestroy($id)
    {
        // a withTrashed() miatt a már soft delete-elt rekordokat is meg tudja talalni, ha esetleg kellene
        $book = Book::withTrashed()->findOrFail($id);

        Gate::authorize('forceDelete', $book);

        // regi kep torles (ne maradjon szemét a fájlok között)
        if ($book->cover_image && Storage::disk('public')->exists($book->cover_image)) {
            Storage::disk('public')->delete($book->cover_image);
        }

        // könyvhöz kapcsolódó adatok törlése a kapcsolótáblából
        $book->users()->detach();

        // végleges törlés method
        $book->forceDelete();

        return redirect()->route('books.index')->with('success', 'A könyv véglegesen törölve lett!');
    }
    ```

</details>

<details>
<summary><h2>Irányítópult, felhasználók listája (4 pont)</h2></summary>


- **Készítsd el az "/dashboard" oldalt, ahol egy irányítópult jelenik meg az adminisztrátorok számára...**
    Ezt a `routes/web.php` fájlban az `auth` middleware csoporton belül regisztráltam, az útvonalat pedig az `AdminController` szolgálja ki.
    Fájl: `app/Http/Controllers/AdminController.php`
    ```php
    public function dashboard()
    {
        // a leírásból: csak adminisztrátorok számára
        if (Auth::user()->membership?->name !== 'Adminisztrátor') {
            return redirect()->route('books.index')->with('success', 'Sikeres bejelentkezés!');
        }

        Gate::authorize('viewAny', User::class);

        // a leírásból: Rendszerben tárolt könyvek száma
        $bookCount = Book::count();

        // a leírásból: Kölcsönzések száma (ami nem előjegyzés)
        $loanCount = DB::table('book_user')
            ->where('is_reserved', false)
            ->count();

        // a leírásból: Bevételek a büntetésekből
        $totalFees = DB::table('book_user')->sum('payed_total_fee');

        // a leírásból: Regisztrált felhasználók listája
        $users = User::with('membership')->paginate(10);

        return view('admin.dashboard', compact('bookCount', 'loanCount', 'totalFees', 'users'));
    }
    ```

- **A lista legyen lapozható, oldalanként legfeljebb 10 elemmel**
    Ezt a vezérlő `paginate(10)` hívása, a nézetben pedig a `{{ $users->links() }}` blade direktíva használata oldja meg.

</details>

<details>
<summary><h2>Felhasználó adatainak módosítása (4 pont)</h2></summary>


- **Legyen lehetőség módosítani a felhasználó adatait. Ezt a funkciót maguk a felhasználók is elérhetik a saját profiljukon.**
    Fájl: `app/Http/Controllers/ProfileController.php`
    ```php
    public function update(ProfileUpdateRequest $request, ?User $user = null): RedirectResponse
    {
        // a leírásból: saját magát, vagy admin a másikat szerkesztheti
        $targetUser = $user ?? $request->user();

        Gate::authorize('update', $targetUser);

        $targetUser->fill($request->validated());

        if ($targetUser->isDirty('email')) {
            $targetUser->email_verified_at = null;
        }

        $targetUser->save();
        // ... return redirect a megfelelő útvonalra
    }
    ```

- **Az űrlapon ellenőrizd az e-mail címet...** 
    Ehhez és az admin/felhasználó elkülönítéséhez a validációs Request osztályban módosítom a szabályokat:
    Fájl: `app/Http/Requests/ProfileUpdateRequest.php`
    ```php
    public function rules(): array
    {
        $routeUserId = $this->route('user')?->id ?? $this->user()->id;

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required', 'string', 'lowercase', 'email', 'max:255',
                Rule::unique(User::class)->ignore($routeUserId),
            ],
        ];

        // a leírásból: Adminisztrátor esetén beállítható a tagság szintje is
        if ($this->user()->membership?->name === 'Adminisztrátor') {
            $rules['membership_id'] = ['nullable', 'exists:memberships,id'];
            $rules['member_until_date'] = ['nullable', 'date'];
        }

        return $rules;
    }
    ```

</details>

<details>
<summary><h2>Könyv kikölcsönzése (3 pont)</h2></summary>


- **Csak adminisztrátor felhasználó rögzíthet új kölcsönzést, de a funkcióhoz szükséges ellenőrzéseket a vezérlőben végezd el.**
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    public function borrow(Request $request, Book $book)
    {
        Gate::authorize('borrow', $book); // policy nézi az admint

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);
        $targetUser = User::findOrFail($validated['user_id']);

        // a leírásból: A könyv nem kölcsönözhető ki, ha jelenleg ki van kölcsönözve
        $activeLoan = $book->users()->wherePivot('is_reserved', false)->whereNull('book_user.end_date')->first();
        if ($activeLoan) return redirect()->back()->with('error', 'A könyv már ki van kölcsönözve!');

        // a leírásból: A könyv nem kölcsönözhető ki, ha más miatt előjegyzés alatt áll
        $activeReservation = $book->users()->wherePivot('is_reserved', true)->whereNull('book_user.start_date')->first();
        if ($activeReservation && $activeReservation->id !== $targetUser->id) {
            return redirect()->back()->with('error', 'A könyvet más már előjegyezte!');
        }

        // a leírásból: A tagok nem kölcsönözhetnek ki könyveket, ha lejárt a tagságuk, vagy ha elérték a megengedett kölcsönzési limitet...
        if (!$targetUser->membership) return redirect()->back()->with('error', 'A felhasználónak nincs tagsága!');
        if ($targetUser->member_until_date && $targetUser->member_until_date < now()->startOfDay()) {
            return redirect()->back()->with('error', 'A felhasználó tagsága lejárt!');
        }
        $activeLoansCount = $targetUser->books()->wherePivot('is_reserved', false)->whereNull('book_user.end_date')->count();
        if ($activeLoansCount >= $targetUser->membership->max_loans) {
            return redirect()->back()->with('error', 'A felhasználó elérte a maximális kölcsönzési limitet!');
        }

        // a leírásból: A határideje alapértelmezetten a kölcsönzéstől számított 30. nap. 
        // a leírásból: Ha viszont a felhasználó tagsága hamarabb lejár... ez a dátum a határidő.
        $startDate = now()->startOfDay();
        $defaultDeadline = now()->addDays(30)->startOfDay();
        $deadlineDate = $defaultDeadline;

        if ($targetUser->member_until_date && $targetUser->member_until_date < $defaultDeadline) {
            $deadlineDate = $targetUser->member_until_date->startOfDay();
        }
        // ... pivot tábla frissítése / attach
    }
    ```

</details>

<details>
<summary><h2>Könyv visszahozása (3 pont)</h2></summary>


- **A visszahozást adminisztrátor kezdeményezheti... Sikeres visszahozáskor az end_date mező aktuális dátumra változik.**
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    public function returnBook(Request $request, Book $book)
    {
        Gate::authorize('returnBook', $book); // csak admin!

        $activeLoan = $book->users()
            ->wherePivot('is_reserved', false)
            ->whereNull('book_user.end_date')
            ->first();

        // hibakezelés: már vissza van hozva vagy ki se volt kölcsönözve
        if (!$activeLoan) return redirect()->back()->with('error', 'Nincs aktív kölcsönzés ezen a könyvön!');

        $endDate = now()->startOfDay();
        $deadlineDate = Carbon::parse($activeLoan->pivot->deadline_date)->startOfDay();

        // a leírásból: Ha a könyvet a határidő után hozzák vissza, akkor késedelmi díjat kell számolni: minden nap után 100 Ft fizetendő, amely a payed_totals_fee-hez hozzáadódik.
        $lateFee = 0;
        if ($endDate > $deadlineDate) {
            $daysLate = $deadlineDate->diffInDays($endDate);
            $lateFee = $daysLate * 100;
        }
        $newTotalFee = $activeLoan->pivot->payed_total_fee + $lateFee;

        // a leírásból: Visszahozás után a könyv kikölcsönzéstől számítva ismét elérhetővé válik...
        $book->users()
            ->wherePivot('is_reserved', false)
            ->wherePivotNull('end_date')
            ->updateExistingPivot($activeLoan->id, [
                'end_date' => $endDate->format('Y-m-d'),
                'payed_total_fee' => $newTotalFee,
            ]);

        return redirect()->back()->with('success', 'A könyv sikeresen visszahozva! Késedelmi díj: ' . $lateFee . ' Ft.');
    }
    ```

</details>

<details>
<summary><h2>A felhasználó kölcsönzéseinek és előjegyzéseinek listája (3 pont)</h2></summary>


- **A felhasználóhoz tartozó kölcsönzések és előjegyzések megjelenítése... Csoportosítva:**
    A `ProfileController@loans` metódusában három külön query-vel kérem le a kapcsolatokat a megfelelő feltételekkel (aktív, lezárt, előjegyzés), és az eredményeket átadom a nézetnek.
    Fájl: `app/Http/Controllers/ProfileController.php`
    ```php
    public function loans(Request $request, User $user): View
    {
        // auth check, policy miatt csak a sajátját, illetve admin bármelyiket láthatja
        Gate::authorize('viewLoans', $user);

        // a leírásból: Aktív kölcsönzések... növekvő sorrendben a határidő alapján
        $activeLoans = $user->books()
            ->wherePivot('is_reserved', false)
            ->wherePivotNull('end_date')
            ->orderByPivot('deadline_date', 'asc')
            ->get();

        // a leírásból: Lezárt kölcsönzések... csökkenő sorrendben a visszahozás dátuma alapján
        $pastLoans = $user->books()
            ->wherePivot('is_reserved', false)
            ->wherePivotNotNull('end_date')
            ->orderByPivot('end_date', 'desc')
            ->get();

        // a leírásból: Előjegyzett könyvek
        $reservations = $user->books()
            ->wherePivot('is_reserved', true)
            ->get();

        return view('profile.loans', compact('user', 'activeLoans', 'pastLoans', 'reservations'));
    }
    ```

- **A leírásból: Az aktív kölcsönzéseknél jelenítsd meg... mennyi nap van még hátra a határidőig...**
    A nézetben a Carbon csomag `diffInDays` metódusát használom a napok kiszámítására.
    Fájl: `resources/views/profile/loans.blade.php`
    ```php
    @forelse($activeLoans as $book)
        @php
            $deadline = \Carbon\Carbon::parse($book->pivot->deadline_date)->startOfDay();
            // diffInDays a hátralévő napok kiszámításához (a false paraméter miatt negatív is lehet, ha késésben van)
            $daysLeft = now()->startOfDay()->diffInDays($deadline, false); 
        @endphp
        {{-- ... Megjelenítés táblázat soraiban ... --}}
    @empty
        <tr><td colspan="6" class="py-2 text-gray-500">Nincs aktív kölcsönzés.</td></tr>
    @endforelse
    ```

</details>

<details>
<summary><h2>Könyv kölcsönzésének hosszabbítása (3 pont)</h2></summary>


- **A hosszabbítást a felhasználó a saját profilján és az adminisztrátor kezdeményezheti... A kölcsönzés csak egyszer hosszabbítható.**
    A jogosultságokat a `BookPolicy@extendLoan` admin/felhasználó checkje biztosítja, magát a műveletet a `BookController@extend` kezeli.
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    public function extend(User $user, Book $book)
    {
        Gate::authorize('extendLoan', [$book, $user]);

        $loan = $book->users()
            ->wherePivot('user_id', $user->id)
            ->wherePivot('is_reserved', false)
            ->wherePivotNull('end_date')
            ->firstOrFail();

        // a leírásból: A kölcsönzés csak egyszer hosszabbítható...
        if ($loan->pivot->is_extended) return back()->with('error', 'A kölcsönzés már volt hosszabbítva.');

        $now = now()->startOfDay();
        $deadline = Carbon::parse($loan->pivot->deadline_date)->startOfDay();

        // a leírásból: Ha a határidő lejárt, a kölcsönzés csak úgy hosszabbítható... a késedelmi díjat kifizeti (hozzá kell adni a payed_total_fee-hez).  Minden nap után 100 Ft.
        $lateFee = 0;
        if ($now > $deadline) {
            $lateFee = $deadline->diffInDays($now) * 100;
        }

        // a leírásból: A határidőhöz újabb 30 nap adódik...  De maximum a memberség lejárati ideje!
        $baseDate = $now > $deadline ? $deadline : $now;
        $newDeadline = $baseDate->copy()->addDays(30);

        if ($user->member_until_date && Carbon::parse($user->member_until_date) < $newDeadline) {
            $newDeadline = Carbon::parse($user->member_until_date);
        }

        $book->users()->wherePivotNull('end_date')->updateExistingPivot($user->id, [
            'deadline_date' => $newDeadline->format('Y-m-d'),
            'is_extended' => true,
            'payed_total_fee' => $loan->pivot->payed_total_fee + $lateFee,
        ]);

        return back()->with('success', 'Sikeres hosszabbítás! Következő határidő: ' . $newDeadline->format('Y-m-d'));
    }
    ```

</details>

<details>
<summary><h2>Könyv előjegyzése és előjegyzés törlése (5 pont)</h2></summary>


- **A felhasználó jogosult előjegyezni a könyvet... előjegyzés esetén a könyv kapcsolótáblájába kerül egy is_reserved = true rekord...**
    Az előjegyzés logikáját custom Request osztály teszteli és védi (limit ellenőrzés), a mentést pedig a controller végzi.
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    public function reserve(StoreReservationRequest $request, Book $book)
    {
        // a leírásból: Egy könyv egyszerre csak egyetlen felhasználó által lehet előjegyezve
        if ($book->users()->wherePivot('is_reserved', true)->exists()) {
            return back()->with('error', 'A könyv már elő van jegyezve.');
        }

        // a leírásből: is_reserved beállítása, díj hozzáadása (?) - (opcionális extra fix 300 díj az üzleti logika tesztként)
        $book->users()->attach($request->user()->id, [
            'is_reserved' => true,
            'payed_total_fee' => 300,
        ]);
        return back()->with('success', 'Sikeres előjegyzés.');
    }
    ```
    
- **Mindenki törölni tudja a saját előjegyzését, illetve az adminisztrátor is bármit bármikor.**
    A `deleteReservation` policy lekezeli, hogy csak az törölhessen, aki létrehozta (vagy az admin a global `before` metódus miatt). Törlésnél a `.detach()` távolítja el a Pivot rekordot tartósan.
    Fájl: `app/Http/Controllers/BookController.php`
    ```php
    public function cancelReservation(Request $request, Book $book)
    {
        $reservation = $book->users()->wherePivot('is_reserved', true)->first();

        if ($reservation) {
            Gate::authorize('deleteReservation', [$book, $reservation]);
            // a leírásból: törlés esetén a pivot rekord törlődik
            $book->users()->wherePivot('is_reserved', true)->detach($reservation->id);
        }
        return redirect()->back()->with('success', 'Előjegyzés törölve!');
    }
    ```

</details>

<details>
<summary><h2>Request és Policy használata (extra) (+4 pont)</h2></summary>


- **Minden űrlap kezelés során dedikált Request osztályokat használj az adatok ellenőrzésére!**
    Több validáció is ki lett szervezve külső Requestekbe (pl. `StoreBookRequest`, `UpdateBookRequest`, `StoreReservationRequest`, `ProfileUpdateRequest`).
    A `StoreBookRequest`-ben egy egyedi szűrést is végeztem az ISBN számára `prepareForValidation` -el.
    Fájl: `app/Http/Requests/StoreBookRequest.php`
    ```php
    protected function prepareForValidation()
    {
        if ($this->has('isbn')) {
            $this->merge([
                'isbn' => str_replace('-', '', $this->isbn)
            ]);
        }
    }
    ```

- **Alkalmazz Policy osztályokat az egyes erőforrásokhoz... pl. ki módosíthatja.**
    A project tartalmazza a `BookPolicy` és `UserPolicy` osztályokat. Létrehoztam egy globális "Admin felülbírálatot" a policies `before()` metódusában is, így az admin minden műveletet gond nélkül elvégezhet és a kódborítás is szép Policy-alapúvá vált.
    Fájl: `app/Policies/UserPolicy.php`
    ```php
    // global admin, mindenhez hozzáfér.
    public function before(User $user, string $ability): ?bool
    {
        if ($user->membership?->name === 'Adminisztrátor') {
            return true;
        }
        return null; // továbbadja az egyéni szabálynak, ha nem admin
    }

    //felhasználó adat módosítás
    public function update(User $user, User $model): bool
    {
        return $user->id === $model->id; // csak a sajátját módosíthatja
    }
    ```

ami kell még: 
attach() ismerete
eltérő metódusok megértése
struktúra ellenőrzése/átnézése
old() ismerete az állapottartáshoz

</details>

<details>
<summary><h2>Függvények és magyarázatok</h2></summary>

### 1. Kapcsolati függvények a Modellekben (Models)
Ezek írják le az Eloquent (a Laravel adatbázis-kezelője) számára a migrációkban lefektetett kapcsolatokat.

- **`hasMany(User::class)` (`Membership.php`)**:
    "Egy a többhöz" (1:N) kapcsolat. A Membership modell ezzel tudja lekérdezni az összes hozzá tartozó felhasználót (pl. `$membership->users`).
- **`belongsTo(Membership::class)` (`User.php`)**:
    Az 1:N kapcsolat visszafelé. Ezzel lehet lekérni az adott felhasználó tagsági adatait (pl. `$user->membership->name`). Olyan tábláknál van, ahol a külső kulcs (`membership_id`) található.
- **`belongsToMany(Book::class)` / `belongsToMany(User::class)` (`User.php` és `Book.php`)**:
    "Több a többhöz" (N:M) kapcsolat. Mivel a `book_user` kapcsolótáblán keresztül működik, az Eloquent automatikusan felismeri a konvenciókat, és elintézi a háttérben a "joinokat". Ezzel kérdezi le a felhasználó a könyveit (`$user->books`) és fordítva.
- **`withPivot(['start_date', ...])` (`User.php` és `Book.php`)**:
    Nagyon fontos függvény! A több-a-többhöz kapcsolat alapesetben csak a két végpont (`User` és `Book`) adatait kérdezi le, a kapcsolótáblán lévőt nem. A `withPivot()` utasítja a Laravelt, hogy "hé, töltsd be nekem a `start_date`, `is_reserved`, stb. mezőket is a `book_user` táblából", így később hivatkozhatsz rájuk (pl. a nézetben: `$book->pivot->start_date`).
- **`withTimestamps()`**:
    Szintén a több-a-többhöz kapcsolatnál: automatikusan menti és frissíti a kapcsolótáblán (a pivot táblán) is a `created_at` és `updated_at` mezőket kölcsönzéskor/előjegyzéskor.

### 2. Adatlekérések és optimalizálás a Kontrollerekben
A Controller rétegben már az adatokat gyűjtjük ki. Van néhány nagyon szép megoldás, amiért plusz pont szokott járni a vizsgán.

- **`User::with('membership')` (`AdminController.php`)**:
    Ezt hívjuk Eager Loading-nak (Előtöltés). Ha ezt nem használnád, majd a képernyőn egy 10 fős listánál kiírnád a tagságukat, a Laravel minden sornál indítana 1 adatbázis lekérdezést (ez az "N+1 lekérdezés" probléma). A `with` megmondja, hogy egyszerre töltsd be a felhasználókat ÉS a tagságaikat egyetlen (vagy kettő) optimalizált SQL lekérdezéssel.
- **`paginate(10)` (`AdminController.php`, `BookController.php`)**:
    Automatikusan tördelve (limit, offset) kéri le az adatokat az adatbázisból, azaz csak 10 elemet hoz el a sok százból, és generál hozzá egy lapozó objektumot (frontend felé `->links()`).
- **`Book::query()` (`BookController.php`)**:
    Elindít egy úgynevezett "Query Builder" (lekérdezés-építő) folyamatot. Így utólag fűzheted hozzá dinamikusan az ágakat: ha van keresési feltétel, akkor ráhívsz egy `$query->where('title', 'like', ...)` függvényt.

### 3. A Nyers "Query Builder" függvények (Statisztikákhoz)
Az `AdminController.php`-ben nagyon elegánsan oldottad meg a kimutatásokat:

- **`Book::count()`**:
    Nem hozza el a memóriába az összes könyvet, letol az adatbázisnak egy `SELECT COUNT(*) FROM books` parancsot, ami töredékmásodperc alatt megvan.
- **`DB::table('book_user')->where(...)->count()`**:
    Itt kikerülöd az Eloquent modelleket és a kapcsolótáblához közvetlenül a Query Builderrel fordulsz (`DB::table`). Ez a leggyorsabb módja az adatok lekérésének, ha az adott táblának nincs saját Modellje.
- **`sum('payed_total_fee')`**:
    Összegző függvény (`SELECT SUM(...)`), amivel pillanatok alatt kiszámolod a bevételeket a memóriaterhelés nélkül.

### 4. Pivot táblás szűrések a Policies / Controllers fájlokban
Amikor konkrétan egy felhasználó és egy könyv metszetére vagy kíváncsi (pl. egy könyv kikölcsönzött státuszát vizsgálod):

- **`$book->users()->wherePivot('user_id', $user->id)`**:
    Olyan felhasználókra szűr, akikhez a könyv kapcsolódik, de a szűrést (`wherePivot`) a kapcsolótábla mezőire (kölcsönzési adatok) alkalmazza.
- **`wherePivotNull('end_date')` (`BookPolicy.php`)**:
    Ez ellenőrzi, hogy mik az aktív kölcsönzések. Ha az `end_date` Null, azt jelenti, hogy még nem hozták vissza.

### 5. Pivot tábla szerkesztése (Seederek, Kölcsönzés tárolása)
- **`$book->users()->attach($user_id, [adatok tömbje])` (`DatabaseSeeder.php`, `BookController.php` - a `borrow()` hívása valószínűleg hasonló)**:
    Az `attach()` feladata, hogy egy "Több a többhöz" kapcsolatot fizikailag is összekössön. Fogja a paraméterként kapott `$user_id`-t, a példányosított könyv azonosítóját, és a tömbben extraként átadott értékeket (dátumok, `is_reserved`), majd ezekből egy vadonatúj sort szúr be az adatbázis `book_user` (pivot) táblájába, anélkül, hogy neked kellene SQL `INSERT INTO` parancsokat írnod.

### 6. Kapcsolótábla (Pivot) manipulációs függvények
Mivel egy N:M (több a többhöz) kapcsolatod van a felhasználók és könyvek között, a Laravel külön függvényeket biztosít az ezen a táblán (vagyis a `book_user`-en) végzett műveletekhez.

- **`attach($id, [adatok])` (`BookController` `borrow()` és `reserve()`)**:
    Ezt használjuk újat létrehozni egy N:M kapcsolatban. Beszúr egy új sort a `book_user` táblába. Az első paraméter megmondja, melyik felhasználó ID-jéhez kapcsolja a könyvet, a második paraméterben lévő tömb pedig kitölti az extra pivot mezőket (pl. `start_date`, `is_reserved`).
- **`detach($id)` (`BookController` `cancelReservation()` és `forceDestroy()`)**:
    Felbontja az N:M kapcsolatot. Vagyis kitörli a sort a `book_user` táblából. Ha ID nélkül hívod (`$book->users()->detach()`), akkor az adott könyv összes meglévő kapcsolatát törli.
- **`updateExistingPivot($id, [adatok])` (`BookController` `extend()`, `returnBook()` és `borrow()`)**:
    Ahelyett, hogy elvenné a régi kapcsolatot és újat adna, ez megkeresi a kapcsolótáblában a Téma és User közötti meglévő sort, és módosítja benne a mezőket (például hosszabbítás esetén átírja a `deadline_date`-et, visszahozáskor beállítja az `end_date`-et).
- **`wherePivotNull(...)` és `wherePivotNotNull(...)` (`ProfileController`)**:
    Kényelmi függvények. A sima `wherePivot()` mellett ezekkel szűrsz arra, hogy egy adat (pl. `end_date`) a pivot táblában kitöltetlen-e (vagyis még nem hozták vissza a könyvet) vagy már kitöltött.
- **`orderByPivot('deadline_date', 'asc')` (`ProfileController`)**:
    Sorba rendezi a lekérdezést, de nem a könyvek oszlopai alapján, hanem a kapcsolótáblán (Pivot) lévő határidő (`deadline_date`) alapján.

### 7. Példányok mentése, frissítése a memóriában (Model hívások)
Amikor egy űrlapon valós adatokat kapsz, azokat fel kell dolgozni:

- **`Book::create($validated)` (`BookController` `store()`)**:
    Az úgynevezett Mass Assignment (tömeges értékadás). Fog egy validált paramétertömböt, automatikusan létrehoz belőle egy új könyv példányt a memóriában, és rögtön futtat hozzá egy `INSERT INTO` parancsot az adatbázisban. Csak azok az adatok mennek át, amelyek a Book modellben szerepelnek a `$fillable` tömbben!
- **`$book->update($validated)` (`BookController` `edit()`)**:
    Hasonló a create-hoz, de ez egy már meglévő, adatbázisból kikért rekordon futtat egy `UPDATE` SQL parancsot az új adatokkal.
- **`$targetUser->fill($request->validated())` (`ProfileController` `update()`)**:
    Ez is ráteszi az új adatokat a felhasználó példányára, DE még nem menti el az adatbázisba! A memóriában lévő objektum megkapja az új neveket/emaileket, hogy még tovább vizsgálhassuk mentés előtt.
- **`$targetUser->isDirty('email')` (`ProfileController` `update()`)**:
    Ez egy zseniális beépített modell-függvény! Ellenőrzi, hogy a beolvasott, de még nem mentett objektumon változott-e az e-mail cím mező az adatbázis állapothoz képest. Ha igen, le kell nulláznia a validációs jelszót (`email_verified_at = null`).
- **`$targetUser->save()` (`ProfileController` `update()`)**:
    Miután a `fill()`-lel feltöltötted, és mindent megvizsgáltál, a `save()` futtatja le a tényleges SQL `UPDATE` kiírást az adatbázis felé.

### 8. Törlések
- **`$book->delete()` (`BookController` `destroy()`)**:
    Mivel a Book modellben benne van a `use SoftDeletes;` sor, ez a parancs nem törli le a könyvet véglegesen! Csak egy SQL `UPDATE` parancsot futtat, és kitölti a `deleted_at` oszlopot az aktuális időponttal. Ezek után a könyv nem jelenik meg az egyszerű `Book::all()` lekérésekben, de az azonosítója megmarad az adatbázisban.
- **`Book::withTrashed()->findOrFail($id)` (`BookController` `forceDestroy()`)**:
    A kuka (soft delete) megkerülése! A `withTrashed()` utasítja az Eloquentet, hogy a lekérdezés tartalmazza azokat a könyveket is, amiket korábban "töröltek" (tehát nem null a `deleted_at` oszlopuk).
- **`$book->forceDelete()` (`BookController` `forceDestroy()`)**:
    Ez csinálja meg a fizikai, végleges SQL `DELETE FROM` utasítást az adatbázis szintjén. Ez kiírtja az adatot a merevlemezről, visszavonhatatlanul.

### 9. Kivitelt (Exceptiont) dobó lekérdezések (Biztonság!)
A tanár megkérdezheti: "Mi történik, ha egy olyan könyvet vagy usert akarok lekérdezni, aminek az azonosítója nem is létezik?"

- **`findOrFail($id)` (`BookController` `borrow()` és `forceDestroy()`)**:
    Nem a sima `find($id)`-t használod. A `findOrFail()` megpróbálja megkeresni az adatbázisban a rekordot. Ha megtalálja, visszaadja a modellt. Ha nem találja, akkor nem fut tovább a kód egy Null hibával, hanem azonnal megszakítja a futást és dob egy 404 Not Found HTTP hibaoldalt a felhasználónak. Ez nagyon biztonságos megoldás!
- **`firstOrFail()` (`BookController` `extend()`)**:
    Ugyanaz, mint az előző, csak nem ID-re keres. Lefuttatja a feltételeket (`wherePivot...`), és ha a lista üres, egyből 404-es (vagy adatbázis-rekord nem található) hibát dob.

### 10. A "varázslat" a validációk előtt (Adattisztítás)
Ezekért a sorrendekért és okos megoldásokért külön dicséret járhat. A FormRequest-ekben van egy ügyes dolog.

- **`prepareForValidation()` (`UpdateBookRequest.php`, `StoreBookRequest.php`)**:
    A tanár megkérdezheti: "Hogyan oldottad meg, hogy az ISBN számot a validátor felismerje, még akkor is, ha a felhasználó kötőjelekkel gépelte be? A regexed nem enged kötőjeleket!"
    Válasz: A `prepareForValidation()` függvény automatikusan lefut még azelőtt, hogy a Laravel nekikezdene az adatok ellenőrzésének.
- **`$this->merge(['isbn' => str_replace('-', '', $this->isbn)])`**:
    Ezzel a `prepareForValidation`-ön belül kiveszed a kötőjeleket a kapott stringből, és visszaírod a requestbe (`merge`). Mire a validátor a `rules()` részhez ér, a kötőjelek már eltűntek.

### 11. Az Authorization / Védelem kapui (Policy)
Hiába az adatbázis, ha bárki bármit módosíthatna.

- **`Gate::authorize('update', $book)` (Minden controllerben)**:
    Megkérdezheti a tanár: "Honnan tudja a rendszer, hogy ezt neked szabad-e szerkeszteni?"
    A `Gate::authorize()` rácsatlakozik az `Policies` mappában megírt policy-kra. Például a `BookPolicy`-ben le van írva, hogy ki mit tehet, ez a metódus pedig gondoskodik a hívásról, és ha a válasz false, azonnal dob egy 403 Forbidden hibát.
- **`failedAuthorization()` és `throw new HttpResponseException(...)` (`StoreReservationRequest.php`)**:
    Zseniális trükk! Alapesetben ha a FormRequest `authorize()` függvénye falsot ad (mert pl. lejárt az illető tagsága), a Laravel egy csúnya 403-as hibaoldalt tol az ember arcába. Te ezt felülírtad, emiatt elfogod az engedélyhiányt, és a csúnya hibaoldal helyett csendben visszairányítod az oldalt egy szép „Nincs jogosultságod / Elérted a limitet!” hibaüzenettel.

### 12. Lapozás megőrzése szűréskor
- **`withQueryString()` (`BookController` `index()`, a pagination mellett)**:
    Tipikus tesztelői kérdés: "Lekértem az angol könyveket. Rákattintottam a 2. oldalra, de eltűnt a szűrés, és megint minden könyvet látok. Nálad miért nem omlik ez össze?"
    A válasz: a `->paginate(10)->withQueryString()` hívás felel érte. Ez hozzáfűzi a lapozó hivatkozások URL-jéhez (pl. `?page=2`) a böngésző sávjából az eddigi szűrési paramétereket (pl. `&language=en&writer=Tolkien`), így lapozásnál sem vesznek el a szűrőfeltételek.
</details>