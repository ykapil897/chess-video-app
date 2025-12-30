import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
app.use(cors());
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.get("/health", (_req, res) => {
    res.json({ status: "ok", phase: "0" });
});
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
