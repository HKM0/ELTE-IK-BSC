import filmsData from "../data/filmsData";

interface Props {
    selectedFilmId: number | null;
    onSelect: (id: number) => void;
}

export function FilmList({ selectedFilmId, onSelect }: Props) {
    return (
        <div className="film-list">
            <h2 className="section-title">Filmek</h2>

            {filmsData.map((film) => {
              return (
                <button
                    className={`film-card ${selectedFilmId == film.id && "film-card--selected"}`}
                    onClick={() => onSelect(film.id)}
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
                    <span className="film-card__year">{film.year}</span>
                </button>
              )})}
        </div>
    );
}
