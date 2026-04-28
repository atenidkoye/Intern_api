import { pool } from "../db";
import { CreateApplication } from "./application.types";
import { incrementFilledAndCloseIfNeeded } from "../Positions/position.service";

export const createApplicationService = async (data: CreateApplication) => {
  const { candidate_id, position_id, status, source } = data;

  const result = await pool.query(
    `INSERT INTO applications (candidate_id, position_id, status, source)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [candidate_id, position_id, status, source]
  );

  await incrementFilledAndCloseIfNeeded(position_id);


  return result.rows[0];
};

export const getApplicationsService = async (status?: string) => {
  let query = "SELECT * FROM applications";
  const values: any[] = [];

  if (status) {
    query += " WHERE status = $1";
    values.push(status);
  }

  const result = await pool.query(query, values);
  return result.rows;
};