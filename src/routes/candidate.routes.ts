import { Router } from "express";
import { createCandidate, getCandidates } from "../controllers/candidate.controller";

const router = Router();

router.post("/", createCandidate);
router.get("/", getCandidates);

export default router;