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
