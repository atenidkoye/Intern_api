import { pool } from "../db";


// OVERALL SUMMARY
export const getSummaryService = async () => {

  const candidatesRes = await pool.query(
    `
    SELECT COUNT(*) AS total_candidates
    FROM candidates
    `
  );

  const applicationsRes = await pool.query(
    `
    SELECT COUNT(*) AS total_applications
    FROM applications
    `
  );

  const openPositionsRes = await pool.query(
    `
    SELECT COUNT(*) AS open_positions
    FROM positions
    WHERE status = 'open'
    `
  );

  const closedPositionsRes = await pool.query(
    `
    SELECT COUNT(*) AS closed_positions
    FROM positions
    WHERE status = 'closed'
    `
  );

  return {
    total_candidates:
      Number(
        candidatesRes.rows[0].total_candidates
      ),

    total_applications:
      Number(
        applicationsRes.rows[0].total_applications
      ),

    open_positions:
      Number(
        openPositionsRes.rows[0].open_positions
      ),

    closed_positions:
      Number(
        closedPositionsRes.rows[0].closed_positions
      ),
  };
};

// APPLICATION STATUS SUMMARY

export const getApplicationStatusSummaryService =
  async () => {

    const result = await pool.query(
      `
      SELECT
        status,
        COUNT(*) AS count
      FROM applications
      GROUP BY status
      `
    );

    return result.rows;
  };