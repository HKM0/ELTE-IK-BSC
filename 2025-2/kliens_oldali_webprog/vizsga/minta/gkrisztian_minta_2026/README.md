# React ZH – Gyakorló feladatsor

_Kliensoldali webprogramozás_

Ez a feladatsor a **2025-26-2-es ZH felkészülési anyaga**. A feladatok ugyanazokat a mintákat és fogalmakat fedik le, mint a valódi ZH, de eltérő témában.

## Tudnivalók

- A feladatok **nem épülnek egymásra**, tetszőleges sorrendben megoldhatók.
- A keretprogramok a `react-zh/` mappában találhatók, a megoldások a `megoldas/` mappában.
- Ahol `server` és `client` könyvtár van, ott a függőségeket külön kell telepíteni.

```sh
# Általánosan
cd react-zh/<feladat_könyvtára> && npm install && npm run dev

# 3. feladat (könyvkölcsönző)
cd react-zh/3-rest-konyvkolcsonzo/server && npm install && npm run dev
cd react-zh/3-rest-konyvkolcsonzo/client && npm install && npm run dev
```

---

## 1. Filmkatalógus (1-filmkatalogus, 10 pont)

Készíts egy alkalmazást, amellyel nyomon követheted a kedvenc filmjeidet, és értékeléseket adhatsz hozzájuk!

A `data/filmsData.ts` fájl tartalmazza a filmek adatait:

```ts
interface Film {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  country: string;
  poster: string;
}

interface Review {
  filmId: number;
  score: number;   // 1–10
  comment: string;
}
```

Feladatok:

- a. (2 pont) A `FilmList` komponensben jelenleg csak az első film jelenik meg. Oldd meg, hogy az összes film megjelenjen a `filmsData` tömbből (`map`, ne felejtsd a `key` prop-ot)!
- b. (2 pont) Kattintással lehessen kiválasztani egy filmet! Kattintáskor tárold el az `App` komponens állapotterében a kiválasztott film azonosítóját (`selectedFilmId`). A kiválasztott film kártyája kapja meg a `film-card--selected` CSS osztályt!
- c. (2 pont) Keresd meg a kiválasztott filmet a `filmsData` tömbben, és add át a `FilmDetails` komponensnek! Ha nincs kiválasztott film, a komponens jelenítsen meg egy útmutatót (pl. „Válassz ki egy filmet a listából!"). Ha van kiválasztott film, jelenjenek meg a poszter, cím, rendező, valamint az év, műfaj és ország!
- d. (4 pont) Valósítsd meg az értékelések hozzáadását!
  - Az `App` komponensben hozz létre egy `reviews` állapotváltozót (kezdőértéke üres tömb), és írj egy `addReview` függvényt, amely hozzáfűzi az új értékelést! (1 pont)
  - A `ReviewForm` komponensben hozz létre helyi állapotváltozókat a pontszámhoz (`score`, kezdőértéke `5`) és a megjegyzéshez (`comment`, kezdőértéke `""`). Az input mezők `value` propja olvassa az állapotváltozót, az `onChange` eseménykezelő pedig frissítse azt (controlled input). Az `onSubmit` eseményre hívd meg az `onAdd` propot, majd állítsd vissza mindkét állapotváltozót! (2 pont)
  - A `ReviewList` komponensben jelenítsd meg az összes elmentett értékelést! Minden értékelésnél keresd ki a filmet (`filmId` alapján), és jelenítsd meg a film címét, a pontszámot és a megjegyzést! (1 pont)

---

## 2. Hibakeresés (2-mini-tasks-practice, 5 pont)

Keresd meg és javítsd ki a hibát az alábbi két feladatban!

- (2 pont) **Task 1 – Kívánságlista**: A termékek `Hozzáadás a kívánságlistához` gombjára kattintva vizuálisan ki tudjuk jelölni a terméket, és vissza is tudjuk vonni. Azonban a `Kívánságlistán: X termék` felirat mindig `0`-t mutat. Javítsd ki, hogy a szám helyesen tükrözze a kívánságlistán lévő termékek számát!

- (3 pont) **Task 2 – Notesz**: A `NotepadComponent` komponensben megjelenítjük a feljegyzéseket, és a `NoteForm` komponensben lehetőség van újabbakat hozzáadni. Jelenleg a `Hozzáadás` gomb megnyomásakor az új feljegyzés nem jelenik meg a listában. Javítsd a kódot, hogy az új feljegyzés megfelelően eltárolódjon és megjelenjen!

---

## 3. Könyvkölcsönző (3-rest-konyvkolcsonzo, 13 pont)

Készíts egy alkalmazást, ahol egy könyvtár kölcsönzéseit lehet kezelni. A `server` mappa egy kész Fastify szervert tartalmaz. A feladatod a `client` React alkalmazás elkészítése az API alapján.

**API dokumentáció** (szerver futása után): **http://localhost:3032/docs**

| Hol fut? | URL |
|----------|-----|
| **Backend (API)** | `http://localhost:3032` — a `server` mappa (`npm run dev`) |
| **Frontend (React)** | `http://localhost:5173` — a `client` mappa (`npm run dev`) |

A `server` mappa **kész** — ne módosítsd. A feladat a **`client`** mappában oldandó meg.

**Típusok** (`client/src/entities/`): a többi típus megadva; a **`Book`** típust neked kell megírnod (`entities/book.ts`, az API dokumentáció **Book** modellje alapján).

Feladatok:

- a. (3 pont) Írd meg a **`Book`** típust az API dokumentáció alapján (`entities/book.ts`), és exportáld az `entities/index.ts`-ből is. A könyvek a szervertől jöjjenek (`GET /books`), ne JSON-ból. Kezeld a betöltést és a hibát. A `BookList` komponens az API-ból érkező könyvlistával frissüljön.
- b. (2 pont) API-ból betöltve a könyvek szabad/foglalt állapota és az aktuális kölcsönző neve helyesen jelenjen meg.
- c. (2 pont) A **Kölcsönzés rögzítése** gomb küldje el a kölcsönzést a szerverre (`POST /books/:id/borrows`, mezők: `/docs`). Az űrlap és a validáció a keretben megvan.
- d. (2 pont) A kölcsönzési napló a szervertől töltődjön (`GET /borrows`). A megjelenítés a keretben kész.
- e. (2 pont) A naplóban a **Visszahozás** gomb zárja le a kölcsönzést (`PATCH /borrows/:id`, `returnedAt` — lásd `/docs`). Csak aktív kölcsönzésnél legyen elérhető.
- f. (2 pont) Kölcsönzés és visszahozás után a könyvlista és a napló automatikusan frissüljön (RTK Query tag invalidation), F5 nélkül.

---

## 4. Bevásárlókosár (4-cart, 12 pont)

Készíts Redux segítségével egy egyszerű bevásárlókosár-kezelő alkalmazást!
A kosárnak rögzített súlykapacitása van (30 kg), és 15 000 Ft-os büdzsé áll rendelkezésre. Termékeket lehet hozzáadni a kosárhoz, kiválasztani vagy eldobni őket. Ha a kosár összes termékének ára meghaladja a 10 000 Ft-ot, a vásárló 10%-os kedvezményt kap.

Lehetséges állapottér:

```js
{
  items: [
    { id: '1', name: 'Kenyér', price: 400, weight: 0.5, category: 'food', selected: false },
    { id: '2', name: 'Cola', price: 300, weight: 1.5, category: 'drink', selected: true },
  ],
  budget: 15000,
}
```

Lehetséges action-ök:

- `addToCart`: új termék hozzáadása
- `removeFromCart`: termék eltávolítása
- `toggleSelect`: termék kiválasztása / kiválasztás visszavonása

Feladatok:

- a. (2 pont) A **Kosárba tesz** gombra kattintva küldjön `addToCart` akciót a neve, súlya, ára és kategóriája alapján! A reducer automatikusan generálja az egyedi ID-t és állítsa be a `selected: false` értéket. Ha az új termék hozzáadásával a kosár összsúlya meghaladná a 30 kg-ot, a gomb legyen letiltva (`disabled`).
- b. (2 pont) A **Kivesz / Betesz** (Toggle) gomb küldjön `toggleSelect` akciót (payload: a termék ID-ja). Az `ital` (`drink`) kategóriájú termékeknél ez a gomb ne jelenjen meg.
- c. (2 pont) Az **X** gomb küldjön `removeFromCart` akciót, ami végleg törli a terméket a kosárból.
- d. (2 pont) A kosárban lévő termékek sora a státuszuknak megfelelően jelenjen meg. Kapjon `equipped` stílusosztályt, ha a termék `selected: true`. Ha a kosárban lévő termékek összes ára meghaladja a 10 000 Ft-ot, a súlysáv konténere kapjon `encumbered` stílusosztályt vizuális figyelmeztetésként.
- e. (2 pont) Számítsd ki és jelenítsd meg a **Végösszeget**: az összes kosárban lévő termék árának összege.
- f. (2 pont) Számítsd ki és jelenítsd meg a **Fizetendőt**: ha a végösszeg szigorúan nagyobb, mint 10 000 Ft, akkor a végösszeg 90%-a (kerekítve), egyébként a végösszeg maga.
