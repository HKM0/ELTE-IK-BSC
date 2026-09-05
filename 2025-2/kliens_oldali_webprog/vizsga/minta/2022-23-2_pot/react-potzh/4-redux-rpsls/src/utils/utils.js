export const FIG = {
    ROCK: 'Rock',
    PAPER: 'Paper',
    SCISSORS: 'Scissors',
    LIZARD: 'Lizard',
    SPOCK: 'Spock'
};

export const RESULT = {
    PLAYER: 'Player',
    AI: 'AI',
    DRAW: '-'
};

export function getGameResult (playerOne, playerTwo) {
    if (playerOne === playerTwo) return RESULT.DRAW;
    if ((playerOne === FIG.SCISSORS && (playerTwo === FIG.PAPER || playerTwo === FIG.LIZARD))
        || (playerOne === FIG.PAPER && (playerTwo === FIG.ROCK || playerTwo === FIG.SPOCK))
        || (playerOne === FIG.ROCK && (playerTwo === FIG.LIZARD || playerTwo === FIG.SCISSORS))
        || (playerOne === FIG.LIZARD && (playerTwo === FIG.SPOCK || playerTwo === FIG.PAPER))
        || (playerOne === FIG.SPOCK && (playerTwo === FIG.SCISSORS || playerTwo === FIG.ROCK))
        ) return RESULT.PLAYER
    return RESULT.AI;
}
