import pool from '../config/db.js';

export const getPipeline = async (req, res) => {
  try {
    const query = `
      SELECT stage, COUNT(*) as count 
      FROM recruitment_stages 
      GROUP BY stage 
      ORDER BY 
        CASE stage 
          WHEN 'Applied' THEN 1 
          WHEN 'Screening' THEN 2 
          WHEN 'Interview' THEN 3 
          WHEN 'Offer' THEN 4 
          ELSE 5 
        END;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTopCandidates = async (req, res) => {
  try {
    const query = \`
      SELECT c.candidate_id, c.first_name, c.last_name, v.readiness_score, v.target_role
      FROM candidates c
      JOIN candidate_readiness_view v ON c.candidate_id = v.candidate_id
      ORDER BY v.readiness_score DESC
      LIMIT 10;
    \`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPriorityCandidates = async (req, res) => {
  try {
    // Determine priority by high readiness && missing specific skills or in offer stage
    const query = \`
      SELECT c.candidate_id, c.first_name, c.last_name, v.readiness_score, rs.stage
      FROM candidates c
      JOIN candidate_readiness_view v ON c.candidate_id = v.candidate_id
      JOIN recruitment_stages rs ON c.candidate_id = rs.candidate_id
      WHERE v.readiness_score >= 80 AND rs.stage IN ('Interview', 'Offer')
      ORDER BY v.readiness_score DESC;
    \`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFunnelMovements = async (req, res) => {
  try {
    const query = \`
      SELECT from_stage, to_stage, COUNT(*) as movement_count
      FROM candidate_stage_history
      WHERE movement_date >= NOW() - INTERVAL '30 days'
      GROUP BY from_stage, to_stage
      ORDER BY movement_count DESC;
    \`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReadinessByRole = async (req, res) => {
  try {
    const query = \`
      SELECT target_role, AVG(readiness_score) as avg_readiness, COUNT(candidate_id) as candidate_count
      FROM candidate_readiness_view
      GROUP BY target_role
      ORDER BY avg_readiness DESC;
    \`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const query = \`
      SELECT c.first_name, c.last_name, h.to_stage as action, h.movement_date as date
      FROM candidate_stage_history h
      JOIN candidates c ON h.candidate_id = c.candidate_id
      ORDER BY h.movement_date DESC
      LIMIT 10;
    \`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
