import { Chess } from "chess.js";
class GameManager {
    constructor() {
        this.games = new Map();
    }
    createGame(gameId) {
        if (this.games.has(gameId)) {
            throw new Error("Game already exists");
        }
        const chess = new Chess();
        this.games.set(gameId, { id: gameId, chess });
        return chess.fen();
    }
    getGame(gameId) {
        const game = this.games.get(gameId);
        if (!game)
            throw new Error("Game not found");
        return game.chess;
    }
    makeMove(gameId, move) {
        const chess = this.getGame(gameId);
        const result = chess.move(move);
        if (!result)
            throw new Error("Illegal move");
        return {
            fen: chess.fen(),
            turn: chess.turn(),
            isCheck: chess.inCheck(),
            isCheckmate: chess.isCheckmate(),
            isDraw: chess.isDraw(),
            history: chess.history()
        };
    }
}
export const gameManager = new GameManager();
