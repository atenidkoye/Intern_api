import { Request, Response } from "express";

import {
  createApplicationService,
  getApplicationsService,
  getApplicationByIdService,
  updateApplicationService,
  deleteApplicationService,
} from "./application.service";

import { CreateApplication } from "./application.types";

// =========================
// CREATE APPLICATION
// =========================

export const createApplication = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const data: CreateApplication = req.body;

    const result = await createApplicationService(
      data
    );

    res.status(201).json({
      success: true,
      data: result,
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// =========================
// GET ALL APPLICATIONS
// =========================

export const getApplications = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { status } = req.query;

    const result =
      await getApplicationsService(
        status as string
      );

    res.json({
      success: true,
      data: result,
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// =========================
// GET APPLICATION BY ID
// =========================

export const getApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    const application =
      await getApplicationByIdService(id);

    if (!application) {

      res.status(404).json({
        success: false,
        error: "Application not found",
      });

      return;
    }

    res.json({
      success: true,
      data: application,
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// =========================
// UPDATE APPLICATION
// =========================

export const updateApplication = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    const data: CreateApplication = req.body;

    const updated =
      await updateApplicationService(
        id,
        data
      );

    res.json({
      success: true,
      data: updated,
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// =========================
// DELETE APPLICATION
// =========================

export const deleteApplication = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    await deleteApplicationService(id);

    res.json({
      success: true,
      message: "Application deleted",
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};