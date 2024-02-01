import { Router } from "express";
import {
  addContests,
  getContests,
  getContestsForMatch,
  joinContest,
  getContestMatch,
} from "../controllers/contest/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.get("/:userId", auth, getContests);
router.get("/:userId/:matchId", auth, getContestsForMatch);
router.get("/contest/prizes/:contestId", auth, getContestMatch);
router.post("/add", auth, addContests);
router.post("/join", auth, joinContest);

export default router;
