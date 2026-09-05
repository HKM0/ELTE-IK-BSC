# Szerveroldali webprogramozás - API zárthelyi minta 2.

## Tudnivalók

<details>
<summary>Szabályok megjelenítése</summary>

- A zárthelyi megoldására **150 perc** áll rendelkezésre, amely a kidolgozás mellett **magába foglalja** a kötelező nyilatkozat értelmezésére és kitöltésére, a feladatok elolvasására, az anyagok letöltésére, összecsomagolására és feltöltésére szánt időt is.
- A kidolgozást a ZH rendszeren keresztül kell beadni egyetlen **.zip** állományként. **A rendszer pontban XX:YY-kor lezár, ezután nincs lehetőség beadásra!**
- A `vendor` és `node_modules` (ha létezik) könyvtár beadása **TILOS!**
- A megfelelően kitöltött `STATEMENT.md` (nyilatkozat) nélküli megoldásokat **nem értékeljük**.
- A feladatok megoldása során **csak a megengedett dokumentáció** (php.net, Laravel és Lighthouse dokumentáció) **és a ZH rendszerbe előzetesen feltöltött saját anyagok** használhatók! A **mesterséges intelligencia bárminemű igénybevétele TILOS** (beleértve a kódszerkesztőhöz tartozó olyan kiegészítőket is, amelyek képesek kódot generálni vagy kódjavaslatokat adni). Szintén tiltott a zárthelyi időtartama alatt **emberi segítséget igénybe venni vagy más vizsgázónak segítséget nyújtani!** A fentiek közül bármely szabály megszegése esetén minden érintett hallgatónak **azonnali és végleges elégtelen** jár a tárgyból javítási lehetőség nélkül!
- A feladatokat **Laravel 12** környezetben, **PHP** nyelven kell megoldani, a **tantárgy keretein belül tanult** technológiák használatával és a biztosított **kezdőcsomagból kiindulva**! 
</details>

<details>
<summary>Segítség! Elkezdődött a ZH, de nem megy a PHP vagy a Composer!</summary>

Pánikra semmi ok! Ilyenkor is letöltheted a [PHPComposerInstaller.exe](#TODO) legfrissebb verzióját. Ha már offline módban vagyunk, akkor a VC++ Redistributable nem tud települni, ezért az EXE-t terminálból kell az ennek megfelelő kapcsolóval futtatni: `PHPComposerInstaller.exe --no-vc-redist`

Továbbra sem sikerül? Itt az idő, hogy jelezd a teremben felügyelőknek!

Az esetleges egyéb szükséges eszközöket (pl. Postman, GraphiQL) eléred a kezdőcsomag futtatásakor a gyökér útvonalon! Sajnos, ha már ZH mód van, akkor VS Code kiegészítők vagy egyéb szoftver telepítését nem tudjuk biztosítani.

</details>

<details>
<summary>Kezdőcsomag letöltése és beüzemelése</summary>

1. A zárthelyihez tartozó kezdőcsomagot [ide kattintva](#TODO) tudod letölteni ZIP-be csomagolva.
2. `cp .env.example .env`
3. `composer install`
4. `php artisan migrate --seed`
5. `php artisan key:generate`
6. `php artisan serve`
</details>



## Feladatok

**🎤 Üdvözlünk az Eurovíziós Dalfesztivál technikai színfalai mögött!**

Ebben a zárthelyiben betekintést nyerhetsz a világ egyik legnagyobb zenei eseményének digitális hátterébe — nem a színpadon fogsz tündökölni, hanem a szerveroldalon! 🎶🌍

Készen állsz, hogy te legyél az Eurovíziós Dalverseny backstage hőse, aki a szavazatokért és statisztikákért felel? Akkor hajrá! 🎧✨

### Adatbázis

A feladathoz a kezdőcsomagban készen adjuk a migrációkat, modelleket és seedert. Az alábbi modellekkel kell dolgozni:

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

### I. rész: REST API (30 pont, min. 12 pont elérése szükséges!)

#### 1. feladat: `GET /songs` (2 pont)

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

#### 2. feladat: `GET /songs/{year}` (2 pont)

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

#### 3. feladat: `POST /songs` (5 pont)

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

#### 4. feladat: `PATCH /songs/{id}` (4 pont)

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

#### 5. feladat: `GET /results/{year}` (7 pont)

Ezzel a végponttal a döntő egy adott évi végeredményét lehet lekérni. Természetesen ehhez szükség lesz némi feldolgozásra, ugyanis össze kell adni az adatbázisban található szavazatok pontszámait.

**Részpontok:**

- Az évszám validációjára önmagában nem jár pont, mert a 2. feladatban már erre szerezhettél pontot.
- **3 pont:** megjelennek az adott évben induló számok és az egyes számok által elért összpontszám.
- **5 pont:** az eredmény összpontszám szerint csökkenő sorrendben jelenik meg. _(Technikai segítség: előfordulhat, hogy a kimeneten nem tűnik rendezettnek a hívással már rendezett collection, használd a `-> values()` metódust ilyenkor.)_
- **7 pont:** az eredmény pontosan a következő adatokat tartalmazza: elért helyezés (1-től N-ig), a dalt indító ország neve, szerzett összpontszám. Az egyszerűség kedvéért a holtversenyeket nem kell kezelni.

<details>
  <summary>3 és 5 pontos megoldás (sorrend változik) mintaválasza helyes kérés esetén, 200 OK</summary>

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
</details>

<details>
  <summary>7 pontos megoldás mintaválasza helyes kérés esetén, 200 OK</summary>

```json
[
  {
    "place": 1,
    "country": "Australia",
    "totalPoints": 398
  },
  {
    "place": 2,
    "country": "Albania",
    "totalPoints": 348
  },
  stb.
]
```
</details>

#### 6. feladat: `POST /login` (3 pont)

**Hitelesítés.** Ezen a végponton keresztül lehet bejelentkezni **egy ország zsűrijeként**, tehát ebben a feladatsorban nem nevesített felhasználókat, hanem országokat kezelünk hitelesítés szempontjából. Erre a _Laravel Sanctum_ már fel van készítve. 

A bejelentkezéshez két adatot kell elküldeni: egy zsűrihez tartozó email címet, valamint a megfelelő jelszót, amely alapértelmezetten `pw_` és az ország neve kisbetűkkel (pl. `pw_serbia`).

- Minta kérés: `POST http://localhost:8000/api/login`
```json
{
  "email": "jury_serbia@eurovision.tv",
  "password": "pw_serbia"
}
```
- Válasz, ha a kérés formailag hibás (pl. nincs `email` vagy `password` mező): `422 UNPROCESSABLE CONTENT`
- Válasz, ha nem létezik ilyen e-mail cím vagy helytelen a beírt jelszó: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "token": "1|coGKJZiM3CgOJWBYWc7awMKpoJPHDR5MBsvLT6f1835ec0de"
}
```

#### 7. feladat: `GET /my-votes` (7 pont)

**Hitelesített végpont!** Visszaadja, hogy melyik számnak/országnak hány pontot adott a hitelesített zsűri. Az adatokat többféle formátumban is meg lehet adni, attól függően, hogy hány pontot szeretnél erre a feladatra kapni. Nyisd ki a mintaválaszokat!

**Részpontok:**

- **3 pont:** jelenjenek meg a hitelesített országhoz tartozó szavazatok további feldolgozás nélkül.
- **5 pont:** az adatok között jelenjen meg a szám indulásának éve is (`year`) mező, amit a dal alapján lehet visszakeresni.
- **7 pont:** a válasz pontosan a következő adatokat tartalmazza: év, szavazat típusa (`televote`), pontszám (`points`) és a szavazatot **kapott** ország neve (`to_country`). Utóbbit a dal és az országok táblája alapján kell visszakeresni.

Emlékeztető! A hitelesített végpontokra a következő fejléccel kell kérést küldeni:
```
Authorization: Bearer <token>
```

A hitelesített ország visszakeresését a token alapján pedig az `auth:sanctum` middleware megoldja helyetted.

- Minta kérés: `GET http://localhost:8000/api/my-votes`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
  
<details>
  <summary>3 pontos megoldás mintaválasza helyes kérés esetén, 200 OK</summary>

```json
[
  {
    "id": 291,
    "televote": 0,
    "from_country_id": 30,
    "to_song_id": 6,
    "points": 12,
    "created_at": "2025-05-23T22:25:07.000000Z",
    "updated_at": "2025-05-23T22:25:07.000000Z"
  },
  stb.
]
```
</details>

<details>
  <summary>5 pontos megoldás mintaválasza helyes kérés esetén, 200 OK</summary>

```json
[
  {
    "id": 291,
    "televote": 0,
    "from_country_id": 30,
    "to_song_id": 6,
    "points": 12,
    "year": 2023,
    "created_at": "2025-05-23T22:25:07.000000Z",
    "updated_at": "2025-05-23T22:25:07.000000Z"
  },
  stb.
]
```
</details>

<details>
  <summary>7 pontos megoldás mintaválasza helyes kérés esetén, 200 OK</summary>

```json
[
  {
    "year": 2023,
    "televote": 0,
    "to_country": "Croatia",
    "points": 12
  },
  stb.
]
```
</details>

### II. rész: GraphQL (20 pont, min. 8 pont elérése szükséges!)

Ezekhez a feladatokhoz a kiindulási sémát megadtuk a `graphql\schema.graphql` fájlban. A feladatok legtöbbjét (de nem mindegyiket) meg lehet írni az adott séma Lighthouse direktívákkal való kiegészítésével, de természetesen saját készítésű rezolverrel is elfogadjuk a megoldásokat.

#### 8. feladat: `Query.songs` és `Query.countries` (2 pont)

Minden dal és minden ország elemi mezőinek lekérése.

Kérés:
```graphql
query {
  songs {
    id
    title
    artist
    year
    country_id
    created_at
    updated_at
  }
  countries {
    id
    name
    email
    created_at
    updated_at
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "songs": [
      {
        "id": "1",
        "title": "quo in",
        "artist": "Theresia Feest",
        "year": 2023,
        "country_id": "1",
        "created_at": "2025-05-23 22:25:07",
        "updated_at": "2025-05-23 22:25:07"
      },
      stb.
    ],
    "countries": [
      {
        "id": "1",
        "name": "Albania",
        "email": "jury_albania@eurovision.tv",
        "created_at": "2025-05-23 22:25:00",
        "updated_at": "2025-05-23 22:25:00"
      },
      stb.
    ]
  }
}
```

#### 9. feladat: `Query.song` (2 pont)

Legyen lehetőség egy dal adatait annak azonosítója alapján lekérdezni. Ha nem létezik ilyen azonosítójú dal, akkor `null` választ kell adni.

Kérés:
```graphql
query {
  song (id: 3) {
    id
    title
    artist
    year
    country_id
    created_at
    updated_at
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "song": {
      "id": "3",
      "title": "maiores dolore qui reprehenderit at",
      "artist": "Sigurd Powlowski",
      "year": 2023,
      "country_id": "4",
      "created_at": "2025-05-23 22:25:07",
      "updated_at": "2025-05-23 22:25:07"
    }
  }
}
```

#### 10. feladat: `Song.from` (2 pont)

Legyen lehetőség egy dalból kiindulva lekérdezni az dallal nevező ország **nevét** külön mezőként!

Technikai segítség új mező létrehozásához: `php artisan lighthouse:field`

Az új mezőt a sémába (`graphql\schema.graphql`) is Neked kell felvenned.

Kérés:
```graphql
query {
  song (id: 3) {
    id
    title
    from
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "song": {
      "id": "3",
      "title": "maiores dolore qui reprehenderit at",
      "from": "Austria"
    }
  }
}
```

#### 11. feladat: `Mutation.createCountry` (4 pont)

Új résztvevő ország felvétele. Siker esetén visszaadja a létrejött országot, különben validációs hibát ad.

A bemenő adatoknak adj meg a sémában egy `CreateCountryInput` definiciót, amely a modellben tárolt mezőket várja az automatikusan kitöltődő `id`, `created_at` és `updated_at` kivételével! **Ügyelj arra, hogy az ország neve és email címe egyedi kell legyen, különben adatbázis-hibát kapsz (és 0 pontot)!** Szerencsére a [dokumentációban](https://lighthouse-php.com/master/security/validation.html#validating-input-objects) találsz példát az input objektumok validációjára.

Természetesen a megoldás akkor teljes értékű, ha a jelszót hashelve tároljuk! _(Hmmmm... vajon létezhet erre valami beépített Lighthouse direktíva? Járjunk utána!)_

```graphql
mutation {
  createCountry(input: {
    name: "LunaWorld",
    email: "lunlunlove@eurovision.tv",
    password: "ieatchicken"
  }) { 
    id
    name
    email
    password
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "createCountry": {
      "id": "39",
      "name": "LunaWorld",
      "email": "lunlunlove@eurovision.tv",
      "password": "$2y$12$83STGySLvSYkSiJGQxaTCuAzkiI6hXZ/faSIJMG4RJc86iULNjcuK"
    }
  }
}
```

#### 12. feladat: `Mutation.deleteVote` (3 pont)

Ezzel a mutációval törölni lehet egy adott szavazatot. Paraméterként meg kell adni, hogy melyik ország szavazott melyik számra. Ha van ilyen szavazat az adatbázisban, akkor töröljük.

Az eredmény minden esetben egy logikai érték legyen: hamis, ha nem létezik ilyen szavazat; illetve igaz, hogy létezett és törlésre került.

Ehhez a mutációhoz a sémát is Neked kell felvenned.

Kérés:
```graphql
mutation {
  deleteVote(from_country_id: 2, to_song_id: 8)
}
```

Mintaválasz:
```json
{
  "data": {
    "deleteVote": false
  }
}
```

#### 13. feladat: `Query.statistics` (7 pont)

Statisztika készítése.

- **1 pontért:** Készítsd el a sémában a `statistics` lekérdezést, amely egy `Statistics` típusú választ ad az alábbi három mezővel! (Egyik mező sem lehet `null`; feltételezhető, hogy mindig rendelkezésre áll legalább egy ország és dal az adatbázisban.)
- **1 pontért:** `countryCount` - egész szám; a résztvevő országok darabszáma
- **2 pontért:** `neverQualified`: egész szám; azon országok darabszáma, akik egyszer sem jutottak be a döntőbe (nem szerepel az adott `country_id` egy dalnál sem) 
- **3 pontért:** `mostLovedSong` - egy `Song`; az a dal, amely a legtöbb 12 pontos szavazatot kapta (ha több ilyen van, bármelyik megadható)

Kérés:
```graphql
query {
  statistics {
    countryCount,
    neverQualified,
    mostLovedSong { id, title, artist }
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "statistics": {
      "countryCount": 40,
      "neverQualified": 2,
      "mostLovedSong": {
        "id": "53",
        "title": "facere non sequi",
        "artist": "Maddison Conroy"
      }
    }
  }
}
```