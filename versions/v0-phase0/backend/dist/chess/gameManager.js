import { Chess } from "chess.js";
class GameManager {
    constructor() {
        this.games = new Map();
    }
    getOrCreate(gameId) {
        if (!this.games.has(gameId)) {
            this.games.set(gameId, {
                chess: new Chess(),
                players: {}
            });
        }
        return this.games.get(gameId);
    }
    assignPlayer(gameId, socketId) {
        const game = this.getOrCreate(gameId);
        if (!game.players.w) {
            game.players.w = socketId;
            return "w";
        }
        if (!game.players.b) {
            game.players.b = socketId;
            return "b";
        }
        return null; // spectator
    }
    makeMove(gameId, socketId, move) {
        const game = this.getOrCreate(gameId);
        const turn = game.chess.turn();
        if (game.players[turn] !== socketId) {
            throw new Error("Not your turn");
        }
        const result = game.chess.move(move);
        if (!result)
            throw new Error("Illegal move");
        return {
            fen: game.chess.fen(),
            turn: game.chess.turn(),
            isCheckmate: game.chess.isCheckmate(),
            isDraw: game.chess.isDraw(),
            players: game.players
        };
    }
    getState(gameId) {
        const game = this.getOrCreate(gameId);
        return {
            fen: game.chess.fen(),
            turn: game.chess.turn(),
            players: game.players
        };
    }
    removePlayer(gameId, socketId) {
        const game = this.games.get(gameId);
        if (!game)
            return;
        if (game.players.w === socketId)
            delete game.players.w;
        if (game.players.b === socketId)
            delete game.players.b;
        const noPlayers = !game.players.w && !game.players.b;
        if (noPlayers) {
            // 🔥 RESET GAME STATE
            this.games.delete(gameId);
        }
    }
    bothPlayersJoined(gameId) {
        const game = this.games.get(gameId);
        if (!game)
            return false;
        return !!(game.players.w && game.players.b);
    }
}
export const gameManager = new GameManager();
