import filmsData from "../data/filmsData";
import type { Review } from "../data/filmsData";

interface Props {
  reviews: Review[];
}

export function ReviewList({ reviews }: Props) {
  return (
    <div className="panel">
      <h2 className="section-title">Értékeléseim</h2>
      {reviews.length === 0 ? (
        <p className="muted">Még nem adtál értékelést.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review, index) => {
            // d) Keresd meg a filmet a filmsData-ból a review.filmId alapján!
            const film = filmsData.find(film => film.id === review.filmId) ?? null;
            if (!film) return null;
            return (
              <li key={index} className="review-item">
                <span>{film.title}</span>
                <strong className="review-item__score">
                  {review.score}/10 – {review.comment}
                </strong>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
