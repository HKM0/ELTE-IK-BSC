import { useState } from "react";
import type { Film, Review } from "../data/filmsData";

interface Props {
  film: Film | null;
  onAdd: (review: Review) => void;
}

export function ReviewForm({ film, onAdd }: Props) {
  // d) Hozz létre helyi állapotváltozókat: score (szám, kezdőértéke 5) és comment (string, kezdőértéke "")!
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (film === null) return;
    // d) Hívd meg az onAdd propot a tipp adataival, majd állítsd vissza az állapotokat!
    onAdd({
      score, // score: score
      comment, // comment: comment
      filmId: film.id
    });

    setScore(5);
    setComment("");
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
          value={score}
          onChange={(e) => setScore(parseInt(e.target.value))}
          className="score-input"
          disabled={film === null}
        />
        <span className="review-form__separator">/10</span>
        <input
          type="text"
          placeholder="Megjegyzés..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
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
