import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { ChessBoard } from "./ChessBoard";
import { WebRTC } from "./webrtc";

const GAME_ID = "room-1";

export default function App() {
  const [fen, setFen] = useState("");
  const [role, setRole] = useState<"w" | "b" | null>(null);
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [history, setHistory] = useState<string[]>([]);
  // const [whiteTime, setWhiteTime] = useState(300);
  // const [blackTime, setBlackTime] = useState(300);
  const [gameStatus, setGameStatus] = useState<string>("Playing");
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);
  const rtcRef = useRef<WebRTC | null>(null);
  const isPlayer = role === "w" || role === "b";
  const [playersReady, setPlayersReady] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);





  useEffect(() => {
    socket.emit("join-game", { gameId: GAME_ID });

    socket.on("player-role", (r) => {
      console.log("ROLE RECEIVED:", r); // 👈 DEBUG
      setRole(r);
    });

    socket.on("game-state", (s) => {
      setFen(s.fen);
      setTurn(s.turn);
      if (s.history) setHistory(s.history);

      if (s.isCheckmate) {
        setGameStatus(
          turn === "w"
            ? "Checkmate! Black wins"
            : "Checkmate! White wins"
        );
      } else if (s.isDraw) {
        setGameStatus("Draw");
      } else {
        setGameStatus("Playing");
      }

    });

    socket.on("move-error", alert);
    socket.on("players-ready", () => {
      setPlayersReady(true);
    });

    return () => {
      socket.off("player-role");
      socket.off("game-state");
      socket.off("move-error");
      socket.off("players-ready");
    };
  }, []);


  useEffect(() => {
    if (role === "b" && !rtcRef.current) {
      rtcRef.current = new WebRTC(
        GAME_ID,
        (remote) => {
          if (remoteRef.current) {
            remoteRef.current.srcObject = remote;
          }
        },
        (local) => {
          if (localRef.current) {
            localRef.current.srcObject = local;
          }
        }
      );
    }
  }, [role]);

  // useEffect(() => {
  // const timer = setInterval(() => {
  //     if (turn === "w") {
  //     setWhiteTime(t => Math.max(0, t - 1));
  //     } else {
  //     setBlackTime(t => Math.max(0, t - 1));
  //     }
  // }, 1000);

  // return () => clearInterval(timer);
  // }, [turn]);


  async function startCall() {
      if (role !== "w") return;

    const rtc = new WebRTC(GAME_ID, (remote) => {
        if (remoteRef.current) {
        remoteRef.current.srcObject = remote;
        }
    });

    rtcRef.current = rtc;

    const local = await rtc.start(true);
    if (localRef.current) {
        localRef.current.srcObject = local;
    }
  }

  function toggleMic() {
    if (!rtcRef.current) return;

    const next = !micOn;
    rtcRef.current.toggleAudio(next);
    setMicOn(next);
  }

  function toggleCamera() {
    if (!rtcRef.current) return;

    const next = !cameraOn;
    rtcRef.current.toggleVideo(next);
    setCameraOn(next);
  }


  return (
    <div>
        <h2>Phase 6 — Chess + Video</h2>

        {/* 🔹 GAME STATUS */}
        <p>
        You are: {role ?? "Spectator"} | Turn:{" "}
        {turn === "w" ? "White" : "Black"}
        </p>

        {/* PLAYER WINNING STATUS */}
        <p>
          <strong>Status:</strong> {gameStatus}
        </p>

        {/* 🔹 CLOCKS */}
        {/* <p>
        White: {whiteTime}s | Black: {blackTime}s
        </p> */}

        {isPlayer && ( // MEDIA CONTROLS
          <>
            {role === "w" && (
              <button onClick={startCall}>Start Video</button>
            )}

            <button onClick={toggleMic}>
              {micOn ? "Mute Mic" : "Unmute Mic"}
            </button>

            <button onClick={toggleCamera}>
              {cameraOn ? "Camera Off" : "Camera On"}
            </button>

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <video ref={localRef} autoPlay muted playsInline width={200} />
              <video ref={remoteRef} autoPlay playsInline width={200} />
            </div>
          </>
        )}


        {/* 🔹 VIDEOS */}
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <video ref={localRef} autoPlay muted playsInline width={200} />
        <video ref={remoteRef} autoPlay playsInline width={200} />
        </div>

        {/* 🔹 BOARD + MOVE LIST */}
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {fen && (
            <ChessBoard
            fen={fen}
            gameId={GAME_ID}
            canMove={role === turn}
            flip={role === "b"}
            />
        )}

        <div>
            <h3>Moves</h3>
            <ul>
            {history.map((m, i) => (
                <li key={i}>{m}</li>
            ))}
            </ul>
        </div>
        </div>
    </div>
    );
}
