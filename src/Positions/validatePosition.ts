import { Request, Response, NextFunction } from "express";

export const validatePosition = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, capacity } = req.body;

  if (!title || typeof capacity !== "number") {
    return res.status(400).json({ error: "Invalid position data" });
  }

  next();
};