import { pool } from "../db";

export const getSummaryService = async () => {
  const result = await pool.query(`
    SELECT 
      status,
      COUNT(*) as count
    FROM applications
    GROUP BY status
  `);

  return result.rows;
};