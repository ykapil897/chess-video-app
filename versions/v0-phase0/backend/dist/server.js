import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { gameManager } from "./chess/gameManager.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (_req, res) => {
    res.json({ status: "ok", phase: "4" });
});
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" }
});
io.on("connection", (socket) => {
    socket.on("join-game", ({ gameId }) => {
        socket.join(gameId);
        const role = gameManager.assignPlayer(gameId, socket.id);
        socket.emit("player-role", role);
        socket.emit("game-state", gameManager.getState(gameId));
    });
    socket.on("make-move", ({ gameId, move }) => {
        try {
            const state = gameManager.makeMove(gameId, socket.id, move);
            io.to(gameId).emit("game-state", state);
        }
        catch (e) {
            socket.emit("move-error", e.message);
        }
    });
    socket.on("disconnect", () => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                gameManager.removePlayer(room, socket.id);
            }
        }
    });
});
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Phase 4 backend running on port ${PORT}`);
});
