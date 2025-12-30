import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { gameManager } from "./chess/gameManager.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", phase: "3" });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("join-game", ({ gameId }) => {
    socket.join(gameId);
    socket.emit("game-state", gameManager.getState(gameId));
  });

  socket.on("make-move", ({ gameId, move }) => {
    try {
      const state = gameManager.makeMove(gameId, move);
      io.to(gameId).emit("game-state", state);
    } catch (e) {
      socket.emit("move-error", (e as Error).message);
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Phase 3 backend running on port ${PORT}`);
});
