import { Router } from "express";

import {
  createPosition,
  getPositions,
  getPositionById,
  updatePosition,
  deletePosition,
} from "./position.controller";

import { validatePosition } from "./validatePosition";

const router = Router();

// Create POSITION

router.post(
  "/",
  validatePosition,
  createPosition
);

// GET ALL POSITIONS

router.get(
  "/",
  getPositions
);

// GET POSITION BY ID

router.get(
  "/:id",
  getPositionById
);

// Update POSITION

router.put(
  "/:id",
  validatePosition,
  updatePosition
);

// Delete POSITION

router.delete(
  "/:id",
  deletePosition
);

export default router;