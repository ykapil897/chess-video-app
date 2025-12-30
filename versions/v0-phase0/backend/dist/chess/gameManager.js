import { Chess } from "chess.js";
class GameManager {
    constructor() {
        this.games = new Map();
    }
    getOrCreate(gameId) {
        if (!this.games.has(gameId)) {
            this.games.set(gameId, { chess: new Chess() });
        }
        return this.games.get(gameId);
    }
    makeMove(gameId, move) {
        const game = this.getOrCreate(gameId);
        const result = game.chess.move(move);
        if (!result)
            throw new Error("Illegal move");
        return {
            fen: game.chess.fen(),
            turn: game.chess.turn(),
            isCheck: game.chess.inCheck(),
            isCheckmate: game.chess.isCheckmate(),
            isDraw: game.chess.isDraw(),
            history: game.chess.history()
        };
    }
    getState(gameId) {
        const game = this.getOrCreate(gameId);
        return { fen: game.chess.fen(), turn: game.chess.turn() };
    }
}
export const gameManager = new GameManager();
