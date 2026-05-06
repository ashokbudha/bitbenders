import pool from '../config/db.js';

export const getPipelineOverview = async (req, res) => {
  try {
    const query = `
      SELECT rs.name as stage, COUNT(c.id) as count 
      FROM recruitment_stages rs
      LEFT JOIN candidates c ON rs.id = c.current_stage_id
      GROUP BY rs.id, rs.name, rs.sort_order
      ORDER BY rs.sort_order;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('getPipelineOverview error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTopCandidates = async (req, res) => {
  try {
    const query = `
      SELECT candidate_id, full_name, readiness_score, target_role
      FROM candidate_readiness_view
      ORDER BY readiness_score DESC NULLS LAST
      LIMIT 10;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('getTopCandidates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPriorityCandidates = async (req, res) => {
  try {
    const query = `
      SELECT candidate_id, full_name, readiness_score, target_role
      FROM candidate_readiness_view
      WHERE readiness_score >= 80
      ORDER BY readiness_score DESC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('getPriorityCandidates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFunnelMovements = async (req, res) => {
  try {
    const query = `
      SELECT rs.name as to_stage, COUNT(csh.id) as movement_count
      FROM candidate_stage_history csh
      JOIN recruitment_stages rs ON csh.stage_id = rs.id
      WHERE csh.changed_at >= NOW() - INTERVAL '30 days'
      GROUP BY rs.name, rs.sort_order
      ORDER BY rs.sort_order;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('getFunnelMovements error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getReadinessByRole = async (req, res) => {
  try {
    const query = `
      SELECT target_role, ROUND(AVG(readiness_score)::numeric, 2) as avg_readiness, COUNT(candidate_id) as candidate_count
      FROM candidate_readiness_view
      GROUP BY target_role
      ORDER BY avg_readiness DESC NULLS LAST;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('getReadinessByRole error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const query = `
      SELECT v.full_name, rs.name as action, csh.changed_at as date
      FROM candidate_stage_history csh
      JOIN candidate_readiness_view v ON csh.candidate_id = v.candidate_id
      JOIN recruitment_stages rs ON csh.stage_id = rs.id
      ORDER BY csh.changed_at DESC
      LIMIT 10;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('getRecentActivity error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};