# Szerveroldali webprogramozás API ZH

**Kezdési időpont:** `2026-05-18 10:35:00`  
**Határidő:** `2026-05-18 13:05:00`

## Tudnivalók
<details>
<summary>Szabályok megjelenítése</summary>

- A zárthelyi megoldására **150 perc** áll rendelkezésre, amely a kidolgozás mellett **magába foglalja** a kötelező nyilatkozat értelmezésére és kitöltésére, a feladatok elolvasására, az anyagok letöltésére, összecsomagolására és feltöltésére szánt időt is.
- A kidolgozást a ZH rendszeren keresztül kell beadni egyetlen **.zip** állományként. **A rendszer pontban 13:05-kor lezár, ezután nincs lehetőség beadásra!**
- A `vendor` és `node_modules` (ha létezik) könyvtár beadása **TILOS!**
- A megfelelően kitöltött `STATEMENT.md` (nyilatkozat) nélküli megoldásokat **nem értékeljük**.
- A feladatok megoldása során **csak a megengedett dokumentáció** (php.net, Laravel és Lighthouse dokumentáció) **és a ZH rendszerbe előzetesen feltöltött saját anyagok** használhatók! A **mesterséges intelligencia bárminemű igénybevétele TILOS** (beleértve a kódszerkesztőhöz tartozó olyan kiegészítőket is, amelyek képesek kódot generálni vagy kódjavaslatokat adni). Szintén tiltott a zárthelyi időtartama alatt **emberi segítséget igénybe venni vagy más vizsgázónak segítséget nyújtani!** A fentiek közül bármely szabály megszegése esetén minden érintett hallgatónak **azonnali és végleges elégtelen** jár a tárgyból javítási lehetőség nélkül!
- A feladatokat **Laravel 12** környezetben, **PHP** nyelven kell megoldani, a **tantárgy keretein belül tanult** technológiák használatával és a biztosított **kezdőcsomagból kiindulva!**
</details>

<details>
<summary>Segítség! Elkezdődött a ZH, de nem megy a PHP vagy a Composer!</summary>

Pánikra semmi ok! Ilyenkor is letöltheted a [PHPComposerInstaller.exe](https://webprogramozas.inf.elte.hu:8081/attachments/2) legfrissebb verzióját. Ha már offline módban vagyunk, akkor a VC++ Redistributable nem tud települni, ezért az EXE-t terminálból kell az ennek megfelelő kapcsolóval futtatni: `PHPComposerInstaller.exe --no-vc-redist`

Továbbra sem sikerül? Itt az idő, hogy jelezd a teremben felügyelőknek!

Az esetleges egyéb szükséges eszközöket (pl. Postman, GraphiQL) eléred a kezdőcsomag futtatásakor a gyökér útvonalon! Sajnos, ha már ZH mód van, akkor VS Code kiegészítők vagy egyéb szoftver telepítését nem tudjuk biztosítani.
</details>
<details>
<summary>Kezdőcsomag letöltése és beüzemelése</summary>

1. A zárthelyihez tartozó kezdőcsomagot [ide kattintva](https://webprogramozas.inf.elte.hu:8081/attachments/3) tudod letölteni ZIP-be csomagolva.
2. Kicsomagolás, majd `cd` a megfelelő könyvtárba
3. `composer run setup`
4. `php artisan serve`
</details>

---
## Feladatok

Országszerte számtalan diák jelenleg azon aggódik, hogy az érettségi vizsgája hogyan fog sikerülni. Mi a felkészülésben nem tudunk nekik segíteni, de abban igen, ahogy informatikailag az érettségi eredményeket kezelő rendszerek rendben legyenek. Oldd meg az alábbi feladatokat!
Adatbázis

A feladathoz a kezdőcsomagban készen adjuk a migrációkat, modelleket és seedert. Az alábbi modellekkel kell dolgozni:

- `School` - egy iskola
    - `id`
    - `name` - string
    - `address` - string
    - `email` - string, egyedi (unique)
    - `password` - string, jelszóhash, rejtett mező
    - `created_at`
    - `updated_at`
- `Student` - egy diák
    - `id` - a diák oktatási azonosítója
    - `family_name` - string, a diák családi neve
    - `given_name` - string, a diák utóneve
    - `mother_name` - string, a diák anyjának születési neve
    - `birthdate` - date, a diák születési dátuma
    - `birthplace` - string, a diák születési helye
    - `created_at`
    - `updated_at`
- `Subject` - egy tantárgy
    - `id`
    - `name` - string

Természetesen 1:N kapcsolatot egy felvett idegenkulcs mezővel, N:N kapcsolatot pedig külön kapcsolótábla létrehozásával tárolunk. A kapcsolótábla neve az összekapcsolt modellek nevéből képzendő betűrendi sorrendben! Mivel a feladatok között törlés is lehet, az adatbázisban `cascade` mechanizmust állítottunk be!

A fenti modellek közötti kapcsolatok:

- `School` 1 : N `Student`
    - Egy iskolába több diák jár, de minden diák csak egy iskolába jár.
- `Student` N : N `Subject`
    - Egy diák több tantárgyból vizsgázik, és egy tantárgyból is több diák vizsgázik.
    - **A kapcsolótáblában az azonosítók mellett tároljuk még a vizsga szintjét és elért százalékos eredményt is a következő mezőkben:**
        - `high_level` - boolean, emelt szintű vizsga-e
        - `result_percent` - integer, a vizsga százalékos eredménye; lehet `null` is, ha még nincs rögzítve eredmény

## I. rész: REST API (30 pont, min. 12 pont elérése szükséges!)
### 1. feladat: `GET /students` (2 pont)

Visszaadja az összes diák minden adatmezőjét.
- Minta kérés: `GET http://localhost:8000/api/students`
- Válasz helyes kérés esetén: 200 OK
```json
[
  {
    "id": 70060058126,
    "family_name": "Róka",
    "given_name": "Luna",
    "mother_name": "Erdős Szelina",
    "birthdate": "2007-12-31",
    "birthplace": "Budapest 11",
    "school_id": 1,
    "created_at": "2026-05-18T08:37:00.000000Z",
    "updated_at": "2026-05-18T08:37:00.000000Z"
  },
  stb.
]
```

### 2. feladat: `GET /students/{student}/school` (3 pont)

Lekéri a megadott azonosítójú diák **iskolájának** minden adatmezőjét.

**(Vigyázz, a diák azonosítója az oktatási azonosító formátumát követi, NEM pedig a szokásos 1, 2, 3, … értékeket használtuk!)**

- Minta kérés: `GET http://localhost:8000/api/students/70060058126/school`
- Válasz, ha a `student` paraméter nem egész szám: `422 UNPROCESSABLE CONTENT`
- Válasz, ha a `student` paraméter egész szám, de nem létezik ilyen azonosítóval felhasználó: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`

```json
{
  "id": 1,
  "name": "Lágymányosi Informatikai Tehetséggondozó Gimnázium",
  "address": "1118 Budapest, Pázmány Péter sétány 1/C.",
  "email": "admin@lagymanyosinf.hu",
  "created_at": "2026-05-18T08:37:00.000000Z",
  "updated_at": "2026-05-18T08:37:00.000000Z"
}
```

### 3. feladat: `POST /students` (5 pont)

Létrehoz egy új diákot a kérés törzsében (body) megadott adatokkal. A feladat akkor teljes értékű, ha megtörténnek az alábbi validációk:

- `id`: kötelező, integer, egyedi, 11 számjegyből áll, első számjegye 7
- `family_name`: kötelező, string, legalább 2 karakter hosszú
- `given_name`: kötelező, string, legalább 2 karakter hosszú
- `mother_name`: kötelező, string, legalább 2 szóból áll
    - Segítség: nézz bele az `AppServiceProvider.php` fájlba ☺
- `birthdate`: kötelező, string, dátum formátumú, ≤ 2009-12-31
- `birthplace`: kötelező, string
- `school_id`: kötelező, integer, létező iskola azonosítója

_(Hitelesítés ennél a feladatnál nem szükséges még.)_

- Minta kérés: `POST http://localhost:8000/api/students`

```json
{
  "id": 71234567890,
  "family_name": "Nyúl",
  "given_name": "Rafael",
  "mother_name": "Hajnal Míra",
  "birthdate": "2008-10-31",
  "birthplace": "Sepsiszentgyörgy",
  "school_id": 1
}
```

- Válasz, ha a kérés törzse (body) validációs hibát tartalmaz: `422 UNPROCESSABLE CONTENT`
- Válasz helyes kérés esetén: `201 CREATED`

```json
{
  "id": 71234567890,
  "family_name": "Nyúl",
  "given_name": "Rafael",
  "mother_name": "Hajnal Míra",
  "birthdate": "2008-10-31",
  "birthplace": "Sepsiszentgyörgy",
  "school_id": 1,
  "updated_at": "2026-05-18T08:44:32.000000Z",
  "created_at": "2026-05-18T08:44:32.000000Z"
}
```

### 4. feladat: `GET /subjects` (5 pont)

Az Oktatási Hivatal szeretné tudni, hogy az egyes vizsgatárgyakból hány diák vizsgázott és milyen átlageredménnyel. Készíts egy végpontot, amely visszaadja az összes tantárgy alapvető adatait, kiegészítve az alábbi két számított mezővel:

1. `student_count`: hány diák vizsgázott az adott tantárgyból
2. `average_percent`: mennyi az átlagosan elért százalékos eredmény

- Feltételezhető, hogy legalább egy ember vizsgázott minden tantárgyból és van rögzített pontszáma.
- A `null` értékű eredményeket nem kell figyelembe venni.

Az eredményt rendezd `average_percent` szerint csökkenő sorrendbe!

Részpontok járnak a tantárgyak visszaadásáért, az egyes számításokért és a rendezésért is.

Technikai segítség: [Aggregating related models](https://laravel.com/docs/12.x/eloquent-relationships#aggregating-related-models)

- Minta kérés: `GET http://localhost:8000/api/subjects`
- Válasz helyes kérés esetén: `200 OK`

```json
[
  {
    "id": "PHY",
    "name": "fizika",
    "student_count": 2,
    "average_result": 76
  },
  {
    "id": "HUN",
    "name": "magyar nyelv és irodalom",
    "student_count": 19,
    "average_result": 72.625
  },
  stb.
]
```
<details>
<summary>Segítség: frissen seedelt adatbázis esetén kiszámított értékek</summary>

| id | name | student_count | average_result |
|----|------|----------------|----------------|
| PHY | fizika | 2 | 76 |
| HUN | magyar nyelv és irodalom | 19 | 72.625 |
| MAT | matematika | 19 | 69.556 |
| BIO | biológia | 5 | 69 |
| ENG | angol nyelv | 14 | 66.75 |
| GER | német nyelv | 5 | 61.667 |
| GEO | földrajz | 2 | 57 |
| HIS | történelem | 19 | 59.667 |
| CHE | kémia | 2 | 46.5 |
| INF | digitális kultúra | 12 | 60.714 |

</details>

###
### 5. feladat: `POST /login` (2 pont)

**Hitelesítés**. Ezen a végponton keresztül lehet bejelentkezni **egy iskolaként**. Erre a Laravel Sanctum már fel van készítve.

A bejelentkezéshez két adatot kell elküldeni: egy email címet, valamint a megfelelő jelszót, amely alapértelmezetten `password` minden iskolánál.

- Minta kérés: `POST http://localhost:8000/api/login`

```json
{
  "email": "admin@lagymanyosinf.hu",
  "password": "password"
}
```

- Válasz, ha a kérés formailag hibás (pl. nincs `email` vagy `password` mező): `422 UNPROCESSABLE CONTENT`
- Válasz, ha nem létezik ilyen e-mail cím vagy helytelen a beírt jelszó: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `201 CREATED`

```json
{
  "token": "2|mYLPNp0eez8reWjVb0Br0h5A8OEmJw2ZOCbc2I2ce3af5a1b"
}
```

### 6. feladat: `DELETE /students/{student}` (5 pont)

Kiderült, hogy néhány diák tévesen került az adatbázisba, mert mégsem jelentkezett érettségi vizsgára. Valósítunk meg egy olyan végpontot, amelyen keresztül a **saját iskolája** képes törölni a megadott azonosítójú diákot, ha nincs hozzá vizsgatantárgy rögzítve! A sikeres törlés esetén üres tartalmú választ adj vissza, az ennek megfelelő jelentésű státuszkóddal! Ennél a feladatnál a válasz tartalmát nem ellenőrizzük, csak a státuszkódot!

**Hitelesített végpont!** Hitelesítés nélkül adjunk 401 UNAUTHORIZED státuszkódot!

**Jogosultságkezelés:** Ha a diák létezik, de nem a hitelesített iskolához tartozik, akkor adjunk `403 FORBIDDEN` státuszkódot!

Olyan diákot NEM lehetséges törölni, akihez tartozik vizsgajelentkezés (szerepel a kapcsolótáblában), ilyen esetben adjunk `409 CONFLICT` státuszkódot!

(Segítség a teszteléshez: a seedelt adatok közül a 76089573376 azonosítójú diáknak nincs vizsgája, vagy az előző feladatban általad létrehozott diákokat is használhatod a sikeres eset teszteléséhez.)

- Minta kérés: `DELETE http://localhost:8000/api/students/76089573376`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz, ha a student paraméter nem egész szám: `422 UNPROCESSABLE CONTENT`
- Válasz, ha a student paraméter egész szám, de nem létezik ilyen azonosítóval diák: `404 NOT FOUND`
- Válasz, ha a diák létezik, de nem ehhez az iskolához tartozik: `403 FORBIDDEN`
- Válasz, ha a diák nem törölhető, mert van hozzá vizsgatárgy rendelve: `409 CONFLICT`
- Válasz helyes kérés esetén: `XXX NO CONTENT`

### 7. feladat: `GET /diplomas` (8 pont)

Gyakori eset, hogy egy-egy iskola dícsérő oklevelet nyomtat azok diákjai számára, akik kimagasló eredményt értek el az érettségi vizsgán egy vagy több tantárgyból. Definíciónk szerint kimagasló eredménynek minősül középszinten 80%, vagy emelt szinten 60% fölötti eredmény. Segítsd az iskolákat azzal, hogy előkészíted nekik az oklevél szövegét az alábbi leírás szerint.

Az oklevél szövege: `{Diák teljes neve} dícséretben részesül {tantárgyak felsorolása} tantárgyból kimagasló érettségi vizsgaeredményéért!`

**Hitelesített végpont!** Hitelesítés nélkül adjunk `401 UNAUTHORIZED` státuszkódot!

A feladatot több nehézségi szinten is megoldhatod:

- **2 pontért**: visszaadsz minden 80% fölötti eredményt a hitelesített iskolából (pl. kapcsolótáblában lévő rekordok), de nem az oklevelek szövegét
- **4 pontért**: visszaadsz minden 80% fölötti eredményt a hitelesített iskolából úgy, hogy minden tantárgyhoz egy-egy külön oklevelet generálsz a megfelelő szöveggel
- **6 pontért**:
    - a.) figyelembe visszük, hogy emelt szintű tárgy esetén a határ 60%, középszinten 80%; vagy
    - b.) ha egy diáknak több tantárgyból is járna oklevél, akkor is egyetlen oklevélszöveget generálunk, felsorolva benne a tárgyakat – pl. `matematika, angol nyelv és fizika` tantárgyból kap egy oklevelet (Segítség: lásd a kezdőcsomagban lévő `formatSubjectList()` privát metódust!)
- **8 pontért**: a 6 pontos feladat a.) és b.) része egyidejűleg teljesül

- Minta kérés: `GET http://localhost:8000/api/diplomas`

- Válasz, ha hitelesítési hiba történik: `401 UNAUTHORIZED`

- Válasz helyes kérés esetén: `200 OK`

```json
[
  "Róka Luna dícséretben részesül történelem, digitális kultúra, matematika és fizika tantárgyból
kimagasló érettségi vizsgaeredményéért!",
  "Szűcs Alexandra dícséretben részesül magyar nyelv és irodalom és matematika tantárgyból
kimagasló érettségi vizsgaeredményéért!"
]
```

<details>
<summary>Segítség: kinek jár oklevél és milyen eredménnyel a frissen seedelt adatbázis állapota alapján?</summary>

| Iskola ID | Név | Emelt szint | Százalék | Tantárgy |
|-----------|-----|-------------|----------|----------|
| 1 | Róka Luna | NEM | 81 | történelem |
| 1 | Róka Luna | IGEN | 70 | digitális kultúra |
| 1 | Róka Luna | IGEN | 98 | matematika |
| 1 | Róka Luna | IGEN | 76 | fizika |
| 1 | Szűcs Alexandra | IGEN | 63 | magyar nyelv és irodalom |
| 1 | Szűcs Alexandra | IGEN | 91 | matematika |
| 2 | Farkas Norbert | IGEN | 94 | magyar nyelv és irodalom |
| 2 | Tóth Anna Virág | IGEN | 69 | biológia |
| 2 | Tóth Anna Virág | NEM | 86 | magyar nyelv és irodalom |
| 4 | Kovács Áron Balázs | IGEN | 73 | magyar nyelv és irodalom |
| 4 | Kovács Áron Balázs | IGEN | 79 | digitális kultúra |
| 4 | Kulcsár Emma Liliána | NEM | 82 | magyar nyelv és irodalom |
| 4 | Kulcsár Emma Liliána | IGEN | 93 | matematika |
| 4 | Simon Miléna | IGEN | 77 | történelem |
| 5 | Fekete László Péter | NEM | 90 | digitális kultúra |
| 5 | Molnár Péter Akhilleusz | NEM | 94 | angol nyelv |
| 5 | Molnár Péter Akhilleusz | IGEN | 93 | matematika |
| 5 | Nagy Ambrózia | IGEN | 91 | biológia |

</details>

###
#### Laravel-féle megoldások használata (Extra +5 pont)

Ezek a módosítások plusz pontokat érnek a REST API részhez. Erősen javasoljuk, hogy csak akkor kezdj hozzá ezekhez, amennyiben a GraphQL részből már biztosan megszerezted legalább a minimális pontszámot!

- (+1 pont) Készítsd el a `StudentResource` nevű resource osztályt, ami a diákok minden adatmezőjét visszaadja változatlanul. Használd ezt az osztályt az 1. (az eredmény itt diákok gyűjteménye) és a 3. (az eredmény itt egy darab diák) feladatban! Látszólag ezen a ponton a kimenet nem fog megváltozni.
    - (+1 pont) A resource osztály használatával oldd meg, hogy a `family_name` és `given_name` mezők **helyett** egy `full_name` mező legyen a kimenetben, amely a diák teljes nevét tartalmazza (családi név és utónél szóközzel elválasztva)!
    - (+1 pont) Oldd meg, hogy a `StudentResource` tartalmazzon egy `school` mezőt is az iskola adataival, de csak abban az esetben, ha ezeket az adatokat a lekérdezéskor már betöltöttük. (Ne okozzon N+1 problémát több iskola kiíratása.)
        - Érdemes a megoldás helyességét az 1. feladat megfelelő módosításával tesztelni!
- (+1 pont) A 3. feladatban végzett validációkat szervezd ki egy request osztályba, majd használd is megfelelően!
- (+1 pont) A 6. feladatban végzett jogosultságellenőrzést szervezd ki egy policybe, majd használd is megfelelően!

## II. rész: GraphQL (20 pont, min. 8 pont elérése szükséges!)

Ezekhez a feladatokhoz a kiindulási sémát megadtuk a graphql\schema.graphql fájlban. A feladatok legtöbbjét (de nem mindegyiket) meg lehet írni az adott séma Lighthouse direktívákkal való kiegészítésével, de természetesen saját készítésű rezolverrel is elfogadjuk a megoldásokat.
### 8. feladat: `Query.students` (1 pont)

Minden diák elemi mezőinek lekérése.

Kérés:

```json
query {
  students {
    id
    family_name
    given_name
    mother_name
    birthdate
    birthplace
    school_id
    created_at
    updated_at
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "students": [
      {
        "id": "70060058126",
        "family_name": "Róka",
        "given_name": "Luna",
        "mother_name": "Erdős Szelina",
        "birthdate": "2007-12-31",
        "birthplace": "Budapest 11",
        "school_id": "1",
        "created_at": "2026-05-18 10:37:00",
        "updated_at": "2026-05-18 10:37:00"
      },
      stb.
    ]
  }
}
```

### 9. feladat: `Query.student` (3 pont)

Legyen lehetőség egy diák keresésére vezetéknév és utónév megadásával. Mindkét adatot kötelező megadni, és az **első** olyan diákot adjuk vissza, akinél mindkét adat egyezik a keresett értékkel. Ha nincs ilyen diák, akkor a válasz null legyen! **Figyelem! Ezt a mezőt a sémába is Neked kell beírnod a minta szerinti paraméterekkel!**

_(Hmmm… esetleg lehet-e két vagy több diák, akiknek megegyezik a neve? Vajon működni fog akkor is a megoldásod? Próbáld ki!)_

Kérés:

```json
query {
  student(family_name: "Róka", given_name: "Luna") {
    id
    family_name
    given_name
    mother_name
    birthdate
    birthplace
    school_id
    created_at
    updated_at
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "student": {
      "id": "70060058126",
      "family_name": "Róka",
      "given_name": "Luna",
      "mother_name": "Erdős Szelina",
      "birthdate": "2007-12-31",
      "birthplace": "Budapest 11",
      "school_id": "1",
      "created_at": "2026-05-18 10:37:00",
      "updated_at": "2026-05-18 10:37:00"
    }
  }
}
```

### 10. feladat: `Student.school` és `Student.subjects` (2 pont)

Legyen lehetőség a diák felől lekérni az iskolája adatait és a vizsgatantárgyait. Ehhez a kiindulási sémát ki kell egészíteni ezekkel a mezőkkel. Egyik mező sem lehet `null` ezek közül.

Megjegyzés: A kapcsolótábla extra mezőivel nem kell különösebben foglalkozni, azt már megoldottuk Neked.

Kérés:

```json
query {
  students {
    id
    family_name
    given_name
    school { name }
    subjects { name, pivot { high_level, result_percent } }
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "students": [
      {
        "id": "70060058126",
        "family_name": "Róka",
        "given_name": "Luna",
        "school": {
          "name": "Lágymányosi Informatikai Tehetséggondozó Gimnázium"
        },
        "subjects": [
          {
            "name": "angol nyelv",
            "pivot": {
              "high_level": false,
              "result_percent": null
            }
          },
          {
            "name": "történelem",
            "pivot": {
              "high_level": false,
              "result_percent": 81
            }
          },
          stb.
        ]
      },
      stb.
    ]
  }
}
```

### 11. feladat: `Mutation.changeStudentSchool` (2 pont)

Előfordul, hogy egy diák valamilyen okból iskolát vált. Készíts egy mutációt, amely a diák és az iskola azonosítójának ismeretében elvégzi a diák ezen mezőjének megváltoztatását. Siker esetén visszaadja a módosított diákot. Amennyiben a megadott diák ID nem létezik, hibát dob (pl. `"No query results for model..."`) és `null` értéket ad.

Kérés:

```json
mutation {
  changeStudentSchool(id: "70060058126", school_id: "2"){
    id
    family_name
    given_name
    school_id
    created_at
    updated_at
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "changeStudentSchool": {
      "id": "70060058126",
      "family_name": "Róka",
      "given_name": "Luna",
      "school_id": "2",
      "created_at": "2026-05-18 10:37:00",
      "updated_at": "2026-05-18 11:58:25"
    }
  }
}
```

### 12. feladat: `Query.studentsByYear` (2 pont)

Visszaadja az összes olyan diákot, akik egy adott évben (egész szám) születtek.

Technikai segítség: azokat a diákokat keressük, akinek a születési dátuma szövegként értelmezve a megadott évvel kezdődik.

Kérés:

```json
query {
  studentsByYear(year: 2008) {
    id
    family_name
    given_name
    birthdate
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "studentsByYear": [
      {
        "id": "73038423580",
        "family_name": "Molnár",
        "given_name": "Péter Akhilleusz",
        "birthdate": "2008-01-23"
      },
      stb.
    ]
  }
}
```

### 13. feladat: `Student.age` (3 pont)

Bővítsük ki a `Student` típust egy `age` mezővel, amely megadja, hogy a születési dátuma alapján hány éves (egész szám) a diák a futtatás pillanatában. (Példa: 2007. 05. 18-án született ember ma 19 éves, tegnap még 18 éves volt.)

(Technikai segítség: [PHP date_diff() függvény](https://www.php.net/manual/en/datetime.diff.php), de helyette akár használható a Carbon függvénykönyvtár is!)

Kérés:
```json
query {
  students {
    birthdate
    age
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "students": [
      {
        "birthdate": "2007-12-31",
        "age": 18
      },
      {
        "birthdate": "2007-01-22",
        "age": 19
      },
      {
        "birthdate": "2007-12-08",
        "age": 18
      },
      {
        "birthdate": "2009-04-22",
        "age": 17
      },
      stb.
    ]
  }
}
```

### 14. feladat: `Query.statistics` (7 pont)

Statisztika készítése.

- **1 pontért:** Készítsd el a sémában a `statistics` lekérdezést, amely egy `Statistics` típusú választ ad az alábbi három mezővel! (Egyik mező sem lehet `null`; feltételezhető, hogy mindig rendelkezésre áll legalább egy diák és tantárgy az adatbázisban, illetve a kapcsolótábla sem üres.)
- **1 pontért:** `studentCount` - egész szám; az adatbázisban lévő diákok darabszáma
- **2 pontért:** `nullResultCount`: egész szám; megadja, hogy hány olyan vizsgajelentkezés van, ahol az eredmény még nem ismert (`result_percent` értéke még `null`)
- **3 pontért:** `leastPopularSubject` - egy `Subject`; az a tantárgy, amelyből a legkevesebb diák jelentkezett vizsgázni

Kérés:

```json
query {
  statistics {
    studentCount
    nullResultCount
    leastPopularSubject { id, name }
  }
}
```
Mintaválasz (frissen seedelt adatbázis esetén helyes):

```json
{
  "data": {
    "statistics": {
      "studentCount": 20,
      "nullResultCount": 54,
      "leastPopularSubject": {
        "id": "PHY",
        "name": "fizika"
      }
    }
  }
}
```