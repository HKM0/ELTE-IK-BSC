import type { Film } from "../data/filmsData";

interface Props {
  film: Film | null;
}

export function FilmDetails({ film }: Props) {
  if (film === null) {
    return (
      <div className="panel film-details--empty">
        <p>Válassz ki egy filmet a listából!</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="film-details__header">
        <img
          src={film.poster}
          width={60}
          height={90}
          alt={film.title}
          className="team-logo"
        />
        <div className="film-details__info">
          <h2>{film.title}</h2>
          <span className="muted">{film.director}</span>
        </div>
      </div>
      <table className="film-details__table">
        <tbody>
          <tr>
            <th>Év</th>
            <td>{film.year}</td>
          </tr>
          <tr>
            <th>Műfaj</th>
            <td>{film.genre}</td>
          </tr>
          <tr>
            <th>Ország</th>
            <td>{film.country}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
