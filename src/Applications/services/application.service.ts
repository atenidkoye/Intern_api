import { pool } from "../../db";
import { CreateApplicationDTO } from "../types/application.types";

export const createApplicationService = async (data: CreateApplicationDTO) => {
  const { candidate_id, position, status, source } = data;

  const result = await pool.query(
    `INSERT INTO applications (candidate_id, position, status, source)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [candidate_id, position, status, source]
  );

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