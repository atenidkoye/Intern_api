import { Request, Response } from "express";
import { pool } from "../db";

export const getSummary = async (_: Request, res: Response) => {
  const totalCandidates = await pool.query("SELECT COUNT(*) FROM candidates");
  const totalApplications = await pool.query("SELECT COUNT(*) FROM applications");

  const byStatus = await pool.query(
    "SELECT status, COUNT(*) FROM applications GROUP BY status"
  );

  res.json({
    candidates: totalCandidates.rows[0].count,
    applications: totalApplications.rows[0].count,
    statusBreakdown: byStatus.rows
  });
};