import { Request, Response } from "express";
import {
  createPositionService,
  getPositionsService,
} from "./position.service";

export const createPosition = async (req: Request, res: Response) => {
  try {
    const result = await createPositionService(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getPositions = async (_: Request, res: Response) => {
  try {
    const result = await getPositionsService();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};