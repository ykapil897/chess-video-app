import { useState } from "react";
import { socket } from "./socket";

const files = ["a","b","c","d","e","f","g","h"];

function piece(p: string) {
  const m: Record<string,string> = {
    p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",
    P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"
  };
  return m[p] || "";
}

function expand(row: string) {
  const out: string[] = [];
  for (const c of row) {
    if (!isNaN(Number(c))) out.push(...Array(Number(c)).fill(""));
    else out.push(c);
  }
  return out;
}

export function ChessBoard({
  fen,
  gameId,
  canMove,
  flip
}: {
  fen: string;
  gameId: string;
  canMove: boolean;
  flip: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const rows = fen.split(" ")[0].split("/");
  const boardRows = flip ? [...rows].reverse() : rows;

  function click(square: string) {
    if (!canMove) return;

    if (!selected) setSelected(square);
    else {
      socket.emit("make-move", {
        gameId,
        move: { from: selected, to: square }
      });
      setSelected(null);
    }
  }

  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(8,60px)" }}>
      {rows.flatMap((row, r) =>
        expand(row).map((c, i) => {
          const sq = files[i] + (8 - r);
          return (
            <div
              key={sq}
              onClick={() => click(sq)}
              style={{
                width:60,height:60,fontSize:36,
                display:"flex",alignItems:"center",justifyContent:"center",
                background:(r+i)%2?"#666":"#eee",
                opacity: canMove ? 1 : 0.6,
                border:selected===sq?"2px solid red":"none"
              }}
            >
              {piece(c)}
            </div>
          );
        })
      )}
    </div>
  );
}
