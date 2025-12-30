import { useEffect, useState } from "react";
import { socket } from "./socket";
import { ChessBoard } from "./ChessBoard";

const GAME_ID = "room-1";

export default function App() {
  const [fen, setFen] = useState("");

  useEffect(() => {
    socket.emit("join-game", { gameId: GAME_ID });

    socket.on("game-state", (state) => setFen(state.fen));
    socket.on("move-error", (msg) => alert(msg));

    return () => {
      socket.off("game-state");
      socket.off("move-error");
    };
  }, []);

  return (
    <div>
      <h2>Multiplayer Chess (Phase 3)</h2>
      {fen && <ChessBoard fen={fen} gameId={GAME_ID} />}
    </div>
  );
}
