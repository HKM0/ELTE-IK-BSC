# zh_minta_1

#### 8. feladat: `Query.locations` és `Query.weather` (2 pont)
<details><summary>több</summary>

Minden mérőhely és minden időjárásadat elemi mezőinek lekérése.

Kérés:
```graphql
query {
  locations {
    id
    name
    email
    lat
    lon
    public
    created_at
    updated_at
  }
  weather {
    id
    type
    location_id
    temp
    created_at
    updated_at
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "locations": [
      {
        "id": "1",
        "name": "non aut veniam",
        "email": "roscoe25@example.com",
        "lat": -58.9201,
        "lon": 75.2172,
        "public": true,
        "created_at": "2024-12-16 10:48:03",
        "updated_at": "2024-12-16 10:48:03"
      },
      stb.
    ],
    "weather": [
      {
        "id": "116",
        "type": "thunder",
        "location_id": "10",
        "temp": 29.7,
        "created_at": "2024-12-16 10:48:04",
        "updated_at": "2024-12-16 10:48:04"
      },
      stb.
    ]
  }
}
```

<details>
<summary>megoldása</summary>

hozzá kell adni az `@all` kulcsszót:

`graphql\schema.graphql`

- előtte:
    ```php
    type Query {
        locations: [Location!]!
        location(id: ID!): Location
        weather: [Weather!]!
        statistics: Statistics!
    }
    ```

- utána:
    ```php
    type Query {
        locations: [Location!]! @all
        location(id: ID!): Location
        weather: [Weather!]! @all
        statistics: Statistics!
    }
    ```


</details>

---

</details>



#### 9. feladat: `Query.location` (1 pont)
<details>
<summary>több</summary>

Legyen lehetőség egy mérőhely adatait annak azonosítója alapján lekérdezni. Ha nem létezik ilyen azonosítójú mérőhely, akkor `null` választ kell adni.

Kérés:
```graphql
query{
  location (id: 4){
    id
    name
    lat
    lon
    public
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "location": {
      "id": "4",
      "name": "vero veritatis est",
      "lat": 29.43253,
      "lon": 100.12515,
      "public": true
    }
  }
}
```

<details>
<summary>megoldása</summary>

hozzá kell adni a `@find` kulcsszót.
`graphql\schema.graphql`
```php
type Query {
    locations: [Location!]! @all
    location(id: ID!): Location @find #ide
    weather: [Weather!]! @all
    statistics: Statistics!
}
```



</details>

---

</details>


#### 10. feladat: `Weather.location` (1 pont)

<details>
<summary>több</summary>

Legyen lehetőség az időjárási adatok felől indulva lekérdezni a hozzá tartozó mérőhely adatait!

Kérés:
```graphql
query {
  weather {
    id
    type
    location {
      id
      name
      lat
      lon
    }
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "weather": [
      {
        "id": "1",
        "type": "other",
        "location": {
          "id": "1",
          "name": "non aut veniam",
          "lat": -58.9201,
          "lon": 75.2172
        }
      },
      stb.
    ]
  }
}
```

<details>
<summary>megoldása</summary>

Hozzá kell adni a `@belongsTo` kulcsszót (a "hozzá tartozó" miatt).
```php
type Weather {
    id: ID!
    type: String!
    location_id: ID!
    temp: Float!
    logged_at: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
    location: Location! @belongsTo #ide (a weather.location miatt)
    warnings: [Warning!]!
}
```

</details>

---

</details>



#### 11. feladat: `Mutation.createWeather` (3 pont)
<details>
<summary>több</summary>

Új időjárásmérési adat felvétele. Siker esetén visszaadja a létrejött bejegyzést, különben `null` értéket kap és hibát dob.

A bemenő adatoknak adj meg a sémában egy `CreateWeatherInput` definiciót, amely a modellben tárolt mezőket várja az automatikusan kitöltődő `id`, `created_at` és `updated_at_` kivételével!

```graphql
mutation {
  createWeather(input: {
    type: "sunny"
    location_id: 1
    temp: 22.4
    logged_at: "1996-07-09 10:25:00"
  }) { 
    id
    type
    location_id
    temp
    logged_at
    created_at
    updated_at
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "createWeather": {
      "id": "208",
      "type": "sunny",
      "location_id": "1",
      "temp": 22.4,
      "logged_at": "1996-07-09 10:25:00",
      "created_at": "2024-12-16 11:59:30",
      "updated_at": "2024-12-16 11:59:30"
    }
  }
}
```
<details>
<summary>megoldása</summary>

Hozzá kell adni a `@create(model: "Weather")` részt.
`graphql\schema.graphql`
```php
type Mutation {
    createWeather(input: CreateWeatherInput!): Weather @create(model: "Weather") # ide adtam hozzá
    setPublic(location_id: ID!, public: Boolean!): String!
}
```


</details>

---

</details>



#### 12. feladat: `Weather.warnings` (2 pont)
<details>
<summary>több</summary>
Legyen lehetőség az időjárási adatok felől indulva lekérdezni az adott mérésre kiadott figyelmeztetéseket. A figyelmeztetéseket riasztási szint szerint csökkenő sorrendben add meg!

Kérés:
```graphql
query {
  weather {
    id
    type
    warnings {
      id
      level
      message
    }
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "weather": [
      {
        "id": "1",
        "type": "other",
        "warnings": []
      },
      {
        "id": "2",
        "type": "cloudy",
        "warnings": [
          {
            "id": "1",
            "level": 3,
            "message": "ut"
          },
          stb.
        ]
      },
      stb.
    ]
  }
}
```
<details>
<summary>megoldása</summary>


ezt kell hozzáadni: `@belongsToMany @orderBy(column: "level", direction: DESC)`

`graphql\schema.graphql`
```php
type Weather {
    id: ID!
    type: String!
    location_id: ID!
    temp: Float!
    logged_at: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
    location: Location! @belongsTo
    warnings: [Warning!]! @belongsToMany @orderBy(column: "level", direction: DESC) # ide adtam hozzá
}
```

</details>

---

</details>





#### 13. feladat: `Location.currentTemp` (3 pont)
<details>
<summary>több</summary>

Legyen lehetőség a mérőhelyek felől indulva lekérni azt, hogy az adott mérőhelyhez tartozó legfrissebb bejegyzés (`logged_at` mező legnagyobb) szerint mennyi ott a hőmérséklet. Ha egy mérőhelyhez nem tartozik még időjárási adat, akkor `null` legyen az eredmény!

Technikai segítség új mező létrehozásához: `php artisan lighthouse:field`

Kérés:
```graphql
query {
  locations {
    id
    currentTemp
  }
}
```

Mintaválasz: 
```json
{
  "data": {
    "locations": [
      {
        "id": "1",
        "currentTemp": 22.207078323699534
      },
      {
        "id": "2",
        "currentTemp": null
      },
      {
        "id": "3",
        "currentTemp": 14.92278060875833
      },
      stb.
    ]
  }
}
```
<details>
<summary>megoldása</summary>

ezt a rész kell hozzáadni: `@field(resolver: "LocationResolver@currentTemp")`

`graphql\schema.graphql`
```php
type Location {
    id: ID!
    name: String!
    email: String!
    lat: Float!
    lon: Float!
    public: Boolean!
    created_at: DateTime!
    updated_at: DateTime!
    currentTemp: Float @field(resolver: "LocationResolver@currentTemp") # ide
}
```

`app/GraphQL/Resolver/LocationResolver.php`
```php
<?php

namespace App\GraphQL\Resolvers;

use App\Models\Location;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class LocationResolver
{
    public function currentTemp(Location $location, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): ?float
    {
        // Legfrissebb weather bejegyzés (legnagyobb logged_at) lekérése
        $weather = $location->weather()
            ->orderBy('logged_at', 'DESC')
            ->first();

        // Ha nincs weather adat, null-t adunk vissza
        return $weather?->temp;
    }
}
```

</details>

---

</details>

# zh_minta_2

#### 8. feladat: `Query.songs` és `Query.countries` (2 pont)
<details>
<summary>több</summary>
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

<details>
<summary>megoldása</summary>

hozzá kell adni az `@all` részt.

`graphql\schema.graphql`
```php
type Query {
    songs: [Song!]! @all # ide
    countries: [Country!]! @all # és ide
    song(id: ID!): Song
}
```

</details>

---

</details>


#### 9. feladat: `Query.song` (2 pont)
<details>
<summary>több</summary>

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

<details>
<summary>megoldása</summary>

hozzá kell adni az `@find` részt.

`graphql\schema.graphql`
```php
type Query {
    songs: [Song!]! @all
    countries: [Country!]! @all
    song(id: ID!): Song @find # ide
}
```

</details>

---

</details>


#### 10. feladat: `Song.from` (2 pont)
<details>
<summary>több</summary>

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

<details>
<summary>megoldása</summary>

A minta alapján hozzá kell adnom a `from` mezőt.

`graphql\schema.graphql`
```php
type Song {
    id: ID!
    title: String!
    artist: String!
    year: Int!
    country_id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    from: String! # ide
}
```

*mező létrehozás*
```powershell
php artisan lighthouse:field Song.from
```

`app/GraphQL/Types/Song/From.php`
```php
<?php declare(strict_types=1);

namespace App\GraphQL\Types\Song;

use App\Models\Song; # song import (manuálisan)
use App\Models\Country; # country import (manuálisan)

final readonly class From
{
    /** @param  array{}  $args */
    public function __invoke(Song $song, array $args): string
    {
        $country = Country::find($song->country_id);
        return $country->name ?? '';
    }
}

```

</details>

---

</details>

#### 11. feladat: `Mutation.createCountry` (4 pont)
<details>
<summary>több</summary>

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

<details>
<summary>megoldása</summary>

hozzá kell adni ezt a részt: `@create(model: "Country")`
valamint a CreateCountryInput input type-ot:

`graphql\schema.graphql`
```php
type Mutation {
    createCountry(input: CreateCountryInput!): Country @create(model: "Country") # ide
}

# ezt kellett hozzá adni:
input CreateCountryInput {
    name: String! @rules(apply: ["required", "string", "unique:countries,name"])
    email: String! @rules(apply: ["required", "email", "unique:countries,email"])
    password: String! @rules(apply: ["required", "string"]) @hash
}
```

</details>

---

</details>
