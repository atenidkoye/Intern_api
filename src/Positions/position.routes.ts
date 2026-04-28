import { Router } from "express";
import {
  createPosition,
  getPositions,
} from "./position.controller";
import { validatePosition } from "../middleware/validatePosition";

const router = Router();

router.post("/", validatePosition, createPosition);
router.get("/", getPositions);

export default router;