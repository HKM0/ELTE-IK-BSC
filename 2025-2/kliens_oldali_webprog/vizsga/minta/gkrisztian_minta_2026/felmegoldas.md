# Kliensoldali webprogramozás

<details>
<summary>telepites konzolon</summary>

```sh
# Általánosan
cd react-zh/<feladat_könyvtára> && npm install && npm run dev

# 3. feladat (könyvkölcsönző)
cd react-zh/3-rest-konyvkolcsonzo/server && npm install && npm run dev
cd react-zh/3-rest-konyvkolcsonzo/client && npm install && npm run dev
```
---

</details>

# G K minta feladatsor

## 1. Filmkatalógus (1-filmkatalogus, 10 pont)

<details>
<summary>leiras/adatok</summary>

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
---
</details>

Feladatok:

- a. (2 pont) A `FilmList` komponensben jelenleg csak az első film jelenik meg. Oldd meg, hogy az összes film megjelenjen a `filmsData` tömbből (`map`, ne felejtsd a `key` prop-ot)!
    <details>
    <summary>megoldása</summary>

    `a) Jelenítsd meg az összes filmet a filmsData tömbből! (map, ne felejtsd a key prop-ot!)`

    összes film a `filmsData` tömbből + `key prop`: 
    
    ```js
    <div className="film-list">
        <h2 className="section-title">Filmek</h2>
        {filmsData.map((film) => {      //bele kell rakni ebbe
          return (                      //return kell
            <button
                key={`film-${film.id}`}  //key prop
            >
                <span className="film-card__genre">
                    {film.genre}
                </span>
                <span className="film-card__title">
                    {film.title}
                </span>
                <span className="film-card__director">
                    {film.director}
                </span>
                <span className="film-card__year">{film.year}</ span>
            </button>
          )})}
    </div>
    ```

    ---
    </details>


- b. (2 pont) Kattintással lehessen kiválasztani egy filmet! Kattintáskor tárold el az `App` komponens állapotterében a kiválasztott film azonosítóját (`selectedFilmId`). A kiválasztott film kártyája kapja meg a `film-card--selected` CSS osztályt!
    <details>
    <summary>megoldása</summary>

    itt kell a `stílus` és az `onclick`-et hozzáadni:
    `src/components/FilmList.tsx`
    ```js
    <div className="film-list">
        <h2 className="section-title">Filmek</h2>
        {filmsData.map((film) => { 
          return ( 
            <button
                className={`film-card ${selectedFilmId == film. id && "film-card--selected"}`} //ezt kell a stílushoz hozzáadni
                onClick={() => onSelect(film.id)} //ezt pedig a kiválasztáshoz
                key={`film-${film.id}`} 
            >
                <span className="film-card__genre">
                    {film.genre}
                </span>
                <span className="film-card__title">
                    {film.title}
                </span>
                <span className="film-card__director">
                    {film.director}
                </span>
                <span className="film-card__year">{film.year}</ span>
            </button>
          )})}
    </div>
    ```

    Itt kell eltárolni az `App` komponens-ben az adatokat:
    `src/App.tsx`
    ```js
    function App() {
      // b) Tárold el a kiválasztott film azonosítóját (selectedFilmId, típusa: number | null)! (kezdőértéke: null)
      const [selectedFilmId, setSelectedFilmId] = useState<number | null>(null); //ide kell hozzáadni a tárolást
    ...
      return (
        <div className="app">
          <header className="app-header">
            <h1 className="app-title">Filmkatalógus</h1>
          </header>
          <div className="app-body">
            <FilmList
              selectedFilmId={selectedFilmId} // ide be kell rakni a 'selectedFilmId' -t.
              onSelect={setSelectedFilmId} // ide pedig a 'setSelectedFilmId'-t.
            />
            <div className="app-right-panel">
              <FilmDetails film={null} />
              <ReviewForm film={null} onAdd={() => {}} />
              <ReviewList reviews={[]} />
            </div>
          </div>
        </div>
      );
    }
    ```
    ---
    </details>
    
- c. (2 pont) Keresd meg a kiválasztott filmet a `filmsData` tömbben, és add át a `FilmDetails` komponensnek! Ha nincs kiválasztott film, a komponens jelenítsen meg egy útmutatót (pl. „Válassz ki egy filmet a listából!"). Ha van kiválasztott film, jelenjenek meg a poszter, cím, rendező, valamint az év, műfaj és ország!
    <details>
    <summary>megoldása</summary>

    `src/components/FilmDetails.tsx`

    ```js
    export function FilmDetails({ film }: Props) {
      ...
      return (
        <div className="panel">
          <div className="film-details__header">
            <img
              src= {film.poster} //{/* c) film.poster */""}
              width={60}
              height={90}
              alt= {film.title} //{/* c) film.title */""}
              className="team-logo"
            />
            <div className="film-details__info">
              <h2>{film.title} </h2> //{/* c) film.title */}
              <span className="muted">{film.director}</span> //{/* c) film.director */}
            </div>
          </div>
          <table className="film-details__table">
            <tbody>
              <tr>
                <th>Év</th>
                <td>{film.year}</td> //{/* c) film.year */}
              </tr>
              <tr>
                <th>Műfaj</th>
                <td>{film.genre}</td> //{/* c) film.genre */}
              </tr>
              <tr>
                <th>Ország</th>
                <td>{film.country}</td> //{/* c) film.country */}
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    ```

    `src/App.tsx`

    ```js
    ... //importok
    import "./App.css";
    import filmsData from './data/filmsData'; //itt az import
    ...
    function App() {
    ...
        // c) Keresd meg a kiválasztott filmet a filmsData-ból!
        const selectedFilm = filmsData.find((film) => film.id === selectedFilmId) ?? null; //itt keresem meg
    }
    ```

    ---
    </details>

- d. (4 pont) Valósítsd meg az értékelések hozzáadását!
  - Az `App` komponensben hozz létre egy `reviews` állapotváltozót (kezdőértéke üres tömb), és írj egy `addReview` függvényt, amely hozzáfűzi az új értékelést! (1 pont)
    <details>
    <summary>megoldása</summary>

    `src/App.tsx`
    ```js
    ...
    // d) Tárold el az értékeléseket (reviews, típusa: Review[])! (kezdőértéke: üres tömb)
    const [reviews, setReviews] = useState<Review[]>([]);

    // d) Írd meg az addReview függvényt, amely hozzáfűzi az új értékelést!
    // ezt kell hozzáadni:
    const addReview = (review:Review) => {
      setReviews(prev => [...prev, review]);
    }
    //---------------------------------

    return (
        <div className="app">
    ...
    }
    ```

    ---
    </details>
  - A `ReviewForm` komponensben hozz létre helyi állapotváltozókat a pontszámhoz (`score`, kezdőértéke `5`) és a megjegyzéshez (`comment`, kezdőértéke `""`). Az input mezők `value` propja olvassa az állapotváltozót, az `onChange` eseménykezelő pedig frissítse azt (controlled input). Az `onSubmit` eseményre hívd meg az `onAdd` propot, majd állítsd vissza mindkét állapotváltozót! (2 pont)
    <details>
    <summary>megoldása</summary>

    `src\App.tsx`
    ```js
    ...
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Filmkatalógus</h1>
        </header>
        <div className="app-body">
          <FilmList
            selectedFilmId={selectedFilmId}
            onSelect={setSelectedFilmId}
          />
          <div className="app-right-panel">
            <FilmDetails film={selectedFilm} />
            <ReviewForm film={selectedFilm} onAdd={addReview} /> // itt adom át a propokat
            <ReviewList reviews={[]} />
          </div>
        </div>
      </div>
    );
    ```

    `src\components\ReviewForm.tsx`
    ```js
    export function ReviewForm({ film, onAdd }: Props) {
      // d) Hozz létre helyi állapotváltozókat: score (szám, kezdőértéke 5) és comment (string, kezdőértéke "")!
      //állapotváltozók, ezek kellenek hozzá:
      const [score, setScore] = useState(5);
      const [comment, setComment] = useState("");
      //-----------------------------------------

      function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (film === null) return;
        // d) Hívd meg az onAdd propot a tipp adataival, majd állítsd vissza az állapotokat!
        //-----------------------------
        // ezeket kell hozzáadni:
        onAdd({
          score, // score: score
          comment, // comment: comment
          filmId: film.id
        });

        setScore(5);
        setComment("");
        //-----------------------------
      }

      return (
        <div className="panel">
          <h2 className="section-title">Értékelésem</h2>
          <form onSubmit={handleSubmit} className="review-form">
            <span className="review-form__label">
              {film ? film.title : "Film"}
            </span>
            <input
              type="number"
              min={1}
              max={10}
              value={score} //{/* d) score */0}
              onChange={(e) => setScore(parseInt(e.target.value))} //{/* d) */() => {}}
              className="score-input"
              disabled={film === null}
            />
            <span className="review-form__separator">/10</span>
            <input
              type="text"
              placeholder="Megjegyzés..."
              value={comment} //{/* d) comment */""}
              onChange={(event) => setComment(event.target.value)} //{/* d) */() => {}}
              className="score-input"
              style={{ width: "auto", flex: 1 }}
              disabled={film === null}
            />
            <button type="submit" className="btn" disabled={film === null}>
              Hozzáadás
            </button>
          </form>
        </div>
      );
    }
    ```


    ---
    </details>
  
  - A `ReviewList` komponensben jelenítsd meg az összes elmentett értékelést! Minden értékelésnél keresd ki a filmet (`filmId` alapján), és jelenítsd meg a film címét, a pontszámot és a megjegyzést! (1 pont)
    <details>
    <summary>megoldása</summary>

    `src\components\ReviewList.tsx`
    ```js
    <ul className="review-list">
      {reviews.map((review, index) => {
        // d) Keresd meg a filmet a filmsData-ból a review.filmId alapján!
        const film = filmsData.find(film => film.id === review.filmId) ?? null; //itt keresem a filmet
        if (!film) return null;
        return (
          <li key={index} className="review-item">
            <span>{film.title}</span> //{/* d) film.title */}
            <strong className="review-item__score">
              {review.score}/10 – {review.comment} //{/* d) review.score */}/10 – {/* d) review.comment */}
            </strong>
          </li>
        );
      })}
    </ul>
    ```



    ---
    </details>

---

## 2. Hibakeresés (2-mini-tasks-practice, 5 pont)

Keresd meg és javítsd ki a hibát az alábbi két feladatban!

- (2 pont) **Task 1 – Kívánságlista**: A termékek `Hozzáadás a kívánságlistához` gombjára kattintva vizuálisan ki tudjuk jelölni a terméket, és vissza is tudjuk vonni. Azonban a `Kívánságlistán: X termék` felirat mindig `0`-t mutat. Javítsd ki, hogy a szám helyesen tükrözze a kívánságlistán lévő termékek számát!
    <details>
    <summary>megoldása</summary>

    `src\components\Task1\WishlistComponent.tsx`

    ```js
    import { useState } from "react"; // kell az import
    import ProductCard from "./ProductCard";

    const products = [
      { id: "1", name: "Kék hátizsák", description: "Praktikus hátizsák mindennapra", image: "https://images.unsplash.com/  photo-1553062407-98eeb64c6a62?w=500" },
      { id: "2", name: "Piros kulacs", description: "Rozsdamentes acél kulacs 500ml", image: "https://images.unsplash.com/  photo-1602143407151-7111542de6e8?w=500" },
    ];

    const WishlistComponent = () => {
      //ezt le kell cserélni, erre:
      //const wishlistCount = 0;
      const [wishlistCount, setWishlistCount] = useState(0); //ezt hozzá kell adni

      //ezt hozzá kell adni a lentihez majd:
      function handleToggle(isWishlisted:boolean) {
        setWishlistCount(prev => prev + (isWishlisted ? 1 : -1));
      }
      //-------------------------------------

      return (
        <section className="page">
          <section className="hero">
            <h1>Task 1 – Kívánságlista</h1>
            <p>Kívánságlistán: {wishlistCount} termék</p>
          </section>
          <section className="product-list">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onToggle={handleToggle} /> //hozzá kell adni az 'onToggle={handleToggle}'-t
            ))}
          </section>
        </section>
      );
    };

    export default WishlistComponent;
    ```

    `src\components\Task1\ProductCard.tsx`

    ```js
    import { useState } from "react";

    interface Product {
      id: string;
      name: string;
      description: string;
      image: string;
    }

    interface ProductCardProps {
      product: Product;
      onToggle: (isWishlisted : boolean) => void; // ezt is hozzá kell adni
    }

    const ProductCard = ({ product, onToggle }: ProductCardProps) => { // itt az új 'onToggle'-t is hozzá kellett adni.
      const [isWishlisted, setIsWishlisted] = useState(false);

      function handleWishlistClick() {
        const next = !isWishlisted; // ezt hozzá kell adni
        setIsWishlisted(next); //ez itt 'next' kell, hogy legyen.
        onToggle(next); //ezt is hozzá kell adni
      }

      return (
        <div className={`card ${isWishlisted ? "favorite" : ""}`}>
          <img src={product.image} alt={product.name} />
          <div className="card-content">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <button onClick={handleWishlistClick}>
              {isWishlisted ? "Eltávolítás a kívánságlistáról" : "Hozzáadás a kívánságlistához"}
            </button>
          </div>
        </div>
      );
    };

    export default ProductCard;
    ```

    ---
    </details>

- (3 pont) **Task 2 – Notesz**: A `NotepadComponent` komponensben megjelenítjük a feljegyzéseket, és a `NoteForm` komponensben lehetőség van újabbakat hozzáadni. Jelenleg a `Hozzáadás` gomb megnyomásakor az új feljegyzés nem jelenik meg a listában. Javítsd a kódot, hogy az új feljegyzés megfelelően eltárolódjon és megjelenjen!
    <details>
    <summary>megoldása</summary>

    `src/components/Task2/NoteForm.tsx`

    ```js
    import { useState } from "react";

    //ez nem kell
    /*
    interface Note {
      id: number;
      text: string;
    }
    */

    interface NoteFormProps {
      //ezt le kell cserélni, erre:
      //notes: Note[];
      onAdd: (text: string) => void;
    }

    const NoteForm = ({ onAdd }: NoteFormProps) => { // itt az előbb lecserélt 'notes' helyett 'onAdd' lesz.
      const [text, setText] = useState("");

      function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //ezt le kell cserélni, erre:
        //notes.push({ id: Date.now(), text });
        onAdd(text); //ezt hozzá kell adni
        setText("");
      }

      return (
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            value={text}
            placeholder="Új feljegyzés..."
            onChange={(e) => setText(e.target.value)}
          />
          <button>Hozzáadás</button>
        </form>
      );
    };

    export default NoteForm;
    ```

    `src\components\Task2\NotepadComponent.tsx`

    ```js

    import { useState } from "react"; // kell az import
    import NoteForm from "./NoteForm";

    interface Note {
      id: number;
      text: string;
    }

    const INITIAL_NOTES: Note[] = [
      { id: 1, text: "Bevásárolni tejfölt és kenyeret" },
      { id: 2, text: "Befizetni a villanyszámlát" },
    ];

    const NotepadComponent = () => {
      //ezt le kell cserélni, erre:
      //const notes = INITIAL_NOTES;
      const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);

      // ezt hozzá kell adni:
      const addNote = (text: string) => {
        setNotes(prev => [...prev, {
          id: notes.length + 1,
          text // text: text
        }]);
      }

      /*
      itt a '<NoteForm notes={notes} />'-t 
      le kell cserélni arra, hogy '<NoteForm onAdd={addNote} />'
      */
      return (
        <section className="page">
          <section className="hero">
            <h1>Task 2 – Notesz</h1>
            <p>Feljegyzések száma: {notes.length}</p>
          </section>
          <section className="panel">
            /* itt a '<NoteForm notes={notes} />'-t 
            le kell cserélni arra, hogy '<NoteForm onAdd={addNote} />'  */
            <NoteForm onAdd={addNote} />
            <ul className="task-list"> 
              {notes.map((note) => (
                <li key={note.id} className="task-item">
                  <span>{note.text}</span>
                </li>
              ))}
            </ul>
          </section>
        </section>
      );
    };

    export default NotepadComponent;
    ```
    
    ---
    </details>
---

## 3. Könyvkölcsönző (3-rest-konyvkolcsonzo, 13 pont)
<details>
<summary>több</summary>

Készíts egy alkalmazást, ahol egy könyvtár kölcsönzéseit lehet kezelni. A `server` mappa egy kész Fastify szervert tartalmaz. A feladatod a `client` React alkalmazás elkészítése az API alapján.

**API dokumentáció** (szerver futása után): **http://localhost:3032/docs**

| Hol fut? | URL |
|----------|-----|
| **Backend (API)** | `http://localhost:3032` — a `server` mappa (`npm run dev`) |
| **Frontend (React)** | `http://localhost:5173` — a `client` mappa (`npm run dev`) |

A `server` mappa **kész** — ne módosítsd. A feladat a **`client`** mappában oldandó meg.

**Típusok** (`client/src/entities/`): a többi típus megadva; a **`Book`** típust neked kell megírnod (`entities/book.ts`, az API dokumentáció **Book** modellje alapján).

---
</details>

Feladatok:

- a. (3 pont) Írd meg a **`Book`** típust az API dokumentáció alapján (`entities/book.ts`), és exportáld az `entities/index.ts`-ből is. A könyvek a szervertől jöjjenek (`GET /books`), ne JSON-ból. Kezeld a betöltést és a hibát. A `BookList` komponens az API-ból érkező könyvlistával frissüljön.
    <details>
    <summary>megoldása</summary>

    `client/src/entities/book.ts`
    ```ts
    // a) Írd meg a Book típust az API dokumentáció alapján!
    export interface Book {
      // ezeket írtam be alapján
      id: number,
      title: string,
      author: string,
      year: number,
      available: boolean,
      currentBorrower: string | null
    }
    ```

    `client/src/services/libraryApi.ts`
    ```ts
    ...
    export const libraryApi = createApi({
      reducerPath: 'libraryApi',
      baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3032' }),
      tagTypes: ['Books', 'Borrows'] as ApiTag[],
      endpoints: (builder) => ({
        // GET = builder.query | POST, PATCH: builder.mutation
        // ezt adtam hozzá:
        getBooks: builder.query<ListResponse<Book>, void>({
          // GET http://localhost:3032/books
          query: () => "/books",
          providesTags: ["Books"]
        }),
        // ...
      })
    });
    ```

    `client/src/App.tsx`
    ```tsx
    ...
    import { useGetBooksQuery } from './services/libraryApi'; // ezt adtam hozzá

    function App() {
      //---------------------------------------------
      // ezeket írtam felül:
      const { data: booksData, isLoading, isError } = useGetBooksQuery();
      const books = booksData?.data ?? [];
      //---------------------------------------------

      if (isLoading) return <div className="loading">Betöltés...</div>;
      if (isError) return <div className="error">Hiba a betöltés során.</div>;

      return (
        ...
        {/* a) Töltsd be a könyveket a szerverről (GET /books)! */}
        <BookList books={books} />
        ...
      );
    }
    ```

    ---
    </details>
- b. (2 pont) API-ból betöltve a könyvek szabad/foglalt állapota és az aktuális kölcsönző neve helyesen jelenjen meg.
    <details>
    <summary>megoldása</summary>

    `client/src/components/BookList.tsx`
    ```tsx
    ...
    <div
      key={book.id}
      className={`book-item ${book.available ? 'book-item--available' : 'book-item--occupied'}`}
    >
      <p className="book-item__title">{book.title}</p>
      <p className="book-item__author">{book.author} ({book.year})</p>
      {/* b) Állapot megjelenítése: "Szabad" vagy "Kölcsönözve: <name>" */}
      <span className={`book-item__status ${book.available ? 'book-item__status--available' : 'book-item__status--occupied'}`}>
        {/* b) ezeket adtam hozzá: */}
        {book.available ? "Szabad" : `Kölcsönzi: ${book.currentBorrower}`}
      </span>
    </div>
    ...
    ```
    ---
    </details>
- c. (2 pont) A **Kölcsönzés rögzítése** gomb küldje el a kölcsönzést a szerverre (`POST /books/:id/borrows`, mezők: `/docs`). Az űrlap és a validáció a keretben megvan.
    <details>
    <summary>megoldása</summary>

    `client/src/services/libraryApi.ts`
    ```ts
    // ...
        // POST /books/:id/borrows
        // ezt adtam hozzá:
        borrowBook: builder.mutation<Borrow, {bookId: number; form: BorrowForm}>({
          query: ({ bookId, form}) => ({
            url: `/books/${bookId}/borrows`,
            method: "POST",
            body: form
          }),
          invalidatesTags: ["Books", "Borrows"]
        }),
    // ...
    ```

    `client/src/components/BorrowPanel.tsx`
    ```tsx
    import { useState } from 'react';
    import type { Book } from '../entities';
    import { useBorrowBookMutation } from '../services/libraryApi'; // hozzá lett adva

    //...
    export default function BorrowPanel({ books }: Props) {
      //...
      const [borrowBook] = useBorrowBookMutation(); // hozzá lett adva

      async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedBookId || !borrowerName) return;
        // c) Küldj POST /books/:id/borrows kérést a borrowBook mutációval!
        // ezeket adtam hozzá:
        await borrowBook({
          bookId: selectedBookId,
          form: {
            borrowerName,
            borrowedAt: new Date(borrowedAt).toISOString()
          }
        })
        setSelectedBookId("");
        setBorrowerName("");
      }
      // ...
    ```
    ---
    </details>
- d. (2 pont) A kölcsönzési napló a szervertől töltődjön (`GET /borrows`). A megjelenítés a keretben kész.
    <details>
    <summary>megoldása</summary>

    `client/src/services/libraryApi.ts`
    ```ts
    // ...
        // GET /borrows
        // ezt adtam hozzá:
        getBorrows: builder.query<ListResponse<Borrow>, void>({
          query: () => '/borrows',
          providesTags: ["Borrows"]
        }),
    // ...
    ```

    `client/src/App.tsx`
    ```tsx
    import { useGetBooksQuery, useGetBorrowsQuery } from './services/libraryApi'; // ezt adtam hozzá az előzőek mellé
    
    // ...
    function App() {
      //---------------------------------------------
      // ezeket írtam felül:
      const { data: booksData, isLoading, isError } = useGetBooksQuery();
      const { data: borrowsData } = useGetBorrowsQuery(); // ezt adtam hozzá

      const books = booksData?.data ?? [];
      const borrows = borrowsData?.data ?? []; // ezt adtam hozzá
      //---------------------------------------------

      return (
        // ...
          {/* d) Töltsd be a kölcsönzéseket (GET /borrows)! */}
          <ActivityLog borrows={borrows} />
        // ...
      );
    }
    ```
    ---
    </details>
- e. (2 pont) A naplóban a **Visszahozás** gomb zárja le a kölcsönzést (`PATCH /borrows/:id`, `returnedAt` — lásd `/docs`). Csak aktív kölcsönzésnél legyen elérhető.
    <details>
    <summary>megoldása</summary>

    `client/src/services/libraryApi.ts`
    ```ts
    // ...
        // ezt adtam hozzá:
        returnBook: builder.mutation<Borrow, { borrowId: number, returnedAt: string}>({
          query: ({ borrowId, returnedAt}) => ({
            url: `/borrows/${borrowId}`,
            method: "PATCH",
            body: { returnedAt }
          }),
          invalidatesTags: ["Books", "Borrows"]
        })
    // ...
    ```

    `client/src/components/ActivityLog.tsx`
    ```tsx
    import type { Borrow } from '../entities';
    import { useReturnBookMutation } from '../services/libraryApi'; // ezt adtam hozzá

    interface Props { borrows: Borrow[]; }

    export default function ActivityLog({ borrows }: Props) {
      {/*------------------------------*/}
      {/* ezek hozzá lettek adva */}
      const [returnBook] = useReturnBookMutation();

      async function handleReturn(borrowId: number) {
        await returnBook({ borrowId, returnedAt: new Date().toISOString() })
      }
      {/*------------------------------*/}

      return (
        // ...
          {borrows.map((borrow) => (
            <li key={borrow.id} className="activity-item">
              // ...
              {borrow.returnedAt ? "Visszahozva" : "Aktív"} {/* ez hozzá lett adva */}
              {/* d) Státusz badge: "Aktív" vagy "Visszahozva" */}
              {/* e) Visszahozás gomb: csak ha returnedAt === null */}

              {/* ez hozzá lett adva */}
              {borrow.returnedAt === null && <button onClick={() => handleReturn(borrow.id)}>Visszahozva</button>}
            </li>
          ))}
        // ...
    ```
    ---
    </details>
- f. (2 pont) Kölcsönzés és visszahozás után a könyvlista és a napló automatikusan frissüljön (RTK Query tag invalidation), F5 nélkül.
    <details>
    <summary>megoldása</summary>

    `client/src/services/libraryApi.ts`
    ```ts
    // A tagTypes, providesTags és invalidatesTags beállításokat fentebb már beleraktam, íme az összefoglalás:
    export const libraryApi = createApi({
      reducerPath: 'libraryApi',
      baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3032' }),
      // tagTypes definiálása:
      tagTypes: ['Books', 'Borrows'] as ApiTag[],
      endpoints: (builder) => ({
        getBooks: builder.query<ListResponse<Book>, void>({
          query: () => "/books",
          providesTags: ["Books"] // <-- Címkézés listázásnál
        }),
        borrowBook: builder.mutation<Borrow, {bookId: number; form: BorrowForm}>({
          // ...
          invalidatesTags: ["Books", "Borrows"] // <-- Invalidate mutáció után
        }),
        getBorrows: builder.query<ListResponse<Borrow>, void>({
          query: () => '/borrows',
          providesTags: ["Borrows"] // <-- Címkézés listázásnál
        }),
        returnBook: builder.mutation<Borrow, { borrowId: number, returnedAt: string}>({
          // ...
          invalidatesTags: ["Books", "Borrows"] // <-- Invalidate mutáció után
        })
      }),
    });
    ```
    ---
    </details>

---