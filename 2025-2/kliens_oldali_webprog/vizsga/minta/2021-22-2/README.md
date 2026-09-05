# React ZH

_Kliensoldali webprogramozás_

_2022.05.20._

## Tudnivalók

- A zárthelyi megoldására **120 perc** áll rendelkezésre. **További 30 perc**et adunk a `README.md` fájl kitöltésére, a feladatok elolvasására, a szükséges telepítésekre, az anyagok letöltésére, összecsomagolására és feltöltésére.
- A feladatokat a Canvas rendszeren keresztül kell beadni. **A rendszer pontban 18:30-kor lezár, ezután nincs lehetőség beadásra**.
- A feladatok megoldásához **bármilyen segédanyag használható** (dokumentáció, előadás, órai anyag, cheat sheet). A zh időtartamában igénybe vett **emberi segítség tilos** (szinkron, aszinkron, chat, fórum, stb)! Erről nyilatkoztok az alább olvasható `README.md` fájlban is, ahol tudomásul veszitek ennek következményeit.
- A feladatok nem épülnek egymásra, **tetszőleges sorrendben** megoldhatók.

## Előkészületek

1. [Töltsd le a keretprogramot](???)!
2. A `react-zh` főkönyvtárban telepítsd a függőségeket:
   ```
   cd react-zh
   npm install
   ```
3. Az egyes feladatok könyvtárában ugyancsak telepíteni kell a függőségeket egyesével. Ahol `server` és `client` könyvtár van, ott ezt külön meg kell tenni.
   ```
   cd <feladat_könyvtára>
   npm install
   ```
4. Töltsd ki a `README.md` fájl nyilatkozatában a nevedet és a Neptun azonosítódat! **A megfelelően kitöltött `README.md` fájl nélkül a megoldást nem fogadjuk el!**
5. Ugyanitt megtalálod az egyes feladatok részfeladatainak felsorolását. Ebben az egyes `[ ]` közötti szóközt cseréld le `x`-re azokra a részfeladatokra, amiket sikerült (akár részben) megoldanod! Ez segít nekünk abban, hogy miket kell néznünk az értékeléshez.

## Beadás előtt

1. Ellenőrizd le, hogy a `README.md` fájlt kitöltötted-e!
2. Töröld ki az ÖSSZES `node_modules` könyvtárat!
3. A `react-zh` mappát tömörítsd be és töltsd fel Canvasra!

## 1. Elemi feladatok (elementaries, 9 pont)

Három elemi kis feladatot találsz ebben a feladatban, három különböző komponensben.

- (2 pont) **TaskA**
  - A gombra kattintva rejtsd el, illetve jelenítsd meg az alatta lévő bekezdést!
  - A gomb felirata is változzon az állapotnak megfelelően!
- (3 pont) **TaskB**
  - Tedd lehetővé, hogy a beviteli mezőbe lehessen gépelni!
  - Ha üres a beviteli mező, akkor a gomb legyen elérhetetlen (`disabled`)!
- (4 pont) **TaskC**
  - Hozd létre képURL-ek listáját és jelenítsd meg a képeket ez alapján!
  - A beviteli mezőben lehessen megadni egy kép URL-jét (pl. `https://picsum.photos/640/360`)!
  - Az űrlap elküldésekor az elküldést akadályozzuk meg, és adjuk hozzá az új képURL-t a szülőkomponensben definiált listához!

## 2. Teendők (todos, 15 pont)

Adott egy majdnem kész program teendők kezeléséhez, de hiányoznak belőlük dolgok. Oldd meg a következő feladatokat!

1. (3 pont) **A teendők megjelenítése** Jelenítsd meg a teendőket! Ezek az `App.js` fájlban a `todosTemplate` konstansban vannak definiálva és Context-en keresztül szeretnénk a gyerekkomponenseknek elérhetővé tenni.
2. (3 pont) **Új teendő hozzáadása** A "Teendő hozzáadása" gombra kattintva add hozzá a beírt szöveget a teendők listájához!
3. (3 pont) **Egy teendő elvégzetté/aktívvá tétele** Minden teendő mellett van egy jelölőnégyzet. Erre kattintva állítsuk át a teendő `checked` paraméterét igazról hamisra, vagy hamisról igazra!
4. (3 pont) **Egy teendő törlése** Minden teendő mellett van egy törlés gomb is. Erre kattintva távolítsuk el az adott teendőt a listából!
5. (3 pont) **A kész teendő számának meghatározása** A lista alatt jelezzük, hogy a teendők közül hány készült már el, azaz hánynak igaz a `checked` tulajdonsága!

## 3. Rádióadók (radios, 16 pont)

Egy Websocket (pontosabban Socket.io) szerver elérhetővé teszi az általa kezelt rádióadók listáját, és a feliratkozóknak elküldi a rádióadón aktuálisan játszott zeneszámot. A keretprogramban elő van készítve egy ilyen lista, amely képes a rádióadókat listázni, egy kapcsolóval a feliratkozást kezelni, ikonnal jelezni, hogy fel vagyunk-e iratkozva, illetve hányan iratkoztak fel a csatornára, végül pedig az aktuális zeneszámot kiírni.

### Szerver

Indítsd el a szervert!

```
cd server
npm start
```

### Az adattárolás formátuma

A feladatban az adatok tárolása és tárolási formája is Rád van bízva. Válaszd, amelyik kényelmesebb Neked!
Az alábbi adatokra lesz szükséged:

- rádióadók listája
- melyik adóra vagy feliratkozva
- az adónál mi az aktuális műsor
- hányan vannak feliratkozva már az adóhoz

**1. opció**: Tárolhatod ezeket külön állapotváltozókban, például:

```js
radioList = ["radio 1", "radio 2"];
joinedRadios = { "radio 1": true, "radio 2": false };
programs = { "radio 1": "Program 1", "radio 2": "Program 2" };
counters = { "radio 1": 12, "radio 2": 3 };
```

**2. opció**: Tárolhatod objektumok listájában is, például:

```js
radios = [
  { name: "Rádió 1", joined: true, program: "Program 1", counter: 12 },
  { name: "Rádió 2", joined: false, program: "Program 2", counter: 3 },
];
```

### Feladatok

1. (3 pont) **Rádióadók listája** Az oldal betöltődésekor küldj egy `list-radios` üzenetet a szervernek! Ugyancsak az oldal betöltődésekor iratkozz fel a `radios-listed` üzenetre, ami az 1. feladatbeli küldésre jön válaszul, tartalmazva a rádióadók listáját. Ezt a listát tárold el a `radioList` állapotváltozóban és jelenítsd meg a listát.
2. (3 pont) **Feliratkozás** A rádióadó neve melletti kapcsolóra kattintva csatlakozzunk az adott rádióadót figyelőkhöz. Ehhez küldjünk egy `join-radio` üzenetet a szervernek az adott rádióadó nevével. Iratkozzunk fel a `radio-joined` üzenetre, amelyben megkapjuk a rádió nevét és az aktuálisan játszott műsort is (ld. szerverüzenetek leírása).
3. (3 pont) **Feliratkozás jelzése** Ha nem vagyunk feliratkozva, akkor a `DoNotDisturbIcon` jelenjen meg. Sikeres feliratkozáskor jelenítsük meg a `PodcastsIcon`-t, a kapcsoló `checked` tulajdonságát állítsuk igazra, és a játszott programot is jelenítsük meg!
4. (3 pont) **Leiratkozás** A kapcsolót lekapcsolva küldjünk egy `leave-radio` üzenetet a rádió nevével, amelyre válaszul egy `radio-left` üzenetet kapunk. Iratkozzunk erre fel, és jelezzük az állapotváltozókban ezt a tényt!
5. (2 pont) **Műsor változása** A szerver időnként megváltoztatja az adott rádiadó aktuálisan sugárzott műsorát. Erről `program-added` üzenetben értesíti azokat a klienseket, akik figyelik a rádióadót. Iratkozzunk fel erre, és az állapotváltozókban módosítsuk meg a sugárzott műsort!
6. (2 pont) **Hallgatók száma** Ahányszor új kliens csatlakozik egy rádióadóhoz, annyiszor kapunk egy `counter-updated` üzenetet a szervertől benne a rádió nevével és a számláló értékével. Iratkozzunk fel erre, és az ikon melletti badge `badgeContent` tulajdonságába írjuk ezt az értéket!
7. (+1 pont) **Hibaüzenet jelzése** Iratkozzunk fel az `error` üzenetre, és ilyenkor a paraméterként érkező hibaüzenetet adjuk értékül az `error` állapotváltozónak. 6 másodperc után az üzenet automatikusan eltűnik.

### Kliens --> szerver üzenetek

- `list-radios`: rádiólista lekérése
  - Paraméterek: --
  - Szerverüzenet:
    - `radio-listed`
- `join-radio`: radióadó figyelése
  - Paraméterek:
    - rádióadó neve
  - Szerverüzenet:
    - `radio-joined`
    - `counter-updated`
- `leave-radio`: rádióadó elhagyása
  - Paraméterek:
    - rádióadó neve
  - Szerverüzenet:
    - `radio-left`
    - `counter-updated`

### Szerver --> kliens üzenetek

- `radios-listed`: rádiólista küldése
  - Paraméterek:
    - rádióadók neveinek tömbje
  - Példa:
    ```js
    ["Rádió1", "Rádió2"];
    ```
- `radio-joined`: sikeres csatlakozás
  - Paraméterek:
    - objektum a rádióadó nevével és az aktuális programmal
  - Példa:
    ```js
    {
      name: 'Rádió1',
      program: 'Program1'
    }
    ```
- `radio-left`: sikeres leiratkozás
  - Paraméterek:
    - rádióadó neve
- `counter-updated`: számláló módosult
  - Paraméterek:
    - objektum a rádióadó nevével és a számláló aktuális állásával
  - Példa:
    ```js
    {
      name: 'Rádió1',
      counter: 12
    }
    ```
- `program-added`: új műsor
  - Paraméterek:
    - objektum a rádióadó nevével és az új műsor adataival
  - Példa:
    ```js
    {
      name: 'Rádió1',
      program: 'Program2'
    }
    ```
- `error`: hiba
  - Paraméterek:
    - hibaüzenet szövege
