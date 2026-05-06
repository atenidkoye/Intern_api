import { Request, Response } from "express";

import {
  createPositionService,
  getPositionsService,
  getPositionByIdService,
  updatePositionService,
  deletePositionService,
} from "./position.service";

// Create POSITION

export const createPosition = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const result =
      await createPositionService(req.body);

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

// GET ALL POSITIONS
export const getPositions = async (
  _: Request,
  res: Response
): Promise<void> => {

  try {

    const result =
      await getPositionsService();

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

// GET POSITION BY ID
export const getPositionById = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    const position =
      await getPositionByIdService(id);

    if (!position) {

      res.status(404).json({
        success: false,
        error: "Position not found",
      });

      return;
    }

    res.json({
      success: true,
      data: position,
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// UPDATE POSITION
export const updatePosition = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    const updated =
      await updatePositionService(
        id,
        req.body
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

// DELETE POSITION
export const deletePosition = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    await deletePositionService(id);

    res.json({
      success: true,
      message: "Position deleted",
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};