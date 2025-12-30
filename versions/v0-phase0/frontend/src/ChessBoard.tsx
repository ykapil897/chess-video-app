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
  const res: string[] = [];
  for (const c of row) {
    if (!isNaN(Number(c))) res.push(...Array(Number(c)).fill(""));
    else res.push(c);
  }
  return res;
}

export function ChessBoard({ fen, gameId }: { fen: string; gameId: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const rows = fen.split(" ")[0].split("/");

  function click(square: string) {
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
