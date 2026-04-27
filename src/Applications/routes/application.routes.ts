import { Router } from "express";
import {
  createApplication,
  getApplications,
} from "../controllers/application.controller";
import { validateApplication } from "../middleware/validateApplication";

const router = Router();

router.post("/", validateApplication, createApplication);
router.get("/", getApplications);

export default router;