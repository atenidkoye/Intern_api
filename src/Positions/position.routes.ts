import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import {
  createPosition,
  getPositions,
} from "./position.controller";
import { validatePosition } from "./validatePosition";

const router = Router();

router.post("/", authenticate, validatePosition, createPosition);
router.get("/", getPositions);

export default router;