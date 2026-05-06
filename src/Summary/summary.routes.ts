import { Router } from "express";

import {
  getSummary,
  getApplicationStatusSummary,
} from "./summary.controller";

const router = Router();

// OVERALL SUMMARY

router.get(
  "/",
  getSummary
);

// APPLICATION STATUS SUMMARY

router.get(
  "/applications",
  getApplicationStatusSummary
);

export default router;