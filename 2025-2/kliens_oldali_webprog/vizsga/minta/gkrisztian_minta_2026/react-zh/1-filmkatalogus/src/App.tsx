import { useState } from "react";
import { type Review } from "./data/filmsData";
import { FilmList } from "./components/FilmList";
import { FilmDetails } from "./components/FilmDetails";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";
import "./App.css";
import filmsData from './data/filmsData';

function App() {
  // b) Tárold el a kiválasztott film azonosítóját (selectedFilmId, típusa: number | null)! (kezdőértéke: null)
  const [selectedFilmId, setSelectedFilmId] = useState<number | null>(null);

  // c) Keresd meg a kiválasztott filmet a filmsData-ból!
  const selectedFilm = filmsData.find((film) => film.id === selectedFilmId) ?? null;

  // d) Tárold el az értékeléseket (reviews, típusa: Review[])! (kezdőértéke: üres tömb)
  const [reviews, setReviews] = useState<Review[]>([]);

  // d) Írd meg az addReview függvényt, amely hozzáfűzi az új értékelést!
  const addReview = (review:Review) => {
    setReviews(prev => [...prev, review]);
  }

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
          <ReviewForm film={selectedFilm} onAdd={addReview} />
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
}

export default App;
