import { Router } from "express";
import {
  addMatches,
  getLeaderboard,
  getContestsPrizesDetails,
  getPrizesDetailsForContest,
  getCompletedMatchDetails,
  addCompletedMatch,
  getCompletedMatches,
} from "../controllers/match/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.post("/add", auth, addMatches);
router.post("/add/completedMatch", addCompletedMatch);
router.get("/completedMatches", getCompletedMatches);
router.get("/completed/matchDetails", getCompletedMatchDetails);
router.get("/contestsPrizes", auth, getContestsPrizesDetails);
router.get("/contest/prizes/:contestId", auth, getPrizesDetailsForContest);

router.get("/leaderboard", auth, getLeaderboard);

export default router;
