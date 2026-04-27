import { Request, Response, NextFunction } from "express";

export const validateCandidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { full_name, email } = req.body;

  if (!full_name || !email) {
    return res.status(400).json({ error: "Full name and email are required" });
  }

  next();
};