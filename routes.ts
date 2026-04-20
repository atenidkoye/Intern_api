import { Router } from "express";
import {
    createCandidate,
    getCandidates,
    createApplication,
    getApplications,
    addNote,
    getNotes,
    getSummary
} from "./controllers";

const router = Router();

// Candidates
router.post("/candidates", createCandidate);
router.get("/candidates", getCandidates);

// Applications
router.post("/applications", createApplication);
router.get("/applications", getApplications);

//Notes
router.post("/applications/:id/notes", addNote);
router.get("/applications/:id/notes", getNotes);

//Summary

router.get("/summary", getSummary);

export default router;