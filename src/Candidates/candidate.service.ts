import { pool } from "../db";
import { CreateCandidate } from "./candidate.types";

// =========================
// CREATE CANDIDATE
// =========================

export const createCandidateService = async (
  data: CreateCandidate
) => {

  const {
    full_name,
    email,
    phone,
    years_of_experience,
    primary_skill,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO candidates
    (
      full_name,
      email,
      phone,
      years_of_experience,
      primary_skill
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      full_name,
      email,
      phone,
      years_of_experience,
      primary_skill,
    ]
  );

  return result.rows[0];
};

// GET ALL CANDIDATES

export const getCandidatesService = async () => {

  const result = await pool.query(
    `
    SELECT *
    FROM candidates
    ORDER BY id ASC
    `
  );

  return result.rows;
};

// GET CANDIDATE BY ID

export const getCandidateByIdService = async (
  id: number
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM candidates
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

// UPDATE CANDIDATE

export const updateCandidateService = async (
  id: number,
  data: CreateCandidate
) => {

  const {
    full_name,
    email,
    phone,
    years_of_experience,
    primary_skill,
  } = data;

  const result = await pool.query(
    `
    UPDATE candidates
    SET
      full_name = $1,
      email = $2,
      phone = $3,
      years_of_experience = $4,
      primary_skill = $5
    WHERE id = $6
    RETURNING *
    `,
    [
      full_name,
      email,
      phone,
      years_of_experience,
      primary_skill,
      id,
    ]
  );

  return result.rows[0];
};

// DELETE CANDIDATE

export const deleteCandidateService = async (
  id: number
) => {

  await pool.query(
    `
    DELETE FROM candidates
    WHERE id = $1
    `,
    [id]
  );
};