import { pool } from "../db";
import { PoolClient } from "pg";

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

export const getPositionsService = async (): Promise<Position[]> => {

  const result = await pool.query(
    "SELECT * FROM positions"
  );

  return result.rows;
};

export const incrementFilledAndCloseIfNeeded = async (
  position_id: number,
  client: PoolClient
): Promise<void> => {

  // GET POSITION

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

  // CALCULATE VALUES

  const filled = position.filled + 1;

  const status =
    filled >= position.capacity
      ? "closed"
      : "open";

  // UPDATE POSITION

  await client.query(
    `
    UPDATE positions
    SET filled = $1,
        status = $2
    WHERE id = $3
    `,
    [filled, status, position_id]
  );
};