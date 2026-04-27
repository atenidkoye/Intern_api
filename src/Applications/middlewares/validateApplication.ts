import { Request, Response, NextFunction } from "express";

const validStatuses = [
  "applied",
  "screening",
  "interview",
  "rejected",
  "accepted",
];

export const validateApplication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { candidate_id, position, status } = req.body;

  if (!candidate_id || !position || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  next();
};