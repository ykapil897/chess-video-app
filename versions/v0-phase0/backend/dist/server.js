import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { gameRouter } from "./routes/gameRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (_req, res) => {
    res.json({ status: "ok", phase: "2" });
});
app.use("/game", gameRouter);
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" }
});
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
});
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Chess backend running on port ${PORT} (Phase 2)`);
});
