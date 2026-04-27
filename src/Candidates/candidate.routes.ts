import { Router } from "express";
import {
  createCandidate,
  getCandidates,
} from "./candidate.controller";
import { validateCandidate } from "./validateCandidate";

const router = Router();

router.post("/", validateCandidate, createCandidate);
router.get("/", getCandidates);

export default router;