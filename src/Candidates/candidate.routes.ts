import { Router } from "express";

import {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} from "./candidate.controller";

import { validateCandidate } from "./validateCandidate";

const router = Router();

// Create

router.post(
  "/",
  validateCandidate,
  createCandidate
);

// READ ALL

router.get(
  "/",
  getCandidates
);

// READ ONE

router.get(
  "/:id",
  getCandidateById
);

// Update

router.put(
  "/:id",
  validateCandidate,
  updateCandidate
);

// Delete

router.delete(
  "/:id",
  deleteCandidate
);

export default router;