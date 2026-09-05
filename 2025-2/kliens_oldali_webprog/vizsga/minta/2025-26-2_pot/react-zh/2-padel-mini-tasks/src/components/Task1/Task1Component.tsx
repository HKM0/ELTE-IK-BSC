import KioskLayout from "../KioskLayout";
import GamesList from "./GamesList";
import ScoreBoard from "./ScoreBoard";
import type { FinishedGame, PadelPoint } from "../../types";

const PADEL_POINTS: PadelPoint[] = [0, 15, 30, 40];

const Task1Component = () => {
  let pointA = 0;
  let pointB = 0;
  let games: FinishedGame[] = [];

  const handleAddGame = () => {
    // TODO: Itt oldd meg, hogy csak akkor fusson le, ha az egyik fél elérte a 40 pontot, és a game listába kerüljön fel az aktuális eredmény, és a pontszámok nullázódjonak.
    games.push({
      id: Date.now(),
      scoreA: PADEL_POINTS[pointA],
      scoreB: PADEL_POINTS[pointB],
    });
    pointA = 0;
    pointB = 0;
  };

  return (
    <KioskLayout
      title="Task 1 – Padel pontszám"
      screen={`Lejátszott gamek: ${games.length}`}
    >
      <GamesList games={games} />

      <div className="padel-court">
        <ScoreBoard
          scoreA={PADEL_POINTS[pointA]}
          scoreB={PADEL_POINTS[pointB]}
          onScoreA={() => {
            pointA = Math.min(pointA + 1, 3);
          }}
          onScoreB={() => {
            pointB = Math.min(pointB + 1, 3);
          }}
          onAddGame={handleAddGame}
          canAddGame={pointA === 3 || pointB === 3}
        />
      </div>
    </KioskLayout>
  );
};

export default Task1Component;
