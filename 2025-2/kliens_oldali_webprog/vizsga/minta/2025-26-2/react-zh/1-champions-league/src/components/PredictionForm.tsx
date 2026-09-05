import { useState } from "react";
import type { Match, Prediction } from "../data/matchesData";

interface Props {
  match: Match | null;
  onAdd: (prediction: Prediction) => void;
}

export function PredictionForm({ match, onAdd }: Props) {
  // d) Hozz létre helyi állapotváltozókat a hazai és vendég góloknak! (kezdőérték: 0)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // d) Ha nincs kiválasztott mérkőzés, ne csinálj semmit!
    // d) Hívd meg az onAdd-ot a tipp adataival!
    // d) Állítsd vissza az inputokat 0-ra!
  }

  return (
    <div className="panel">
      <h2 className="section-title">Tippem</h2>
      <form onSubmit={handleSubmit} className="prediction-form">
        <span className="prediction-form__label">
          {match ? match.home.name : "Hazai"}
        </span>
        <input
          type="number"
          min={0}
          value={0}
          onChange={() => {}}
          className="score-input"
          disabled={match === null}
        />
        <span className="prediction-form__colon">:</span>
        <input
          type="number"
          min={0}
          value={0}
          onChange={() => {}}
          className="score-input"
          disabled={match === null}
        />
        <span className="prediction-form__label prediction-form__label--right">
          {match ? match.away.name : "Vendég"}
        </span>
        <button type="submit" className="btn" disabled={match === null}>
          Hozzáadás
        </button>
      </form>
    </div>
  );
}
