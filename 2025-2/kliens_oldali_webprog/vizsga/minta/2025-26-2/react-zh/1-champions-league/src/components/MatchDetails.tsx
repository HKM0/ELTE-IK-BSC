import type { Match } from "../data/matchesData";

interface Props {
  match: Match | null;
}

export function MatchDetails({ match }: Props) {
  // c) Ha match null, jelenítsd meg az útmutatót (pl. „Válassz ki egy mérkőzést a listából!")

  return (
    <div className="panel">
      <div className="match-details__teams">
        <div className="match-details__team">
          <img src="" width={48} height={48} alt="" className="team-logo" /> {/* c) hazai csapat logója */}
          <strong>{/* c) hazai csapat neve */}</strong>
          <span className="muted">{/* c) hazai csapat országa */}</span>
        </div>
        <span className="match-details__vs">vs</span>
        <div className="match-details__team">
          <img src="" width={48} height={48} alt="" className="team-logo" /> {/* c) vendég csapat logója */}
          <strong>{/* c) vendég csapat neve */}</strong>
          <span className="muted">{/* c) vendég csapat országa */}</span>
        </div>
      </div>

      <table className="match-details__table">
        <tbody>
          <tr>
            <th>Szakasz</th>
            <td>{/* c) */}</td>
          </tr>
          <tr>
            <th>Dátum</th>
            <td>{/* c) */}</td>
          </tr>
          <tr>
            <th>Helyszín</th>
            <td>{/* c) */}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
