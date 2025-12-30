import { useState } from "react";
import { makeMove } from "./api";

type Props = {
  fen: string;
  gameId: string;
  onMoveSuccess: () => void;
};

const files = ["a","b","c","d","e","f","g","h"];

function pieceToChar(piece: string) {
  const map: Record<string, string> = {
    p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
    P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔"
  };
  return map[piece] || "";
}

function expandFenRow(row: string): string[] {
  const result: string[] = [];
  for (const ch of row) {
    if (!isNaN(Number(ch))) {
      result.push(...Array(Number(ch)).fill(""));
    } else {
      result.push(ch);
    }
  }
  return result;
}

export function ChessBoard({ fen, gameId, onMoveSuccess }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const rows = fen.split(" ")[0].split("/");

  async function handleClick(square: string) {
    if (!selected) {
      setSelected(square);
    } else {
      try {
        await makeMove(gameId, selected, square);
        onMoveSuccess();
      } catch (e) {
        alert((e as Error).message);
      }
      setSelected(null);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 60px)" }}>
      {rows.flatMap((row, r) =>
        expandFenRow(row).map((cell, c) => {
          const square = files[c] + (8 - r);
          return (
            <div
              key={square}
              onClick={() => handleClick(square)}
              style={{
                width: 60,
                height: 60,
                fontSize: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: (r + c) % 2 === 0 ? "#eee" : "#555",
                border: selected === square ? "2px solid red" : "none"
              }}
            >
              {pieceToChar(cell)}
            </div>
          );
        })
      )}
    </div>
  );
}
