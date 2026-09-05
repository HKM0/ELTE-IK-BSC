# React pót/javító ZH

_Kliensoldali webprogramozás_

_2022.06.08._

## Tudnivalók

- A zárthelyi megoldására **180 perc** áll rendelkezésre. **További 30 perc**et adunk a `README.md` fájl kitöltésére, a feladatok elolvasására, a szükséges telepítésekre, az anyagok letöltésére, összecsomagolására és feltöltésére.
- A feladatokat a Canvas rendszeren keresztül kell beadni. **A rendszer pontban 19:30-kor lezár, ezután nincs lehetőség beadásra**.
- A feladatok megoldásához **bármilyen segédanyag használható** (dokumentáció, előadás, órai anyag, cheat sheet). A zh időtartamában igénybe vett **emberi segítség tilos** (szinkron, aszinkron, chat, fórum, stb)! Erről nyilatkoztok az alább olvasható `README.md` fájlban is, ahol tudomásul veszitek ennek következményeit.
- A feladatok nem épülnek egymásra, **tetszőleges sorrendben** megoldhatók.

## Előkészületek

1. [Töltsd le a keretprogramot](???)!
2. A `react-potzh` főkönyvtárban telepítsd a függőségeket:
   ```
   cd react-potzh
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
3. A `react-potzh` mappát tömörítsd be és töltsd fel Canvasra!

## 1. Lekérés és szűrés (fetch-and-search, 10 pont)

Oldd meg a következő feladatokat!

- a. (2 pont) Jelenítsd meg a `users` konstansban megadott felhasználókat a listában!
- b. (2 pont) Szűrd le a `users` konstansban adott felhasználókat a `search` konstansban megadott szűrőfeltételnek megfelelően! Csak azokat jelenítsd meg, akiknek az összefűzött neve (`title first last`) tartalmazza a szűrőszöveget (`search`)!
- c. (2 pont) Legyen lehetőség szűrni az oldalon lévő szűrőmezőbe gépelve, azaz tedd a `search` konstanst állapotváltozóvá!
- d. (1 pont) Az oldal betöltődésekor helyezd a szűrőmezőbe a fókuszt!
- e. (3 pont) Az oldal betöltődésekor kérj le 200 véletlen felhasználóadatot, és azokkal dolgozz (azaz tedd a `users`-t állapotváltozóvá)! Használd ehhez az előkészített `fetchUsers` függvényt!

## 2. Számológép (calculator, 15 pont)

Redux segítségével készíts egy számológépet, amely képes a 4 alapműveletet elvégezni (összeadás, kivonás, osztás, szorzás), illetve az eddigi számításokat megjegyezni! A keretprogramban elő vannak készítve a nézetkomponensek. A Te feladatod a Redux store létrehozása (reducer, action, action creator), működtetése és rákötése a nézetkomponensekre.

Az állapottér egyik lehetséges felépítése ilyen:

```js
const initialState = {
  currentValue: 0,
  currentExpression: null,
  history: [],
  editorMode: false,
};
```

Itt `currentValue` tárolhatja az aktuálisan bevitt számot, `currentExpression` az aktuálisan szerkesztett kifejezést, `editorMode`-ra azért lehet szükség, hogy jelezzük, hogy a kijelzőn lévő érték épp szerkesztés alatt van-e vagy eredmény jelenik meg, `history`-ban a korábbi kifejezéseket tároljuk.

- a. (3 pont) Ha számra kattintunk, akkor küldjünk egy ennek megfelelő akciót a store-nak, és tároljuk el a beküldött értéket a `currentValue` és `currentExpression` mezőben!
- b. (1 pont) Jelenítsük meg ezeket az értékeket a megfelelő helyeken! A bevitt számot a kijelzőn, az aktuális kifejezést az "Aktuális" részben.
- c. (3 pont) Ha alapműveletre kattintunk, akkor küldjünk egy ennek megfelelő akciót a store-nak: fűzzük hozzá az aktuális kifejezéshez és tegyük üressé az aktuális értéket!
- d. (3 pont) Ha egyenlőségjelre kattintunk, akkor értékeljük ki az összegyűlt kifejezést! Ehhez használd a JavaScript `eval` függvényét, valahogy így: `const result = eval("2 + 3")`. A kiszámolt értéket jelenítsük meg a kijelzőn!
- e. (3 pont) Ha egyenlőségjelre kattintunk, akkor tároljuk el az aktuális kifejezést a `history`-ban, és jelenítsük is meg!
- f. (2 pont) Egyenlőség használata után a következő szám bevitele üríti az eddigi eredményt (nem azzal számol tovább).
- g. (+2 pont) A számológép használható billentyűzet segítségével is a "+-\*/" és számok billentyűket használva.

## 3. Kő-papír-olló (rock-paper-scissors, 15 pont)

Készíts egy kő-papír-olló játékot Websocket szerver segítségével! A játékállapotokat a szerver tárolja (ld. a lenti leírást), a Te feladatod az adatok megjelenítése és az üzenetek kezelése. A játék úgy fog működni, hogy az egyik kliens csatlakozik a játékhoz, és várakozó státuszba kerül (`joined` igaz, `waiting` igaz). Ha a másik kliens is csatlakozik a játékhoz, akkor mindkettejüknek megjelenik a játék (`joined` igaz, `waiting` hamis). Tippel az egyik, tippel a másik (`tip`), és ha mind a kettő megvan, akkor látják egymás tippjét (`otherTip`), az aktuális eredményt (`result`), az összesített eredményt (`overAll`), majd pár másodperc múlva az előző tippek eltűnnek, és újra lehet tippelni.

### Szerver

Indítsd el a szervert!

```
cd server
npm start
```

### Feladatok

_Megjegyzés: a szerver kettesével sorolja be a klienseket játékba. Ha két kliens is csatlakozik, akkor elképzelhető az automatikus frissítések miatt, hogy az egyik az egyik szobába kerül, míg a másik már egy újabba. Ilyenkor frissítsünk rá valamelyik kliensre, vagy indítsuk újra a szervert!_

- a. (2 pont) Kezdetben jelenjen meg a "Join game" gomb. Ha erre kattintunk, akkor küldjünk egy `join-game` üzenetet a szervernek!
- b. (2 pont) A válaszul érkező `join-game-response` üzenetre iratkozzunk fel, és hatására kerüljünk várakozó státuszba! Jelenjen meg a "Waiting" felirat! (A `joined` és a `waiting` is legyen igaz!)
- c. (3 pont) Ha a másik kliens is kapcsolódik, akkor a szervertől egy `game-started` üzenet fog érkezni. Iratkozzunk fel erre is, és ennek hatására jelenítsük meg a játékfelületet. Az első `ToggleButtonGroup` legyen elérhető (`disabled` hamis).
- d. (3 pont) A `ToggleButtonGroup`-ra kattintáskor az `onChange` esemény hívódik meg, az eseménykezelő 2. paramétere a tippelt értéket tartalmazza. Ebben küldjünk egy `tip` üzenetet az tippelt értékkel, és állítsuk is be a `ToggleButtonGroup` `value` értékét erre! Állítsuk a `ToggleButtonGroup`-ot elérhetetlenné.
- e. (2 pont) Ha a másik játékos is tippelt, akkor egy `tip-response` üzenet érkezik a szervertől. Iratkozzunk erre fel, és a benne lévő adatokat jelenítsük meg: a másik tippjét (`otherTip`), az aktuális eredményt (`result`), és az összesített eredményt is (`overAll`).
- f. (2 pont) 5 másodperc múlva töröljük a tippeket, az aktuális eredményt, és tegyük újra elérhetővé az első `ToggleButtonGroup`-ot!
- g. (1 pont) A "Leave game" gombra kattintva, küldjünk egy `leave-game` üzenetet a szervernek. Erre válaszul egy `game-over` üzenetet kapunk, aminek hatására jelenítsük meg a "Join game" gombot!
- h. (+1 pont) **Hibaüzenet jelzése** Iratkozzunk fel az `error` üzenetre, és ilyenkor a paraméterként érkező hibaüzenetet adjuk értékül az `error` állapotváltozónak. 6 másodperc után az üzenet automatikusan eltűnik.

### Kliens -> szerver üzenetek

- `join-game`: jelentkezés játékra. A szerver besorolja egy játékba. Ha már be van sorolva egy játékba, akkor nem sorolja be újabba. Sikeres csatlakozás esetén `join-game-response` választ ad a szerver. Ha megtelt a játék (2 fő), akkor `game-started` üzenetet kapunk a szervertől.
  - Paraméterek: -
  - Szerverválasz:
    - `join-game-response`
    - `game-started`
- `tip`: Tippelés, értéke: `paper`, `rock`, `scissors` lehet. Hiba akkor van, ha nem csatlakoztunk még játékhoz, nem telt meg a játék vagy már tippeltünk, de a másik még nem. Ha mind a ketten tippeltünk, akkor `tip-response` üzenetet kapunk a szervertől.
  - Paraméterek: `paper` / `rock` / `scissors`
  - Szerverválasz:
    - `tip-response`
- `leave-game`: a játék elhagyása. Nem lehet elhagyni egy játékot, ha nem vagyunk benne egyben. A szervertől `game-over` üzenetet kaphatunk ilyenkor.
  - Paraméterek: -
  - Szerverválasz:
    - `game-over`

### Szerver -> kliens üzenetek

- `join-game-response`: Csatlakozási kérelemre érkezik válaszul. Adata nincs.
- `game-started`: Ha megtelt a játék (2 fő), akkor mindenki a játékban megkapja ezt az üzenetet. Adata nincs.
- `tip-response`: Ha mindkét kliens tippelt, akkor mindenki a játékban megkapja az eddigi eredményeket. Mindkét játékos a maga szemszögéből kapja meg az üzenetet (azaz az egyiknél a `you: 11`, a másiknál a `you: 8`):
  ```js
  {
  lastRound: {
     you: 'paper',
     other: 'rock',
     result: 'You won' // 'You lost', 'Tie'
  },
  overAll: {
     you: 11,
     other: 8
  }
  }
  ```
- `game-over`: ha az egyik kliens elhagyja a játékot, akkor kapjuk ezt az üzenetet. Adata nincs.
