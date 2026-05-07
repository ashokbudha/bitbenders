import pool from '../config/db.js';

const parseNumber = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const getTalent = async (req, res) => {
  const { search, role, minReadiness, stage } = req.query;

  try {
    const filters = [];
    const params = [];

    if (search?.trim()) {
      params.push(`%${search.trim()}%`);
      filters.push(`(full_name ILIKE $${params.length} OR target_role ILIKE $${params.length})`);
    }

    if (role?.trim()) {
      params.push(role.trim());
      filters.push(`target_role = $${params.length}`);
    }

    const readinessThreshold = parseNumber(minReadiness);
    if (readinessThreshold !== null) {
      params.push(readinessThreshold);
      filters.push(`readiness_score >= $${params.length}`);
    }

    if (stage?.trim()) {
      params.push(stage.trim());
      filters.push(`current_stage = $${params.length}`);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

    const query = `
      SELECT
        candidate_id,
        full_name,
        target_role,
        readiness_score,
        current_stage
      FROM candidate_readiness_view
      ${whereClause}
      ORDER BY readiness_score DESC NULLS LAST, full_name ASC
      LIMIT 100;
    `;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('getTalent error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getShortlistedTalent = async (req, res) => {
  const { search, role, minReadiness } = req.query;

  try {
    const filters = [`current_stage = 'Shortlisted'`];
    const params = [];

    if (search?.trim()) {
      params.push(`%${search.trim()}%`);
      filters.push(`(full_name ILIKE $${params.length} OR target_role ILIKE $${params.length})`);
    }

    if (role?.trim()) {
      params.push(role.trim());
      filters.push(`target_role = $${params.length}`);
    }

    const readinessThreshold = parseNumber(minReadiness);
    if (readinessThreshold !== null) {
      params.push(readinessThreshold);
      filters.push(`readiness_score >= $${params.length}`);
    }

    const query = `
      SELECT
        candidate_id,
        full_name,
        target_role,
        readiness_score,
        current_stage
      FROM candidate_readiness_view
      WHERE ${filters.join(' AND ')}
      ORDER BY readiness_score DESC NULLS LAST, full_name ASC;
    `;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('getShortlistedTalent error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOpportunities = async (req, res) => {
  try {
    const query = `
      SELECT
        COALESCE(target_role, 'Unassigned') AS role,
        COUNT(candidate_id)::int AS candidate_count,
        ROUND(AVG(readiness_score)::numeric, 2) AS avg_readiness
      FROM candidate_readiness_view
      GROUP BY target_role
      ORDER BY candidate_count DESC, avg_readiness DESC NULLS LAST;
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('getOpportunities error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
