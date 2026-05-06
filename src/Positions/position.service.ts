import { pool } from "../db";
import { PoolClient } from "pg";

// TYPES

type Position = {
  id: number;
  title: string;
  capacity: number;
  filled: number;
  status: "open" | "closed";
};

// Create POSITION

export const createPositionService = async (
  data: {
    title: string;
    capacity: number;
  }
): Promise<Position> => {

  const { title, capacity } = data;

  const result = await pool.query(
    `
    INSERT INTO positions
    (title, capacity)
    VALUES ($1, $2)
    RETURNING *
    `,
    [title, capacity]
  );

  return result.rows[0];
};

// GET ALL POSITIONS

export const getPositionsService = async (): Promise<Position[]> => {

  const result = await pool.query(
    `
    SELECT *
    FROM positions
    ORDER BY id ASC
    `
  );

  return result.rows;
};

// GET POSITION BY ID

export const getPositionByIdService = async (
  id: number
): Promise<Position> => {

  const result = await pool.query(
    `
    SELECT *
    FROM positions
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

// UPDATE POSITION

export const updatePositionService = async (
  id: number,
  data: {
    title: string;
    capacity: number;
    status: "open" | "closed";
  }
): Promise<Position> => {

  const {
    title,
    capacity,
    status,
  } = data;

  const result = await pool.query(
    `
    UPDATE positions
    SET
      title = $1,
      capacity = $2,
      status = $3
    WHERE id = $4
    RETURNING *
    `,
    [
      title,
      capacity,
      status,
      id,
    ]
  );

  return result.rows[0];
};

// DELETE POSITION

export const deletePositionService = async (
  id: number
): Promise<void> => {

  await pool.query(
    `
    DELETE FROM positions
    WHERE id = $1
    `,
    [id]
  );
};

// INCREMENT POSITION

export const incrementFilledAndCloseIfNeeded = async (
  position_id: number,
  client: PoolClient
): Promise<void> => {

  const result = await client.query(
    `
    SELECT *
    FROM positions
    WHERE id = $1
    `,
    [position_id]
  );

  const position = result.rows[0];

  if (!position) {
    throw new Error("Position not found");
  }

  const filled = position.filled + 1;

  const status =
    filled >= position.capacity
      ? "closed"
      : "open";

  await client.query(
    `
    UPDATE positions
    SET
      filled = $1,
      status = $2
    WHERE id = $3
    `,
    [
      filled,
      status,
      position_id,
    ]
  );
};