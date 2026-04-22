import { Request, Response } from "express";
import { pool } from "../db";

const validStatuses = ["applied","screening","interview","rejected","accepted"];

export const createApplication = async (req: Request, res: Response) => {
  const { candidate_id, position, status, source } = req.body;

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const result = await pool.query(
    `INSERT INTO applications (candidate_id, position, status, source)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [candidate_id, position, status, source]
  );

  res.status(201).json(result.rows[0]);
};

export const getApplications = async (req: Request, res: Response) => {
  const { status } = req.query;

  let query = "SELECT * FROM applications";
  let values: any[] = [];

  if (status) {
    query += " WHERE status = $1";
    values.push(status);
  }

  const result = await pool.query(query, values);
  res.json(result.rows);
};

export const addNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { note, rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be 1-5" });
  }

  const result = await pool.query(
    `INSERT INTO interview_notes (application_id, note, rating)
     VALUES ($1,$2,$3) RETURNING *`,
    [id, note, rating]
  );

  res.status(201).json(result.rows[0]);
};

export const getNotes = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(
    "SELECT * FROM interview_notes WHERE application_id = $1",
    [id]
  );

  res.json(result.rows);
};