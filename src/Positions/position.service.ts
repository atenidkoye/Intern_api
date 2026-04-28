import { pool } from "../db";

type Position = {
  id: number;
  title: string;
  capacity: number;
  filled: number;
  status: "open" | "closed";
};

export const createPositionService = async (
  data: { title: string; capacity: number }
): Promise<Position> => {
  const { title, capacity } = data;

  if (!title || typeof capacity !== "number") {
    throw new Error("Invalid input");
  }

  const result = await pool.query(
    `INSERT INTO positions (title, capacity)
     VALUES ($1, $2)
     RETURNING *`,
    [title, capacity]
  );

  return result.rows[0];
};

export const getPositionsService = async (): Promise<Position[]> => {
  const result = await pool.query("SELECT * FROM positions");
  return result.rows;
};

export const incrementFilledAndCloseIfNeeded = async (
  position_id: number
): Promise<void> => {
  // increase filled count
  await pool.query(
    `UPDATE positions
     SET filled = filled + 1
     WHERE id = $1`,
    [position_id]
  );

  // auto-close if full
  await pool.query(
    `UPDATE positions
     SET status = 'closed'
     WHERE id = $1 AND filled >= capacity`,
    [position_id]
  );
};