import { Chess } from "chess.js";

export type PlayerColor = "w" | "b";

type Game = {
  chess: Chess;
  players: Partial<Record<PlayerColor, string>>; // socketId
};

class GameManager {
  private games = new Map<string, Game>();

  getOrCreate(gameId: string) {
    if (!this.games.has(gameId)) {
      this.games.set(gameId, {
        chess: new Chess(),
        players: {}
      });
    }
    return this.games.get(gameId)!;
  }

  assignPlayer(gameId: string, socketId: string): PlayerColor | null {
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

  makeMove(
    gameId: string,
    socketId: string,
    move: { from: string; to: string; promotion?: string }
  ) {
    const game = this.getOrCreate(gameId);
    const turn = game.chess.turn();

    if (game.players[turn] !== socketId) {
      throw new Error("Not your turn");
    }

    const result = game.chess.move(move);
    if (!result) throw new Error("Illegal move");

    return {
      fen: game.chess.fen(),
      turn: game.chess.turn(),
      isCheckmate: game.chess.isCheckmate(),
      isDraw: game.chess.isDraw(),
      players: game.players
    };
  }

  getState(gameId: string) {
    const game = this.getOrCreate(gameId);
    return {
      fen: game.chess.fen(),
      turn: game.chess.turn(),
      players: game.players
    };
  }

  removePlayer(gameId: string, socketId: string) {
    const game = this.games.get(gameId);
    if (!game) return;

    if (game.players.w === socketId) delete game.players.w;
    if (game.players.b === socketId) delete game.players.b;
  }
}

export const gameManager = new GameManager();
