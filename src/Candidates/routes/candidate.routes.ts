import { Router } from "express";
import { createCandidate, getCandidates } from "../Candidates/candidate.controller";

const router = Router();

router.post("/", createCandidate);
router.get("/", getCandidates);

export default router;