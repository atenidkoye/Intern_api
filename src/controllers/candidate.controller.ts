import { Request, Response } from "express";
import { pool } from "../db";

export const createCandidate = async (req: Request, res: Response) => {
  const { full_name, email, phone, years_of_experience, primary_skill } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO candidates (full_name, email, phone, years_of_experience, primary_skill)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [full_name, email, phone, years_of_experience, primary_skill]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "Email must be unique" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

export const getCandidates = async (_: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM candidates");
  res.json(result.rows);
};