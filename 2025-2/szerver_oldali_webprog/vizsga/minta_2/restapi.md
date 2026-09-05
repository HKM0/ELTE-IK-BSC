#### 1. feladat: `GET /songs` (2 pont)
<details>
<summary>több</summary>

Visszaadja az összes dal minden adatmezőjét.

- Minta kérés: `GET http://localhost:8000/api/songs`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 1,
    "title": "distinctio ullam",
    "artist": "Mr. Cruz Terry",
    "year": 2023,
    "country_id": 1,
    "created_at": "2025-05-23T22:04:03.000000Z",
    "updated_at": "2025-05-23T22:04:03.000000Z"
  },
  stb.
]
```
<details>
<summary>megoldása</summary>

`api.php`
```php
//ezt kell hozzáadni:
//Minta kérés: GET http://localhost:8000/api/songs
Route::get('/songs', [ApiController::class, 'getSongs']);
```

`app/Http/Controllers/ApiController.php`
```php
class ApiController extends Controller
{
    //ezt adtam hozzá:
    public function getSongs()
    {
        //Válasz helyes kérés esetén: 200 OK
        return Song::all();
    }
  //--------------------
}
```

</details>

---

</details>


#### 2. feladat: `GET /songs/{year}` (2 pont)

<details>
<summary>több</summary>
Lekéri a megadott évben induló dalok minden adatmezőjét.

- Minta kérés: `GET http://localhost:8000/api/songs/2025`
- Válasz, ha a `year` paraméter nem egész szám: `422 UNPROCESSABLE CONTENT`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 53,
    "title": "cumque est vel dolor est",
    "artist": "Miss Herta Hansen III",
    "year": 2025,
    "country_id": 1,
    "created_at": "2025-05-23T22:04:04.000000Z",
    "updated_at": "2025-05-23T22:04:04.000000Z"
  },
  stb.
]
```

<details>
<summary>megoldása</summary>

`api.php`
```php
//Minta kérés: GET http://localhost:8000/api/songs/2025
Route::get('/songs/{year}', [ApiController::class, 'getSong']);
```

`app/Http/Controllers/ApiController.php`
```php
//ezt adtam hozzá:
public function getSong($year)
{
    //Válasz, ha a `year` paraméter nem egész szám: 422 UNPROCESSABLE CONTENT
    if(!is_numeric($year) || intval($year) != $year || $year <= 0)
    {
        return response()->json([], 422);
    }
    
    //Válasz helyes kérés esetén: 200 OK
    $songs = Song::where('year', $year)->get();
    return $songs;
}
```

</details>

---

</details>


#### 3. feladat: `POST /songs` (5 pont)
<details>
<summary>több</summary>
Létrehoz egy új dalt a kérés törzsében (body) megadott adatokkal. A feladat akkor teljes értékű, ha megtörténnek az alábbi validációk:

- `title`: kötelező, string
- `artist`: kötelező, string
- `year`: kötelező, egész szám, minimum 2000, maximum 2030
- `country_id`: kötelező, egész szám, létező ország azonosítója

Amennyiben a kérés a fenti validációnak megfelel, de az ország már indított dalt ebben az évben, akkor `409 CONFLICT` státuszkódot adj vissza! Ha erre nem figyelsz külön, akkor könnyen adatbázis-hibába futhatsz.

_(Hitelesítés ennél a feladatnál nem szükséges még.)_

- Minta kérés: `POST http://localhost:8000/api/songs`
```json
{
  "title": "A világ legjobb zenéje a jövőből",
  "artist": "Mr AI enjoyer",
  "year": 2027,
  "country_id": 4  
}
```
- Válasz, ha a kérés törzse (body) validációs hibát tartalmaz: `422 UNPROCESSABLE CONTENT`
- Válasz, ha az országhoz már tartozik ebben az évben dal: `409 CONFLICT`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "title": "A világ legjobb zenéje a jövőből",
  "artist": "Mr AI enjoyer",
  "year": 2027,
  "country_id": 4,
  "updated_at": "2025-05-23T22:22:56.000000Z",
  "created_at": "2025-05-23T22:22:56.000000Z",
  "id": 79
}
```
<details>
<summary>megoldása</summary>


`api.php`
```php
//POST http://localhost:8000/api/songs
Route::post('/songs', [ApiController::class, 'createSong']);
```

`app/Http/Controllers/ApiController.php`
```php
public function createSong(Request $request)
{
    //Válasz, ha a kérés törzse (body) validációs hibát tartalmaz: 422 UNPROCESSABLE CONTENT
    $validated = $request->validate([
        'title' => 'required|string',
        'artist' => 'required|string',
        'year' => 'required|integer|max:2030|min:2000',
        'country_id' => 'required|integer|exists:countries,id'
    ]);
    //Válasz, ha az országhoz már tartozik ebben az évben dal: 409 CONFLICT
    if (Song::where('country_id', $validated['country_id'])->where('year', $validated['year'])->exists()) 
    {
        return response()->json([], 409);
    }
    //letrehozas
    $song = Song::create($validated);
    //Válasz helyes kérés esetén: 201 CREATED
    return response()->json($song, 201);
}
```


</details>

---

</details>


#### 4. feladat: `PATCH /songs/{id}` (4 pont)

<details>
<summary>több</summary>
Módosítja a kérés törzsében (body) megadott mezők alapján az adott azonosítójú dalt.

A validációs szabályok megegyeznek az előző feladatban leírtakkal, viszont már nem kötelező minden adatot szerepeltetni. Ilyenkor a kérés törzsében (body) nem szereplő adatok változatlanok maradnak.

Az ország vagy az év módosításakor figyelj oda, hogy egy ország egy évben csak egy dalt indíthat! Ha ettől eltérő helyzet állna elő, ismételten `409 CONFLICT` státuszkódot kell adni és a módosítást megtagadni. **Ügyelj arra, hogy a módosított dal önmagával ne kerüljön konfliktusba!**

_(Hitelesítés ennél a feladatnál nem szükséges még.)_

- Minta kérés: `PATCH http://localhost:8000/api/songs/7`
```json
{
  "year": 2028,
}
```
- Válasz, ha az `id` paraméter nem egész szám: `422 UNPROCESSABLE CONTENT`
- Válasz, ha a megadott `id`-vel nem létezik dal: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "id": 7,
  "title": "quia et",
  "artist": "Sandy Osinski II",
  "year": 2028,
  "country_id": 9,
  "created_at": "2025-05-23T22:25:07.000000Z",
  "updated_at": "2025-05-24T09:28:23.000000Z"
}
```

<details>
<summary>megoldása</summary>

`api.php`
```php
//Minta kérés: PATCH http://localhost:8000/api/songs/7
Route::patch('/songs/{id}', [ApiController::class, 'updateSong']);
```

`app/Http/Controllers/ApiController.php`
```php
public function updateSong(Request $request, $id)
{
    //Válasz, ha az id paraméter nem egész szám: 422 UNPROCESSABLE CONTENT
    if (!is_numeric($id) || intval($id) != $id || $id <= 0) {
        return response()->json([], 422);
    }

    //Válasz, ha a megadott id-vel nem létezik dal: 404 NOT FOUND
    $song = Song::find($id);
    if (!$song) {
        return response()->json([], 404);
    }

    //Validáció
    $validated = $request->validate([
        'title' => 'required|string',
        'artist' => 'required|string',
        'year' => 'required|integer|max:2030|min:2000',
        'country_id' => 'required|integer|exists:countries,id'
    ]);

    //Válasz, ha az országhoz már tartozik ebben az évben dal: 409 CONFLICT
    if (isset($validated['year']) || isset($validated['country_id'])) {
        $country_id = $validated['country_id'] ?? $song->country_id;
        $year = $validated['year'] ?? $song->year;
        
        // Ellenőrizzük, hogy van-e már ilyen combo a jelenlegi soron kívül
        if (Song::where('country_id', $country_id)
                ->where('year', $year)
                ->where('id', '!=', $id)
                ->exists()) 
        {
            return response()->json([], 409);
        }
    }
    //Válasz helyes kérés esetén: 200 OK
    $song->update($validated);
    return response()->json($song, 200);
}
```

</details>

---

</details>



#### 5. feladat: `GET /results/{year}` (7 pont)

<details>
<summary>több</summary>

Ezzel a végponttal a döntő egy adott évi végeredményét lehet lekérni. Természetesen ehhez szükség lesz némi feldolgozásra, ugyanis össze kell adni az adatbázisban található szavazatok pontszámait.

**Részpontok:**

- Az évszám validációjára önmagában nem jár pont, mert a 2. feladatban már erre szerezhettél pontot.
- **3 pont:** megjelennek az adott évben induló számok és az egyes számok által elért összpontszám.
- **5 pont:** az eredmény összpontszám szerint csökkenő sorrendben jelenik meg. _(Technikai segítség: előfordulhat, hogy a kimeneten nem tűnik rendezettnek a hívással már rendezett collection, használd a `-> values()` metódust ilyenkor.)_
- **7 pont:** az eredmény pontosan a következő adatokat tartalmazza: elért helyezés (1-től N-ig), a dalt indító ország neve, szerzett összpontszám. Az egyszerűség kedvéért a holtversenyeket nem kell kezelni.

3 és 5 pontos megoldás (sorrend változik) mintaválasza helyes kérés esetén, 200 OK

```json
[
  {
    "id": 53,
    "title": "facere non sequi",
    "artist": "Maddison Conroy",
    "year": 2025,
    "country_id": 1,
    "created_at": "2025-05-23T22:25:08.000000Z",
    "updated_at": "2025-05-23T22:25:08.000000Z",
    "totalPoints": 348
  },
  stb.
]
```

<details>
<summary>megoldása</summary>

`api.php`
```php
//3 és 5 pontos megoldás (sorrend változik) mintaválasza helyes kérés esetén, 200 OK
Route::get('/results/{year}', [ApiController::class, 'getResults']);
```

`app/Http/Controllers/ApiController.php`
```php
public function getResults($year)
{
  //Validáció az évhez (hasonló a 2. feladathoz)
  if (!is_numeric($year) || intval($year) != $year || $year <= 0) {
      return response()->json([], 422);
  }

  //Az adott évi dalok lekérése
  $songs = Song::where('year', $year)->get();

  //Minden dalhoz hozzáadjuk az összes szavazat pontjait
  $songs->each(function($song) {
      $song->totalPoints = Vote::where('to_song_id', $song->id)->sum('points');
  });

  //Csökkenő sorrendben rendezés az össz pontok alapján + values() a holtversenyhez
  $songs = $songs->sortByDesc('totalPoints')->values();
  return response()->json($songs, 200);
}
```


</details>

---

</details>

