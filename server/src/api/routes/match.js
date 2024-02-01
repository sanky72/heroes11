import { Router } from "express";
import {
  addMatches,
  getLeaderboard,
  getContestsPrizesDetails,
  getPrizesDetailsForContest,
} from "../controllers/match/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.post("/add", auth, addMatches);
router.get("/contestsPrizes", auth, getContestsPrizesDetails);
router.get("/contest/prizes/:contestId", auth, getPrizesDetailsForContest);

router.get("/leaderboard", auth, getLeaderboard);

export default router;
