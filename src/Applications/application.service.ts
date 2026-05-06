import { pool } from "../db";
import { PoolClient } from "pg";

import { CreateApplication } from "./application.types";

import {
  incrementFilledAndCloseIfNeeded,
} from "../Positions/position.service";

//Create Application

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
    // Create Position 

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

    // ROLLBACK

    await client.query("ROLLBACK");

    throw err;

  } finally {

    // RELEASE CONNECTION

    client.release();
  }
};

// GET ALL APPLICATIONS

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

  query += ` ORDER BY id ASC`;

  const result = await pool.query(
    query,
    values
  );

  return result.rows;
};

// GET APPLICATION BY ID

export const getApplicationByIdService = async (
  id: number
): Promise<any> => {

  const result = await pool.query(
    `
    SELECT *
    FROM applications
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

// UPDATE APPLICATION

export const updateApplicationService = async (
  id: number,
  data: CreateApplication
): Promise<any> => {

  const {
    candidate_id,
    position_id,
    status,
    source,
  } = data;

  const result = await pool.query(
    `
    UPDATE applications
    SET
      candidate_id = $1,
      position_id = $2,
      status = $3,
      source = $4
    WHERE id = $5
    RETURNING *
    `,
    [
      candidate_id,
      position_id,
      status,
      source,
      id,
    ]
  );

  return result.rows[0];
};

// DELETE APPLICATION

export const deleteApplicationService = async (
  id: number
): Promise<void> => {

  const client: PoolClient = await pool.connect();

  try {

    // START TRANSACTION

    await client.query("BEGIN");

    // GET APPLICATION

    const applicationRes = await client.query(
      `
      SELECT *
      FROM applications
      WHERE id = $1
      `,
      [id]
    );

    const application = applicationRes.rows[0];

    if (!application) {
      throw new Error("Application not found");
    }

    const position_id = application.position_id;

    // DELETE APPLICATION

    await client.query(
      `
      DELETE FROM applications
      WHERE id = $1
      `,
      [id]
    );

    // UPDATE POSITION

    await client.query(
      `
      UPDATE positions
      SET
        filled = filled - 1,
        status = CASE
          WHEN filled - 1 < capacity
          THEN 'open'
          ELSE 'closed'
        END
      WHERE id = $1
      `,
      [position_id]
    );

    // COMMIT

    await client.query("COMMIT");

  } catch (err) {

    // ROLLBACK

    await client.query("ROLLBACK");

    throw err;

  } finally {

    // RELEASE CONNECTION

    client.release();
  }
};