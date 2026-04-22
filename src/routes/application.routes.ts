import { Router } from "express";
import {
  createApplication,
  getApplications,
  addNote,
  getNotes
} from "../controllers/application.controller";

const router = Router();

router.post("/", createApplication);
router.get("/", getApplications);
router.post("/:id/notes", addNote);
router.get("/:id/notes", getNotes);

export default router;