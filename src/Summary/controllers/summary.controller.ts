import { Request, Response } from "express";
import { getSummaryService } from "../services/summary.service";

export const getSummary = async (_: Request, res: Response) => {
  try {
    const result = await getSummaryService();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};