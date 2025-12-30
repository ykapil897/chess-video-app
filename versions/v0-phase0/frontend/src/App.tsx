import { useEffect, useState } from "react";
import { createGame, getGame } from "./api";
import { ChessBoard } from "./ChessBoard";

const GAME_ID = "demo-game";

export default function App() {
  const [fen, setFen] = useState("");

  async function refresh() {
    const game = await getGame(GAME_ID);
    setFen(game.fen);
  }

  useEffect(() => {
    createGame(GAME_ID).then(refresh);
  }, []);

  return (
    <div>
      <h1>Chess (Phase 2)</h1>
      {fen && (
        <ChessBoard
          fen={fen}
          gameId={GAME_ID}
          onMoveSuccess={refresh}
        />
      )}
    </div>
  );
}
