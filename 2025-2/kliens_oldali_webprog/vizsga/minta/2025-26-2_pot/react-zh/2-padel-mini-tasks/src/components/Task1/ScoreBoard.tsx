interface ScoreBoardProps {
  scoreA: number;
  scoreB: number;
  canAddGame: boolean;
  onScoreA: () => void;
  onScoreB: () => void;
  onAddGame: () => void;
}

const ScoreBoard = ({
  scoreA,
  scoreB,
  canAddGame,
  onScoreA,
  onScoreB,
  onAddGame,
}: ScoreBoardProps) => {
  return (
    <div className="scoreboard">
      <div className="score-team">
        <span className="score-label">Csapat A</span>
        <span className="score-value">{scoreA}</span>
        <button type="button" className="padel-btn padel-btn--small" onClick={onScoreA}>
          A pont
        </button>
      </div>

      <span className="score-divider">–</span>

      <div className="score-team">
        <span className="score-label">Csapat B</span>
        <span className="score-value">{scoreB}</span>
        <button type="button" className="padel-btn padel-btn--small" onClick={onScoreB}>
          B pont
        </button>
      </div>

      <button
        type="button"
        className="padel-btn padel-btn--accent add-game-btn"
        disabled={!canAddGame}
        onClick={onAddGame}
      >
        Game hozzáadása
      </button>
    </div>
  );
};

export default ScoreBoard;
