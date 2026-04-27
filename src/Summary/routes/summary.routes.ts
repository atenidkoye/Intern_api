import { Router } from "express";
import { getSummary } from "../Summary/summary.controller";

const router = Router();

router.get("/", getSummary);

export default router;