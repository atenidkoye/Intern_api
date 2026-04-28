import { Router } from "express";
import {
  createApplication,
  getApplications,
} from "./application.controller";
import { validateApplication } from "./validateApplication";

const router = Router();

router.post("/", validateApplication, createApplication);
router.get("/", getApplications);

export default router;