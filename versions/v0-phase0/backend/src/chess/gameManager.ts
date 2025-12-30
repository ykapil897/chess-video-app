import { Chess } from "chess.js";

export type GameState = {
  id: string;
  chess: Chess;
};

class GameManager {
  private games = new Map<string, GameState>();

  createGame(gameId: string) {
    if (this.games.has(gameId)) {
      throw new Error("Game already exists");
    }

    const chess = new Chess();
    this.games.set(gameId, { id: gameId, chess });
    return chess.fen();
  }

  getGame(gameId: string) {
    const game = this.games.get(gameId);
    if (!game) throw new Error("Game not found");
    return game.chess;
  }

  makeMove(
    gameId: string,
    move: { from: string; to: string; promotion?: string }
  ) {
    const chess = this.getGame(gameId);

    const result = chess.move(move);
    if (!result) throw new Error("Illegal move");

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
