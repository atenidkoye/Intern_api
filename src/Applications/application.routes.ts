import { Router } from "express";

import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "./application.controller";

import { validateApplication } from "./validateApplication";

const router = Router();

// Create Application

router.post(
  "/",
  validateApplication,
  createApplication
);

// GET ALL APPLICATIONS

router.get(
  "/",
  getApplications
);

// GET APPLICATION BY ID

router.get(
  "/:id",
  getApplicationById
);

//Update Application
// 

router.put(
  "/:id",
  validateApplication,
  updateApplication
);

// 
// Delete Application

router.delete(
  "/:id",
  deleteApplication
);

export default router;