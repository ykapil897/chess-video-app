import { useEffect, useState } from "react";
import { socket } from "./socket";
import { ChessBoard } from "./ChessBoard";

const GAME_ID = "room-1";

export default function App() {
  const [fen, setFen] = useState("");
  const [role, setRole] = useState<"w" | "b" | null>(null);
  const [turn, setTurn] = useState<"w" | "b">("w");

  useEffect(() => {
    socket.emit("join-game", { gameId: GAME_ID });

    socket.on("player-role", (r) => setRole(r));
    socket.on("game-state", (state) => {
      setFen(state.fen);
      setTurn(state.turn);
    });

    socket.on("move-error", (msg) => alert(msg));

    return () => {
      socket.off("player-role");
      socket.off("game-state");
      socket.off("move-error");
    };
  }, []);

  return (
    <div>
      <h2>Phase 4 — Multiplayer Chess</h2>
      <p>Your role: {role ?? "Spectator"}</p>
      <p>Turn: {turn === "w" ? "White" : "Black"}</p>

      {fen && (
        <ChessBoard
          fen={fen}
          gameId={GAME_ID}
          canMove={role === turn}
        />
      )}
    </div>
  );
}
