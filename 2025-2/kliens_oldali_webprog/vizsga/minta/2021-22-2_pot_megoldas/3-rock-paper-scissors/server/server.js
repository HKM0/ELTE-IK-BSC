import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const port = 3030;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// ======================== GAME ==========================

const games = {};

const getPlayerGameId = (playerId) => {
  for (const game of Object.values(games)) {
    console.log("getPlayerGameId", game);
    if (game.players.includes(playerId)) {
      return game.id;
    }
  }
  return null;
};

const findHalfGameId = () => {
  for (const game of Object.values(games)) {
    console.log("findHalfGameId", game);
    if (game.players.length < 2) {
      return game.id;
    }
  }
  return null;
};

const addNewGame = (playerId) => {
  const gameId = uuidv4();
  games[gameId] = {
    id: gameId,
    started: false,
    players: [playerId],
    tips: [],
  };
  return gameId;
};

const addEmptyTipPair = (gameId) => {
  let tipPair = {};
  for (const player of games[gameId].players) {
    tipPair[player] = null;
  }
  games[gameId].tips.push(tipPair);
};

const addPlayerToGame = (gameId, playerId) => {
  games[gameId].players.push(playerId);
};

const startGame = (gameId) => {
  games[gameId].started = true;
  addEmptyTipPair(gameId);
  games[gameId].players.forEach((player) => {
    io.to(player).emit("game-started");
  });
};

const deleteGame = (gameId) => {
  games[gameId].players.forEach((player) => {
    io.to(player).emit("game-over");
  });
  delete games[gameId];
};

/*
    kő       1
    papír    2
    olló     3

    (1-2) % 3
*/

const getWinner = (tip1, tip2) => {
  // Döntetlen
  if (tip1 === tip2) return 0;

  // 1. játékos nyert
  if (tip1 === "rock" && tip2 === "scissors") return 1;
  if (tip1 === "scissors" && tip2 === "paper") return 1;
  if (tip1 === "paper" && tip2 === "rock") return 1;

  // 2. játékos nyert
  return 2;
};

// ==================== SOCKET ========================

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  socket.on("join-game", () => {
    try {
      console.log(games);
      const playerId = socket.id;
      let gameId = getPlayerGameId(playerId);
      if (gameId) {
        throw new Error("You are already in a game.");
      } else {
        socket.emit("join-game-response", true);
        // Van-e olyan játék, ahol 1 kliens van?
        gameId = findHalfGameId();
        if (gameId) {
          addPlayerToGame(gameId, playerId);
          startGame(gameId);
        } else {
          gameId = addNewGame(playerId);
        }
      }
    } catch (e) {
      socket.emit("error", e.message);
    }
  });

  socket.on("tip", (tip) => {
    try {
      const playerId = socket.id;
      const gameId = getPlayerGameId(playerId);

      // Lehetséges hibák
      if (!gameId) throw new Error("You are not in a game.");

      if (!games[gameId].started)
        throw new Error("Your game has not started yet.");

      const validTips = ["paper", "rock", "scissors"];
      if (!validTips.includes(tip)) throw new Error("Invalid tip.");

      // Tippek kezelése
      const otherPlayerId = games[gameId].players.find((id) => id !== playerId);
      const latestTipPairIndex = games[gameId].tips.length - 1;

      // Ha már küldött tippet
      if (games[gameId].tips[latestTipPairIndex][playerId] !== null) {
        throw new Error("You have already sent a tip.");
      }
      games[gameId].tips[latestTipPairIndex][playerId] = tip;

      const otherTip = games[gameId].tips[latestTipPairIndex][otherPlayerId];
      if (otherTip) {
        const results = ["Tie", "You lost", "You won"];
        let playerWins = 0;
        let otherPlayerWins = 0;
        games[gameId].tips.forEach((tipPair) => {
          const winner = getWinner(tipPair[playerId], tipPair[otherPlayerId]);
          if (winner === 1) playerWins++;
          if (winner === 2) otherPlayerWins++;
        });

        io.to(playerId).emit("tip-response", {
          lastRound: {
            you: tip,
            other: otherTip,
            result: results[getWinner(otherTip, tip)],
          },
          overAll: {
            you: playerWins,
            other: otherPlayerWins,
          },
        });

        io.to(otherPlayerId).emit("tip-response", {
          lastRound: {
            you: otherTip,
            other: tip,
            result: results[getWinner(tip, otherTip)],
          },
          overAll: {
            you: otherPlayerWins,
            other: playerWins,
          },
        });

        addEmptyTipPair(gameId);
      }
    } catch (e) {
      socket.emit("error", e.message);
    }
  });

  socket.on("leave-game", () => {
    try {
      const playerId = socket.id;
      const gameId = getPlayerGameId(playerId);

      // Lehetséges hibák
      if (!gameId) throw new Error("You are not in a game.");

      deleteGame(gameId);
    } catch (e) {
      socket.emit("error", e.message);
    }
  });
});

// =========================== START SERVER =============================

httpServer.listen(port, () => {
  console.log("Socket.io server has started on port", port);
});
