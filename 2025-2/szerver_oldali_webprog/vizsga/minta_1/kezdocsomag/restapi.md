# zh_minta_1
<details><summary>adatbázis</summary>

A feladathoz a kezdőcsomagban készen adjuk a migrációkat, modelleket és seedert. Az alábbi modellekkel kell dolgozni:

- `Location` - mérőhely
  - `id`
  - `name` - string, a mérőhely megnevezése, egyedi (unique)
  - `email` - string, a mérőhelybe bejelentkezéshez használt email cím, egyedi (unique)
  - `password` - string, jelszóhash, rejtett mező
  - `lat` - float, a mérőhely földrajzi szélessége
  - `lon` - float, a mérőhely földrajzi hosszúsága
  - `public` - boolean, a mérőhely publikusan megközelíthető-e, alapértelmezetten igaz
  - `created_at`
  - `updated_at`
- `Weather` - időjárásmérési naplóadat
  - `id`
  - `type` - string, az időjárás szöveges leírása (pl. `sunny`)
  - `location_id` - integer, hivatkozás a naplóadat mérőhelyének azonosítójára
  - `temp` - float, a mért hőmérséklet Celsius-fokban
  - `logged_at` - timestamp, a mérés időpontja (ez nem egyezik a `created_at` mezővel, hanem változatos múltbeli időpontokat tartalmazhat)
  - `created_at`
  - `updated_at`
- `Warning` - figyelmeztetések
  - `id`
  - `level` - integer, a figyelmeztetés szintje
  - `message` - string, a figyelmeztetés szövege, lehet `null`
  - `created_at`
  - `updated_at`

**(Angol nyelvi megjegyzés: a `weather` szó többes számban is `weather` - ezt hasznos lehet fejben tartani!)**

A fenti modellek közötti kapcsolatok:

- `Location` 1 : N `Weather`
- `Weather` N : N `Warning`

</details>

---
#### 1. feladat: `GET /locations` (2 pont)
<details><summary>több</summary>
Lekéri az összes létező mérőhelyet.

- Minta kérés: `GET http://localhost:8000/api/locations`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 1,
    "name": "officiis qui rem",
    "email": "roscoe25@example.com",
    "lat": 1.84941,
    "lon": 169.19919,
    "public": true,
    "created_at": "2024-12-15T10:03:03.000000Z",
    "updated_at": "2024-12-15T10:03:03.000000Z"
  },
  stb.
]
```
<details>
<summary>megoldása</summary>

`routes/api.php`
```php
//ezt kell hozzáadni:
//Minta kérés: GET http://localhost:8000/api/locations
Route::get('/locations', [ApiController::class, 'getLocations']);
```
`app/Http/Controllers/ApiController.php`
```php
class ApiController extends Controller
{
  //ezt adtam hozzá:
    public function getLocations()
    {
      //Válasz helyes kérés esetén: 200 OK
        return Location::all();
    }
  //--------------------
}
```
</details>

---

</details>



####  2. feladat: `GET /locations/:id` (4 pont)

<details>
<summary>több</summary>
Lekéri a megadott azonosítójú mérőhely adatait.

- Minta kérés: `GET http://localhost:8000/api/locations/4`
- Válasz, ha az `id` paraméter nem egész szám: `422 UNPROCESSABLE CONTENT`
- Válasz, ha a megadott `id`-vel nem létezik mérőhely: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "id": 4,
  "name": "est ea voluptas",
  "email": "juliet39@example.com",
  "lat": 63.2048,
  "lon": 92.09794,
  "public": true,
  "created_at": "2024-12-15T10:03:03.000000Z",
  "updated_at": "2024-12-15T10:03:03.000000Z"
}
```


<details>
<summary>megoldása</summary>

`routes/api.php`
```php
//ezt kell hozzáadni
//Minta kérés: GET http://localhost:8000/api/locations/4
Route::get('/locations/{id}', [ApiController::class, 'getLocation']);
```

`app/Http/Controllers/ApiController.php`
```php
//ezt kell hozzáadni:
public function getLocation($id)
{
    //Válasz, ha az id paraméter nem egész szám: 422  UNPROCESSABLECONTENT
    if (!is_numeric($id) || intval($id) != $id || $id <= 0) {
        return response()->json([], 422);
    }

    //Válasz, ha a megadott id-vel nem létezik mérőhely: 404 NOTFOUND
    $location = Location::find($id);

    if (!$location) {
        return response()->json([], 404);
    }
    
    //Válasz helyes kérés esetén: 200 OK
    return $location;
}
```

</details>

---

</details>


#### 3. feladat: `POST /locations` (4 pont)
<details>
<summary>több</summary>

Létrehoz egy új mérőhelyet a kérés törzsében (body) megadott adatokkal. A törzsnek minden alapértelmezett érték nélküli mezőt kötelezően tartalmaznia kell; tehát a `public` mező hiányozhat, amely esetben a létrehozott entitás és visszaadott válaszobjektum ezen mezője alapértelmezetten `true` értéket kell felvegyen.

_(A valóságban nyilván hitelesített felhasználó hozna létre entitásokat, de a zárthelyi ezen feladatánál egyelőre nem szükséges ezzel foglalkozni, bárki meghívhatja a végpontot.)_

Ne feledkezz meg arról, hogy a jelszót az adatbázisban nem nyers szövegként tároljuk! A jelszót hasításához használhatod akár a PHP nyelv beépített `password_hash()` függvényét is mentés előtt!

- Minta kérés: `POST http://localhost:8000/api/locations`
```json
{
  "name": "Lunaville",
  "email": "luna@ville.hu",
  "password": "password",
  "lat": 47.4972,
  "lon": 19.0402
}
```
- Válasz, ha a kérés törzse (body) hiányos vagy típushibás adatot tartalmaz: `422 UNPROCESSABLE CONTENT`
- Válasz, ha a kérésben szereplő név vagy email nem egyedi: `409 CONFLICT`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "id": ...,
  "name": "Lunaville",
  "email": "luna@ville.hu",
  "lat": 47.4972,
  "lon": 19.0402,
  "public": true,
  "createdAt": "2023-05-31T...",
  "updatedAt": "2023-05-31T..."
}
```

<details>
<summary>megoldása</summary>

`routes/api.php`
```php
//Minta kérés: POST http://localhost:8000/api/locations
Route::post('/locations', [ApiController::class, 'createLocation']);
```

`app/Http/Controllers/ApiController.php`
```php
public function createLocation(Request $request)
{
  // validáció
  // Válasz, ha a kérés törzse (body) hiányos vagy típushibás adatot tartalmaz: 422 UNPROCESSABLE CONTENT
  $validated = $request->validate([
      'name' => 'required|string',
      'email' => 'required|email',
      'password' => 'required|string',
      'lat' => 'required|numeric',
      'lon' => 'required|numeric',
      'public' => 'sometimes|boolean'
  ]);

  // Válasz, ha a kérésben szereplő név vagy email nem egyedi: 409 CONFLICT
  if (Location::where('name', $validated['name'])->exists() ||
      Location::where('email', $validated['email'])->exists()) {
      return response()->json([], 409);
  }

  // Public default értéke true
  $validated['public'] = $validated['public'] ?? true;

  // Jelszó hashelése
  $validated['password'] = password_hash($validated['password'], PASSWORD_DEFAULT);

  // Létrehozás
  $location = Location::create($validated);

  // Válasz helyes kérés esetén: 201 CREATED
  return response()->json($location, 201);
}
```


</details>

---

</details>


#### 4. feladat: `DELETE /locations/:id` (4 pont)
<details>
<summary>több</summary>

Az adott azonosítójú mérőhely törlése.

_(Hitelesítés ennél a feladatnál sem szükséges még.)_

- Minta kérés: `DELETE http://localhost:8000/api/locations/4`
- Válasz, ha az `id` paraméter nem egész szám: `422 UNPROCESSABLE CONTENT`
- Válasz, ha a megadott `id`-vel nem létezik mérőhely: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`

A válasz tartalma tetszőleges lehet, a feladatnál csak a státuszkódot ellenőrizzük!

<details>
<summary>megoldása</summary>

`routes/api.php`
```php
//ezt adtam hozzá:
//Minta kérés: DELETE http://localhost:8000/api/locations/4
Route::delete('/locations/{id}', [ApiController::class, 'deleteLocation']);
```

`app/Http/Controllers/ApiController.php`
```php
//ezt adtam hozzá:
public function deleteLocation($id)
{
    // Válasz, ha az id paraméter nem egész szám: 422 UNPROCESSABLE CONTENT
    if (!is_numeric($id) || intval($id) != $id || $id <= 0) {
        return response()->json([], 422);
    }
    // Válasz, ha a megadott id-vel nem létezik mérőhely: 404 NOT FOUND
    $location = Location::find($id);
    if (!$location) {
        return response()->json([], 404);
    }

    // Törlés
    $location->delete();

    // Válasz helyes kérés esetén: 200 OK
    return response()->json([], 200);
}
```

</details>

---

</details>


#### 5. feladat: `POST /login` (4 pont)
<details>
<summary>több</summary>

**Hitelesítés.** Ezen a végponton keresztül lehet bejelentkezni **mérőhelyként**, tehát ebben a feladatsorban nem nevesített felhasználókat, hanem mérőhelyeket kezelünk hitelesítés szempontjából. Erre a _Laravel Sanctum_ már fel van készítve. 

A bejelentkezéshez két adatot kell elküldeni: egy mérőhelyhez tartozó email címet, valamint a megfelelő jelszót, amely alapértelmezetten `password` minden mérőhelynél.

- Minta kérés: `POST http://localhost:8000/api/login`
```json
{
  "email": "location4@weather.org",
  "password": "password"
}
```
- Válasz, ha a kérés formailag hibás (pl. nincs `email` vagy `password` mező): `422 UNPROCESSABLE CONTENT`
- Válasz, ha nem létezik ilyen e-mail cím vagy helytelen a beírt jelszó: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "token": "3|VHAdpyvJghyyhc2xagdiWrFDeSQywCm38hKtOvcJ90d9d52a"
}
```

<details>
<summary>megoldása</summary>

`routes/api.php`
```php
//ezt adtam hozzá:
// Minta kérés: POST http://localhost:8000/api/login
Route::post('/login', [ApiController::class, 'login']);
```

`app/Http/Controllers/ApiController.php`
```php
//ezt adtam hozzá:
public function login(Request $request)
{
    // Válasz, ha a kérés formailag hibás: 422 UNPROCESSABLE CONTENT
    $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required|string'
    ]);

    // Mérőhely megkeresése
    $location = Location::where('email', $validated['email'])->first();

    // Válasz, ha nem létezik ilyen e-mail cím vagy helytelen a bejegyzett jelszó: 401 UNAUTHORIZED
    if (!$location || !password_verify($validated['password'], $location->password)) {
        return response()->json([], 401);
    }

    // Token generálása
    $token = $location->createToken('api-token')->plainTextToken;

    // Válasz helyes kérés esetén: 201 CREATED
    return response()->json(['token' => $token], 201);
}
```

</details>

---

</details>



# zh_minta_2

<details><summary>adatbázis</summary>

- `Country` - résztvevő ország
  - `id`
  - `name` - string, egyedi (unique)
  - `email` - string, a zsűriként való belépéshez használt email cím, egyedi (unique)
  - `password` - string, jelszóhash, rejtett mező
  - `created_at`
  - `updated_at`
- `Song` - döntőbe jutott dal
  - `id`
  - `title` - string, a dal címe
  - `artist` - string, az előadó neve
  - `year` - integer, a dal indulásának éve
  - `country_id` - integer, a dalt indító ország azonosítója
  - `created_at`
  - `updated_at`
  - További megkötés: `year` és `country_id` együtt egyedi (unique); vagyis egy országtól egy évben csak egy dal indulhat.
- `Vote` - szavazatok
  - `id`
  - `televote` - boolean, igaz esetén nézői, hamis esetén zsűri által adott pontszámról van szó
  - `from_country_id` - integer, a szavazó ország azonosítója
  - `to_song_id` - integer, a megcélzott dal azonosítója
  - `points` - integer, hány pontot kapott a dal
  - `created_at`
  - `updated_at`
  - További megkötés: `televote`, `from_country_id` és `to_song_id` együtt egyedi (unique); vagyis egy országtól egy dalra ugyanolyan típusú pontszám csak egy lehet.

A fenti modellek közötti kapcsolatok:

- `Country` 1 : N `Song`
- (szavazó adó ország) `Country` 1 : N `Vote` 
- (szavazatot kapó dal) `Song` 1 : N `Vote` 

_Természetesen 1:N kapcsolatot egy felvett mezővel, N:N kapcsolatot pedig külön kapcsolótábla létrehozásával tárolunk. A kapcsolótábla neve az összekapcsolt modellek nevéből képzendő betűrendi sorrendben! Mivel a feladatok között törlés is van, az adatbázisban `cascade` mechanizmust állítottunk be!_

</details>

---

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

