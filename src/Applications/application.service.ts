import { pool } from "../db";
import { CreateApplication } from "./application.types";
import { incrementFilledAndCloseIfNeeded } from "../Positions/position.service";
import { PoolClient } from "pg";

export const createApplicationService = async (
  data: CreateApplication
): Promise<any> => {

  const client: PoolClient = await pool.connect();

  try {

// START TRANSACTION
    await client.query("BEGIN");

    const {
      candidate_id,
      position_id,
      status,
      source,
    } = data;

    // CHECK POSITION

    const positionRes = await client.query(
      `
      SELECT *
      FROM positions
      WHERE id = $1
      `,
      [position_id]
    );

    const position = positionRes.rows[0];

    if (!position) {
      throw new Error("Position not found");
    }

    if (position.status === "closed") {
      throw new Error("Position is closed");
    }

    if (position.filled >= position.capacity) {
      throw new Error("Position already filled");
    }

  // CREATE APPLICATION

    const applicationRes = await client.query(
      `
      INSERT INTO applications
      (
        candidate_id,
        position_id,
        status,
        source
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        candidate_id,
        position_id,
        status,
        source,
      ]
    );

  // UPDATE POSITION


    await incrementFilledAndCloseIfNeeded(
      Number(position_id),
      client
    );

  // COMMIT TRANSACTION

    await client.query("COMMIT");

    return applicationRes.rows[0];

  } catch (err) {

  // ROLLBACK ON FAILURE


    await client.query("ROLLBACK");

    throw err;

  } finally {


  // RELEASE CONNECTION
  

    client.release();
  }
};

export const getApplicationsService = async (
  status?: string
): Promise<any[]> => {

  let query = `
    SELECT *
    FROM applications
  `;

  const values: any[] = [];

  if (status) {
    query += ` WHERE status = $1`;
    values.push(status);
  }

  const result = await pool.query(query, values);

  return result.rows;
};