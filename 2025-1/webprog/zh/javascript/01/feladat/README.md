# JavaScript csoport ZH minták

> **FIGYELEM!** A csoportos számonkérések összeállítása és értékelése az egyes gyakorlatvezetők feladata. Az alábbi feladatsorokat csupán mintaként közöljük, a tényleges zárthelyi felépítése, összetettsége, pontozása a gyakorlatvezető belátása szerint ettől eltérő lehet! Közös jellemző azonban, hogy a cél minden esetben az első három gyakorlaton tárgyalt témakörök ismeretének készségszintű ellenőrzése.

---

## JavaScript csoport ZH minta 1.

### 1. Feladat: Tömbök és objektumok

Végezd el az alábbi műveleteket a megadott adatokkal! Az eredményt a konzolra írjad! A megoldáshoz nem kell függvényeket létrehoznod.

```js
const numbers = [5, 2, 15, -3, 6, -8, -2];

const matrix = [
  [1, 0, 3],
  [0, 2, 0],
  [4, 5, 6],
  [0, 0, 0],
]

const searchResults = {
  "Search": [
    {
      "Title": "The Hobbit: An Unexpected Journey",
      "Year": "2012",
      "imdbID": "tt0903624",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit: The Desolation of Smaug",
      "Year": "2013",
      "imdbID": "tt1170358",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit: The Battle of the Five Armies",
      "Year": "2014",
      "imdbID": "tt2310332",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit",
      "Year": "1977",
      "imdbID": "tt0077687",
      "Type": "movie"
    },
    {
      "Title": "Lego the Hobbit: The Video Game",
      "Year": "2014",
      "imdbID": "tt3584562",
      "Type": "game"
    },
    {
      "Title": "The Hobbit",
      "Year": "1966",
      "imdbID": "tt1686804",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit",
      "Year": "2003",
      "imdbID": "tt0395578",
      "Type": "game"
    },
    {
      "Title": "A Day in the Life of a Hobbit",
      "Year": "2002",
      "imdbID": "tt0473467",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit: An Unexpected Journey - The Company of Thorin",
      "Year": "2013",
      "imdbID": "tt3345514",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit: The Swedolation of Smaug",
      "Year": "2014",
      "imdbID": "tt4171362",
      "Type": "movie"
    }
  ],
  "totalResults": "51",
  "Response": "True"
}
```

- **a.** A `numbers` tömb mindegyik eleméhez rendeld hozzá a négyzetét! (0,5 pont)
- **b.** Keresd ki a `numbers` tömb legkisebb elemét! (Ha kell, használhatod az `Infinity` értéket JavaScriptben.) (0,5 pont)
- **c.** Add meg a `matrix` mátrixnak azt a sorindexét, amelyben csupa 0 érték van! Ha nincs ilyen, -1-et adj vissza! (1 pont)
- **d.** Add vissza azokat az IMDB azonosítókat (`imdbID`) a `searchResults` nevű mozikeresési eredményből, amelyek olyan filmekhez tartoznak, amelyek 2010 utániak (`Year` mező) és a típusuk (`Type`) `movie`. (1 pont)

---

### 2. Feladat: HSL színválasztó

Adott az oldalon három range slider, aminek segítségével meg lehet adni egy szín hue, saturation és lightness értékét. Technikai segítség: CSS-ben a `hsl(120, 60%, 70%)` formátumban is meg lehet adni a színeket!

```html
<form>
  Hue: <input type="range" min="0" max="360" value="0"> <br>
  Saturation: <input type="range" min="0" max="100" value="50"> <br>
  Lightness: <input type="range" min="0" max="100" value="50"> <br>
  <button type="button">Set background color</button> <br>
  HSL string: <input type="text" readonly>
</form>
```

- **a.** A gombra kattintva írd ki a generált hsl CSS színkódot a "HSL string" szöveg utáni szöveges beviteli mezőbe! (1 pont)
- **b.** A gombra kattintva állítsd be az oldal háttérszínét a kiválasztott értékeknek megfelelően! (1 pont)
- **c.** Oldd meg, hogy ne csak a gombra, hanem a slidereket húzogatva azonnal változzon meg a háttérszín! Technikai segítség: használd a sliderek `input` eseményét! (1 pont)

---

### 3. Feladat: Kontaktlista

Adott az oldalon egy kontaklista az alábbi HTML szerkezetben. Minden kontaktnál van három gomb, amelyek a megfelelő információt fedik fel a kontakt adataiból. Egyetlen elem egyetlen eseménykezelő függvényével oldd meg az alábbi feladatokat!

```html
<div id="contacts">
  <section>
    <p class="name">Name: A</p>
    <p class="email" hidden>Email of A</p>
    <p class="address" hidden>Address of A</p>
    <p class="phone" hidden>Phone of A</p>
    <p>
      <button data-toggle="email">Email</button>
      <button data-toggle="address">Address</button>
      <button data-toggle="phone">Phone</button>
    </p>
  </section>
  <section>
    <p class="name">Name: B</p>
    <p class="email" hidden>Email of B</p>
    <p class="address" hidden>Address of B</p>
    <p class="phone" hidden>Phone of B</p>
    <p>
      <button data-toggle="email">Email</button>
      <button data-toggle="address">Address</button>
      <button data-toggle="phone">Phone</button>
    </p>
  </section>
  <section>
    <p class="name">Name: C</p>
    <p class="email" hidden>Email of C</p>
    <p class="address" hidden>Address of C</p>
    <p class="phone" hidden>Phone of C</p>
    <p>
      <button data-toggle="email">Email</button>
      <button data-toggle="address">Address</button>
      <button data-toggle="phone">Phone</button>
    </p>
  </section>
</div>
```

- **a.** Írd ki a konzolra a kattintott gomb feliratát és `data-toggle` értékét! (1 pont)
- **b.** A gombra kattintva írd ki a konzolra a kontakt nevét! Ha nem a gombra kattintunk, akkor ez ne történjen meg! (1 pont)
- **c.** Bármelyik gombra kattintva tedd láthatóvá az adott kontakt email mezőjét! (1 pont)
- **d.** Egy gombra kattintva tedd láthatóvá azt a mezőt, amely a gomb `data-toggle` értékében van megadva! (1 pont)

---

## JavaScript csoport ZH minta 2.

1. Kezdésnek töltsd le a kiindulási csomagot! Ebben megtalálható minden szükséges HTML és CSS állomány, amelyeket nem szükséges módosítanod a feladatok megoldása során.
2. Az **Új szelvény** feliratú gombra kattintva ez a gomb és a legördülő lista kerüljenek letiltásra! (Segítség: `disabled` HTML attribútumot kell beállítani.)
3. Az előzővel egyidejűleg jelenjen meg az oldalon egy táblázat, amely az egész számokat tartalmazza 1-től kezdve, és mérete a választott játéktípustól függően:
    - ötös lottó esetén: 10 sor × 9 oszlop
    - hatos lottó esetén: 5 sor × 9 oszlop
    - skandináv lottó esetén: 5 sor × 7 oszlop
4. Az egyes cellákra kattintva az adott cella kapja meg a `played` stílusosztályt! (A későbbi feladatok miatt célszerű lehet a kijelölt számot ezen a ponton egy tömbbe elmenteni.)
5. Ha a kattintáskor a cella már `played` osztályú, akkor távolítsd el róla a stílust! (Ha elmentetted a számot, akkor távolítsd el a tömbből is!)
6. Ha pontosan annyi cella van kijelölve, amennyi a szelvény feladásához szükséges (ötös lottó esetén 5, hatos esetén 6, skandináv esetén 7 szám), jelenjen meg az oldalon a `tasks` azonosítójú div! Ha időközben másra változik a kijelölt cellák száma, akkor a divet rejtsd el!
7. A **Sorsolás** feliratú gombra kattintáskor hívd meg a kiinduló csomagban kapott `drawLottery(n)` függvényt, és a visszakapott tömböt írd ki a `task6` azonosítójú elembe vesszővel-szóközzel tagolva, ahogyan a mintán látható! (A függvény paramétereként 5-ös, 6-os vagy 7-es értéket kell megadni; visszatérési értéke az adott típusú sorsolás nyerőszámait emelkedő sorrendben tartalmazó tömb.)
8. Az előzővel egyidejűleg a `task7` azonosítójú elembe írd ki, hogy hány találata van a játékosnak! (Hány közös eleme van a kisorsolt tömbnek és a kijelölt számok listájának? Ha nem sikerült az 1-5. feladatot megoldanod, égess be egy tetszőleges számtömböt az összehasonlításhoz.) Érdemes lehet algoritmikus megoldás helyett tömbfüggvényekben gondolkodni.
9. Sorsoláskor a `task8` azonosítójú elembe írd ki a kisorsolt nyerőszámok összes számjegyének összegét! (Ebben segíthet, ha a listát összefüggő stringgé alakítod, amit karakterenként dolgozol fel.)
    - Példa: `[5, 10, 11, 16, 26, 28, 32]` ⟶ 5 + 1 + 0 + 1 + 1 + 1 + 6 + 2 + 6 + 2 + 8 + 3 + 2 = 38
10. A `task9` azonosítójú elembe írd ki, hogy van-e a nyerőszámok között olyan szám, amelynek a négyzete is kisorsolásra került! (Például: 4 és 16 egy sorsoláson belül.) Mivel az 1 önmaga négyzete, ezért önmagában is teljesíti a feltételt. **NE égess be konkrét értékeket a megoldásodba!**
11. Oldd meg, hogy ne lehessen a szükségesnél (játéktól függően 5, 6 vagy 7) több számot kijelölni a táblázatban!

---

![Animációs minta](minta_js_anim.gif)