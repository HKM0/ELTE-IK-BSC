import matchesData from "../data/matchesData";
import type { Prediction } from "../data/matchesData";

interface Props {
  predictions: Prediction[];
}

export function PredictionList({ predictions }: Props) {
  return (
    <div className="panel">
      <h2 className="section-title">Tippjeim</h2>
      {predictions.length === 0 ? (
        <p className="muted">Még nem adtál meg tippet.</p>
      ) : (
        <ul className="prediction-list">
          {predictions.map((prediction, index) => {
            // d) Keresd meg a mérkőzést a matchesData-ból a prediction.matchId alapján!
            // d) Ha nem találod, ne renderelj semmit (return null)!
            return (
              <li key={index} className="prediction-item">
                <span>{/* d) hazai – vendég csapat neve */}</span>
                <strong className="prediction-item__score">
                  {/* d) homeScore : awayScore */}
                </strong>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
