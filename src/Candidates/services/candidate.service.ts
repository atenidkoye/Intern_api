import { pool } from "../../db";
import { CreateCandidateDTO } from "../types/candidate.types";

export const createCandidateService = async (data: CreateCandidateDTO) => {
  const {
    full_name,
    email,
    phone,
    years_of_experience,
    primary_skill,
  } = data;

  const result = await pool.query(
    `INSERT INTO candidates (full_name, email, phone, years_of_experience, primary_skill)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [full_name, email, phone, years_of_experience, primary_skill]
  );

  return result.rows[0];
};

export const getCandidatesService = async () => {
  const result = await pool.query("SELECT * FROM candidates");
  return result.rows;
};