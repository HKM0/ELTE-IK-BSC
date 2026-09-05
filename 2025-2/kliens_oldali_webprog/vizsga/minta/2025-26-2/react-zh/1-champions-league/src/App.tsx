import { useState } from "react";
import { type Prediction } from "./data/matchesData";
import { MatchList } from "./components/MatchList";
import { MatchDetails } from "./components/MatchDetails";
import { PredictionForm } from "./components/PredictionForm";
import { PredictionList } from "./components/PredictionList";
import "./App.css";

function App() {
  // b) Tárold el a kiválasztott mérkőzés  azonosítóját (selectedMatchId, típusa: number vagy null) (kezdőértéke: null)

  // c) Keresd meg a kiválasztott mérkőzést a matchesData-ból!
  const selectedMatch = null;

  // d) Tárold el a tippeket (predictions)! (kezdőértéke: üres tömb)

  // d) Írd meg az addPrediction függvényt, amely hozzáfűzi az új tippet!

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Champions League 2025/26  Tippverseny</h1>
      </header>
      <div className="app-body">
        <MatchList
          selectedMatchId={null}
          onSelect={() => {}}
        />
        <div className="app-right-panel">
          {/* c) Add át a selectedMatch-et a MatchDetails-nek! */}
          <MatchDetails match={null} />
          {/* d) Add át a szükséges propokat! */}
          <PredictionForm match={null} onAdd={() => {}} />
          <PredictionList predictions={[]} />
        </div>
      </div>
    </div>
  );
}

export default App;
