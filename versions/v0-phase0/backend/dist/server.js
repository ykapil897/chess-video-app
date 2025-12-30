import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { gameRouter } from "./routes/gameRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" }
});
app.use("/game", gameRouter);
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Chess backend running on port ${PORT} (Phase 1)`);
});
