import type { FinishedGame } from "../../types";

interface GamesListProps {
  games: FinishedGame[];
}

const GamesList = ({ games }: GamesListProps) => {
  return (
    <ul className="padel-games-list">
      {games.toReversed().map((game, index) => (
        <li key={game.id} className="padel-games-item">
          Game {games.length - index}: {game.scoreA} – {game.scoreB}
        </li>
      ))}
    </ul>
  );
};

export default GamesList;
