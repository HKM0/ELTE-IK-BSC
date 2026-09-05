# Szerveroldali webprogramozás - API ZH (2026.01.07.)

## Tudnivalók

<details>
<summary>Szabályok megjelenítése</summary>

- A zárthelyi megoldására **150 perc** áll rendelkezésre, amely a kidolgozás mellett **magába foglalja** a kötelező nyilatkozat értelmezésére és kitöltésére, a feladatok elolvasására, az anyagok letöltésére, összecsomagolására és feltöltésére szánt időt is.
- A kidolgozást a ZH rendszeren keresztül kell beadni egyetlen **.zip** állományként. **A rendszer pontban 19:00-kor lezár, ezután nincs lehetőség beadásra!**
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
2. Kicsomagolás, majd `cd` a megfelelő könyvtárba
3. `cp .env.example .env`
4. `composer install`
5. `php artisan migrate --seed`
6. `php artisan key:generate`
7. `php artisan serve` vagy `composer run dev`
</details>



## Feladatok

**🍕 Üdvözlünk Giorno pizzériájában, ahol minden rendelés egyedi!**

Ebben a feladatsorban egy pizzéria háttérrendszerének elkészítésben kell segédkezz, ahol a vásárlók összeállíthatják a saját pizzájukat a rendelkezésre álló feltétekből. Hajrá! 🧑‍🍳

### Adatbázis

A feladathoz a kezdőcsomagban készen adjuk a migrációkat, modelleket és seedert. Az alábbi modellekkel kell dolgozni:

- `Customer` - egy vásárló
  - `id`
  - `name` - string
  - `email` - string, egyedi (unique)
  - `password` - string, jelszóhash, rejtett mező
  - `created_at`
  - `updated_at`
- `Pizza` - egy pizza (rendelés)
  - `id`
  - `name` - string, lehet null is
  - `size` - enum, lehetséges értékei: 24, 32, 50
  - `base` - enum, lehetséges értékei: tomato, cream, bbq, none
  - `cheese_crust` - boolean, alapértelmezetten hamis
  - `created_at`
  - `updated_at`
- `Topping` - egy pizzafeltét
  - `id`
  - `name`: string, egyedi (unique)
  - `price`: integer, az adott feltét egy adagjának ára
  - `created_at`
  - `updated_at`

_Természetesen 1:N kapcsolatot egy felvett idegenkulcs mezővel, N:N kapcsolatot pedig külön kapcsolótábla létrehozásával tárolunk. A kapcsolótábla neve az összekapcsolt modellek nevéből képzendő betűrendi sorrendben! Mivel a feladatok között törlés is lehet, az adatbázisban `cascade` mechanizmust állítottunk be!_

A fenti modellek közötti kapcsolatok:

- `Customer` 1 : N `Pizza`
  - Egy vásárló több pizzát vásárolhat, de minden pizza egy vásárlóhoz tartozik.
- `Topping` N : N `Pizza`
  - Egy feltétet több pizzán is használhatunk, és egy pizzára többféle feltétet is lehet választani.
  - **Lehet rendelni nagyon sajtos, extra csípős, stb. pizzákat is -- tehát ugyanazt az összetevőt többször is rá lehet rakni egy pizzára.** A feltét mennyiségét a kapcsolótábla `amount` mezője mutatja meg -- legtöbbször 1 az értéke, de nem mindig. Erre majd külön felhívjuk a figyelmet egyes feladatokban, ahol számít.


### I. rész: REST API (30 pont, min. 12 pont elérése szükséges!)

#### 1. feladat: `GET /pizzas` (2 pont)

Visszaadja az összes pizza minden adatmezőjét.

- Minta kérés: `GET http://localhost:8000/api/pizzas`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
      "id": 1,
      "name": "Közepes margherita",
      "size": 32,
      "base": "tomato",
      "cheese_crust": false,
      "customer_id": 1,
      "created_at": "2026-01-07T16:30:00.000000Z",
      "updated_at": "2026-01-07T16:30:00.000000Z"
  },
  stb.
]
```

#### 2. feladat: `GET /customers/{customer}/pizzas` (3 pont)

Lekéri a megadott azonosítójú vásárló által rendelt pizzák minden adatmezőjét.

- Minta kérés: `GET http://localhost:8000/api/customers/3/pizzas`
- Válasz, ha a `customer` paraméter nem egész szám: `422 UNPROCESSABLE CONTENT`
- Válasz, ha a `customer` paraméter egész szám, de nem létezik ilyen azonosítóval vásárló: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 3,
    "name": "Erik kedvence",
    "size": 32,
    "base": "bbq",
    "cheese_crust": true,
    "customer_id": 3,
    "created_at": "2026-01-07T16:30:00.000000Z",
    "updated_at": "2026-01-07T16:30:00.000000Z"
  },
  stb.
]
```

#### 3. feladat: `POST /pizzas` (4 pont)

Létrehoz egy új pizzát a kérés törzsében (body) megadott adatokkal. A feladat akkor teljes értékű, ha megtörténnek az alábbi validációk:

- `name`: nem kötelező (ilyenkor alapértelmezetten `null`), string
- `size`: kötelező, egész szám a következő értékek közül: 24, 32, 50
- `base`: kötelező, string a következő értékek közül: tomato, cream, bbq, none
- `cheese_crust`: nem kötelező (ilyenkor alapértelmezetten `false`), logikai
- `customer_id`: kötelező, egész szám, egy létező vásárló azonosítója

Oldd meg, hogy a válasz a nem kötelező mezőket is tartalmazza abban az esetben is, ha nem adtuk meg őket a bemenetben!

_(Hitelesítés ennél a feladatnál nem szükséges még.)_

- Minta kérés: `POST http://localhost:8000/api/pizzas`
```json
{
  "size": 32,
  "base": "tomato",
  "customer_id": 3
}
```
- Válasz, ha a kérés törzse (body) validációs hibát tartalmaz: `422 UNPROCESSABLE CONTENT`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "size": 32,
  "base": "tomato",
  "customer_id": 3,
  "name": null,
  "cheese_crust": false,
  "updated_at": "2026-01-07T16:45:00.000000Z",
  "created_at": "2026-01-07T16:45:00.000000Z",
  "id": 11
}
```

#### 4. feladat: `GET /pizzas/{pizza}/toppings` (4 pont)

Lekérdezi egy megadott azonosítójú pizzán lévő feltételeket.

A feladatot többféle nehézségi szinten is meg lehet oldani:á

- **2 pontért:** a feltéteket a kapcsolaton keresztül lekérve, minden változtatás nélkül visszaadva.
- **4 pontért:** a kimenetet megformázva, hogy csak a feltét nevét és darabszámát tartalmazza.
  - Technikai segítség: `$pizza -> toppings[0] -> pivot -> amount` a 0. feltét darabszáma

---

- Minta kérés: `GET http://localhost:8000/api/pizzas/2/toppings`
- Válasz, ha a `pizza` paraméter nem egész szám: `422 UNPROCESSABLE CONTENT`
- Válasz, ha a `pizza` paraméter egész szám, de nem létezik ilyen azonosítóval pizza: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`

<details>
  <summary>2 pontos megoldás mintaválasza</summary>

```json
[
  {
    "id": 1,
    "name": "mozzarella",
    "price": 240,
    "created_at": "2026-01-07T16:30:00.000000Z",
    "updated_at": "2026-01-07T16:30:00.000000Z",
    "pivot": {
      "pizza_id": 2,
      "topping_id": 1,
      "amount": 2
    }
  },
  stb.
]
```
</details>

<details>
  <summary>4 pontos megoldás mintaválasza</summary>

```json
[
  {
    "name": "mozzarella",
    "amount": 2
  },
  {
    "name": "cheddar",
    "amount": 2
  },
  {
    "name": "parmezán",
    "amount": 1
  },
  {
    "name": "márványsajt",
    "amount": 1
  }
]
```
</details>

#### 5. feladat: `GET /toppings` (6 pont)

Láthatjuk, hogy nem mindegyik feltét egyformán népszerű. Add vissza az összes feltétet kiegészítve azzal, hogy az adott feltétet hányszor rendelték (`ordered`) és mennyi bevételt hozott (`profit = ordered * price`)! Rendezd is a feltéteket a válaszban a hozott bevétel szerint csökkenő sorrendbe!

Részpontok természetesen kaphatók az összes feltét visszaadására, az `ordered` mező kiszámítására, `profit` mező előállítására rendezés nélkül, bármely mező szerinti rendezésre, stb.

Technikai segítség: [Aggregation related models](https://laravel.com/docs/12.x/eloquent-relationships#aggregating-related-models) -- Ne feledkezz meg arról sem, hogy ugyanazt feltétet akár többször is fel lehet rakni egy pizzára! (Lehet nem megszámolni kell, hanem ...?)

- Minta kérés: `GET http://localhost:8000/api/toppings`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 18,
    "name": "ananász",
    "price": 1290,
    "created_at": "2026-01-07T16:30:00.000000Z",
    "updated_at": "2026-01-07T16:30:00.000000Z",
    "ordered": 2,
    "profit": 2580
  },
  {
    "id": 1,
    "name": "mozzarella",
    "price": 240,
    "created_at": "2026-01-07T16:30:00.000000Z",
    "updated_at": "2026-01-07T16:30:00.000000Z",
    "ordered": 10,
    "profit": 2400
  },
  stb.
]
``` 

<details>
  <summary>Segítség: frissen seedelt adatbázis esetén kiszámított értékek</summary>

|     | id | name        | ordered | profit |
| --- | -- | ----------- | ------- | ------ |
| 1.  | 18 | ananász     | 2       | 2598   |
| 2.  | 1  | mozzarella  | 10      | 2400   |
| 3.  | 16 | jalapeno    | 6       | 1920   |
| 4.  | 5  | sonka       | 5       | 1695   |
| 5.  | 8  | kolbász     | 3       | 1437   |
| 6.  | 14 | lilahagyma  | 4       | 1280   |
| 7.  | 7  | tarja       | 3       | 1170   |
| 8.  | 2  | cheddar     | 4       | 960    |
| 9.  | 11 | kukorica    | 4       | 960    |
| 10. | 4  | márványsajt | 2       | 880    |
| 11. | 17 | olivabogyó  | 2       | 880    |
| 12. | 6  | bacon       | 2       | 780    |
| 13. | 9  | csirke      | 2       | 780    |
| 14. | 12 | paradicsom  | 3       | 720    |
| 15. | 3  | parmezán    | 2       | 680    |
| 16. | 10 | gomba       | 2       | 580    |
| 17. | 15 | bab         | 2       | 480    |
| 18. | 19 | bazsalikom  | 2       | 380    |
| 19. | 13 | uborka      | 1       | 299    |

</details>

#### 6. feladat: `POST /login` (3 pont)

**Hitelesítés.** Ezen a végponton keresztül lehet bejelentkezni **egy vásárlóként**. Erre a _Laravel Sanctum_ már fel van készítve. 

A bejelentkezéshez két adatot kell elküldeni: egy email címet, valamint a megfelelő jelszót, amely alapértelmezetten `password` mindenkinél.

- Minta kérés: `POST http://localhost:8000/api/login`
```json
{
  "email": "turierik@inf.elte.hu",
  "password": "password"
}
```
- Válasz, ha a kérés formailag hibás (pl. nincs `email` vagy `password` mező): `422 UNPROCESSABLE CONTENT`
- Válasz, ha nem létezik ilyen e-mail cím vagy helytelen a beírt jelszó: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "token": "1|ycY4CgTSvB0b6ldshelBEuH5FamEImz4pYi285lV3a1587d2"
}
```

#### 7. feladat: `PUT /pizzas/{pizza}/toppings` (8 pont)

A korábbi feladatban ügyesen létrehoztunk egy teljesen üres pizzát, azonban a valóságban biztosan szeretnénk rá némi feltétet is kérni.

Előadáson körbejártuk már, hogy az N:N kapcsolat API végpontokra való leképezésének több módja is lehet, ezek közül most a következőt választottuk: egy `PUT` kérés, amiben megadjuk a pizzára kerülő feltéteket és a kérés feldolgozása után pontosan ezek fognak a pizzán szerepelni -- függetlenül attól, hogy a kezdeti állapot mi volt. Helyes kérés esetén a válasz a feltétek felsorolása a 4. feladattal megegyező módon.

**Hitelesített végpont!** Hitelesítés nélkül adjunk `401 UNAUTHORIZED` státuszkódot!

**Jogosultságkezelés:** Amennyiben a hitelesített felhasználó nem a pizzához tartozó vendég (`customer_id` alapján), adjunk `403 FORBIDDEN` státuszkódot!

A feladatot többféle nehézségi szinten is meg lehet oldani:

- **4 pontért:** a feltéteket azonosítóval (ID) adjuk meg, nem lehet ugyanazt a feltétet többször felrakni egy pizzára.
- **6 pontért:** a feltéteket névvel adjuk meg, nem lehet ugyanazt a feltétet többször felrakni egy pizzára.
  - Technikai segítség: [whereIn()](https://laravel.com/docs/12.x/queries#additional-where-clauses)
- **8 pontért:** a feltéteket névvel adjuk meg, és ugyanabból a feltétből többet is lehet kérni egy pizzára (lásd a kapcsolótábla `amount` mezőjét).
  - Technikai segítség: [array_count_values()](https://www.php.net/manual/en/function.array-count-values.php), [Syncing associations](https://laravel.com/docs/12.x/eloquent-relationships#syncing-associations), [mapWithKeys()](https://laravel.com/docs/12.x/collections#method-mapwithkeys) -- de természetesen más módon is megoldható.

---

- Minta kérés: `PUT http://localhost:8000/pizzas/10/toppings`

<details>
  <summary>4 pontos megoldás mintabemenete</summary>

```json
{
  "toppings": [1, 5]
}
```
</details>

<details>
  <summary>6 pontos megoldás mintabemenete</summary>

```json
{
  "toppings": ["mozzarella", "sonka"]
}
```
</details>

<details>
  <summary>8 pontos megoldás mintabemenete</summary>

```json
{
  "toppings": ["mozzarella", "mozzarella", "sonka"]
}
```
</details>

- Válasz, ha a `pizza` paraméter nem egész szám: `422 UNPROCESSABLE CONTENT`
- Válasz, ha a megadott `pizza` azonosítóval nem létezik pizza: `404 NOT FOUND`
- Válasz, ha hitelesítési hiba történik: `401 UNAUTHORIZED`
- Válasz, ha jogosultságkezelési hiba történik: `403 FORBIDDEN`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "name": "mozzarella",
    "amount": 2
  },
  {
    "name": "sonka",
    "amount": 1
  }
]
```

#### Laravel-féle megoldások használata (Extra +5 pont)

Ezek a módosítások plusz pontokat érnek a REST API részhez. Erősen javasoljuk, hogy csak akkor kezdj hozzá ezekhez, amennyiben a GraphQL részből már biztosan megszerezted legalább a minimális pontszámot!

- (+1 pont) Készítsd el a `PizzaResource` nevű resource osztályt, ami a pizzák minden adatmezőjét visszaadja változatlanul. Használd ezt az osztályt az 1-2. (az eredmény itt pizzák gyűjteménye) és a 3. (az eredmény itt egy darab pizza) feladatban! Látszólag ezen a ponton a kimenet nem fog megváltozni.
  - (+1 pont) A resource osztály használatával módosítsd a `size` mező tartalmát. Szám helyett legyen mértékegységet is tartalmazó szöveg, pl. `32 cm` a mező értéke.
  - (+1 pont) Oldd meg, hogy a `PizzaResource` tartalmazzon egy `customer` mezőt is a vásárló adataival, de csak abban az esetben, ha ezeket az adatokat a lekérdezéskor már betöltöttük. (Ne okozzon N+1 problémát több pizza kiíratása.)
- (+1 pont) A 3. feladatban végzett validációkat szervezd ki egy request osztályba, majd használd is megfelelően!
- (+1 pont) A 7. feladatban végzett jogosultságellenőrzést (`customer_id`) szervezd ki egy policybe, majd használd is megfelelően!

### II. rész: GraphQL (20 pont, min. 8 pont elérése szükséges!)

Ezekhez a feladatokhoz a kiindulási sémát megadtuk a `graphql\schema.graphql` fájlban. A feladatok legtöbbjét (de nem mindegyiket) meg lehet írni az adott séma Lighthouse direktívákkal való kiegészítésével, de természetesen saját készítésű rezolverrel is elfogadjuk a megoldásokat.

#### 8. feladat: `Query.pizzas` (2 pont)

Minden pizza elemi mezőinek lekérése.

Kérés:
```graphql
query {
  pizzas {
    id
    name
    size
    base
    cheese_crust
    customer_id
    created_at
    updated_at
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "pizzas": [
      {
        "id": "1",
        "name": "Közepes margherita",
        "size": 32,
        "base": "tomato",
        "cheese_crust": false,
        "customer_id": "1",
        "created_at": "2026-01-07 16:30:00",
        "updated_at": "2026-01-07 16:30:00"
      },
      {
        "id": "2",
        "name": "Nagyon sajtos nagy pizza",
        "size": 50,
        "base": "tomato",
        "cheese_crust": true,
        "customer_id": "2",
        "created_at": "2026-01-07 16:30:00",
        "updated_at": "2026-01-07 16:30:00"
      },
      stb.
    ]
  }
}
```

#### 9. feladat: `Query.pizza` (2 pont)

Legyen lehetőség egy pizza adatait annak azonosítója alapján lekérdezni. Ha nem létezik ilyen azonosítójú pizza, akkor `null` választ kell adni.

Kérés:
```graphql
query {
  pizza(id: 9) {
    id
    name
    size
    base
    cheese_crust
    customer_id
    created_at
    updated_at
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "pizza": {
      "id": "9",
      "name": "Vendégem az egész tanszék",
      "size": 50,
      "base": "tomato",
      "cheese_crust": true,
      "customer_id": "1",
      "created_at": "2026-01-07 16:30:00",
      "updated_at": "2026-01-07 16:30:00"
    }
  }
}
```

#### 10. feladat: `Pizza.customer` és `Pizza.toppings` (2 pont)

Legyen lehetőség a pizza felől indulva lekérdezni a rajta lévő feltéteket és a vásárló adatait. Ehhez a kiindulási sémát ki kell egészíteni ezekkel a mezőkkel. Egyik mező sem lehet `null` ezek közül.

Megjegyzés: A kapcsolótábla extra mezőjével (`amount`) nem kell különösebben foglalkozni, azt már megoldottuk.

Kérés:
```graphql
query {
  pizza(id: 2) {
    id
    name
    size
    customer { name }
    toppings { name, price, pivot { amount } }
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "pizza": {
      "id": "2",
      "name": "Nagyon sajtos nagy pizza",
      "size": 50,
      "customer": {
        "name": "Németh Tamás"
      },
      "toppings": [
        {
          "name": "mozzarella",
          "price": 240,
          "pivot": {
            "amount": 2
          }
        },
        stb.
      ]
    }
  }
}
```

#### 11. feladat: `Mutation.createTopping` (4 pont)

Új feltét felvétele. Siker esetén visszaadja a létrejött feltétet, különben validációs hibát és `null` értéket ad.

A bemenő adatoknak adj meg a sémában egy `CreateToppingInput` definiciót, amely a modellben tárolt mezőket várja az automatikusan kitöltődő `id`, `created_at` és `updated_at` kivételével! **Ügyelj arra, hogy a feltét neve egyedi kell legyen, különben adatbázis-hibát kaphatsz!** Szerencsére a [dokumentációban](https://lighthouse-php.com/master/security/validation.html#validating-input-objects) találsz példát az input objektumok validációjára. Természetesen a feltét ára is mindenképpen pozitív kell legyen.

```graphql
mutation {
  createTopping(input: {
    name: "tonhal",
    price: 1140
  }) {
    id
    name
    price
    created_at
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "createTopping": {
      "id": "20",
      "name": "tonhal",
      "price": 1140,
      "created_at": "2026-01-07 17:55:00"
    }
  }
}
```

<details>
  <summary>Példa: mit várunk validációs hiba esetén?</summary>

```json
{
  "errors": [
    {
      "message": "Validation failed for the field [createTopping].",
      "extensions": {
        "validation": {
          "input.name": [
            "The input.name has already been taken."
          ]
        }
      }
    }
  ], 
  "data": {
    "createTopping": null
  }
}
```
</details>

#### 12. feladat: `Pizza.price` (4 pont)

Legyen lehetőség egy pizzától kiindulva lekérdezni annak árát, amit a következő képlettel számolunk ki:
`size * 100 + SUM(topping.price * topping.pivot.amount)` -- tehát az ár a centiméterben megadott méret százszorosa forintban, plusz a pizzára rakott feltétek ára a megfelelő darabszámban.

A feladatra részpontokat is lehet kapni a következők szerint:

- **2 pontért:** a mező csak a pizza méretét veszi figyelembe, a feltétekkel nem foglalkozik.
- **3 pontért:** a mező csak a pizza méretét és a feltéteket veszi figyelembe, de a feltétek mennyiségével nem foglalkozik.
- **4 pontért:** a mező csak a pizza méretét és a feltéteket veszi figyelembe, illetve a feltétek mennyiségével is helyesen számol.

Technikai segítség új mező létrehozásához: `php artisan lighthouse:field`

Ne felejsd el a létrehozott mezőt a sémába is beírni!

Kérés:
```graphql
query {
  pizzas {
    id
    name
    price
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "pizzas": [
      {
        "id": "1",
        "name": "Közepes margherita",
        "price": 3870
      },
      {
        "id": "2",
        "name": "Nagyon sajtos nagy pizza",
        "price": 6740
      },
      stb.
    ]
  }
}
```

<details>
  <summary>Segítség: frissen seedelt adatbázis esetén kiszámított értékek</summary>

| id | name                      | price |
| -- | ------------------------- | ----- |
| 1  | Közepes margherita        | 3870  |
| 2  | Nagyon sajtos nagy pizza  | 6740  |
| 3  | Erik kedvence             | 5908  |
| 4  | Pici magyaros             | 4269  |
| 5  | Csípős és kukoricás is    | 4560  |
| 6  | Egy kis hawaii            | 4918  |
| 7  | Mindent bele              | 10326 |
| 8  | Keménylegény              | 5619  |
| 9  | Vendégem az egész tanszék | 5869  |
| 10 | Üres pizza nyami          | 3200  |

</details>

#### 13. feladat: `Query.statistics` (6 pont)

Statisztika készítése.

- **1 pontért:** Készítsd el a sémában a `statistics` lekérdezést, amely egy `Statistics` típusú választ ad az alábbi három mezővel! (Egyik mező sem lehet `null`; feltételezhető, hogy mindig rendelkezésre áll legalább egy pizza és feltét az adatbázisban, illetve a kapcsolótábla sem üres.)
- **1 pontért:** `pizzaCount` - egész szám; az adatbázisban lévő pizzák darabszáma
- **2 pontért:** `averagePizzaPrice`: lebegőpontos szám; a megrendelt pizzák átlagos ára az előző feladatban leírt számítási módszer szerint
- **2 pontért:** `favouriteTopping` - egy `Topping`; az a feltét, amelyből a legtöbbet rendeltek (ha több ilyen van, bármelyik megadható)

Kérés:
```graphql
query {
  statistics {
    pizzaCount,
    averagePizzaPrice,
    favouriteTopping { id, name, price }
  }
}
```

Mintaválasz (frissen seedelt adatbázis esetén helyes):
```json
{
  "data": {
    "statistics": {
      "pizzaCount": 10,
      "averagePizzaPrice": 5527.9,
      "favouriteTopping": {
        "id": "1",
        "name": "mozzarella",
        "price": 240
      }
    }
  }
}
```