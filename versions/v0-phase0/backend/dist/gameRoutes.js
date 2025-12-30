import { Router } from "express";
import { gameManager } from "../chess/gameManager.js";
export const gameRouter = Router();
gameRouter.post("/create/:gameId", (req, res) => {
    try {
        const fen = gameManager.createGame(req.params.gameId);
        res.json({ gameId: req.params.gameId, fen });
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
});
gameRouter.get("/:gameId", (req, res) => {
    try {
        const chess = gameManager.getGame(req.params.gameId);
        res.json({
            fen: chess.fen(),
            turn: chess.turn(),
            isCheck: chess.inCheck(),
            isCheckmate: chess.isCheckmate(),
            isDraw: chess.isDraw(),
            history: chess.history()
        });
    }
    catch (e) {
        res.status(404).json({ error: e.message });
    }
});
gameRouter.post("/move/:gameId", (req, res) => {
    try {
        const result = gameManager.makeMove(req.params.gameId, req.body);
        res.json(result);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
});
