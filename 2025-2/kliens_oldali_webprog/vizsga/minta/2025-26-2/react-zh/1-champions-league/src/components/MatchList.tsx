import matchesData from "../data/matchesData";

interface Props {
  selectedMatchId: number | null;
  onSelect: (id: number) => void;
}

export function MatchList({ selectedMatchId, onSelect }: Props) {
  return (
    <div className="match-list">
      <h2 className="section-title">Mérkőzések</h2>
      {/* a) Jelenleg csak az első mérkőzés jelenik meg. Jelenítsd meg az összeset! */}
      <button
        className="match-card"
        // b) Kattintásra hívd meg az onSelect-et a mérkőzés azonosítójával!
        // b) A kiválasztott mérkőzés kártyája kapja meg a "match-card--selected" CSS osztályt!
      >
        <span className="match-card__stage">{matchesData[0].stage}</span>
        <span className="match-card__team">
          <img src={matchesData[0].home.logo} width={20} height={20} alt={matchesData[0].home.name} className="team-logo" />
          {matchesData[0].home.name}
        </span>
        <span className="match-card__vs">vs</span>
        <span className="match-card__team">
          <img src={matchesData[0].away.logo} width={20} height={20} alt={matchesData[0].away.name} className="team-logo" />
          {matchesData[0].away.name}
        </span>
        <span className="match-card__date">{matchesData[0].date}</span>
      </button>
    </div>
  );
}
