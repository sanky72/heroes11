import { Router } from "express";
import { addMatches } from "../controllers/match/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.post("/add", auth, addMatches);

export default router;
