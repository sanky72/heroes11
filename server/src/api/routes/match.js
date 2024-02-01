import { Router } from "express";
import { addMatches, getLeaderboard } from "../controllers/match/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.post("/add", auth, addMatches);
router.get("/leaderboard", auth, getLeaderboard);

export default router;
