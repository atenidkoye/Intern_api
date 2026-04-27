import { Router } from "express";
import {
  createCandidate,
  getCandidates,
} from "../controllers/candidate.controller";
import { validateCandidate } from "../middleware/validateCandidate";

const router = Router();

router.post("/", validateCandidate, createCandidate);
router.get("/", getCandidates);

export default router;