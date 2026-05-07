import pool from '../config/db.js';

// GET /api/jobs
export const getJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('GET JOBS ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/jobs (hr/admin only)
export const createJob = async (req, res) => {
  const { title, description, target_role } = req.body;
  if (!title || !target_role) {
    return res.status(400).json({ error: 'title and target_role required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO jobs (title, description, target_role, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, target_role, req.user.user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('CREATE JOB ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/open-positions
export const getOpenPositions = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        op.id,
        op.job_id,
        op.title,
        j.target_role,
        op.location,
        op.position_type,
        op.openings,
        op.status,
        (SELECT COUNT(*) FROM applications WHERE open_position_id = op.id) AS candidate_count
      FROM open_positions op
      LEFT JOIN jobs j ON j.id = op.job_id
      WHERE op.status = 'open'
      ORDER BY op.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('GET POSITIONS ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/open-positions (hr/admin only)
export const createOpenPosition = async (req, res) => {
  const { job_id, title, location, position_type, openings } = req.body;
  if (!job_id || !title) {
    return res.status(400).json({ error: 'job_id and title required' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO open_positions (job_id, title, location, position_type, openings, created_by)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [job_id, title, location, position_type, openings || 1, req.user.user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('CREATE POSITION ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PATCH /api/open-positions/:id/status (hr/admin only)
export const updatePositionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['open', 'closed', 'paused'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  try {
    const result = await pool.query(
      'UPDATE open_positions SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Position not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('UPDATE POSITION STATUS ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/applications (hr/admin only)
export const getApplications = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        a.id as application_id,
        a.candidate_id,
        c.full_name as candidate_name,
        op.title as open_position_title,
        j.target_role,
        crv.readiness_score,
        a.status,
        a.applied_at
      FROM applications a
      LEFT JOIN candidates c ON c.id = a.candidate_id
      LEFT JOIN open_positions op ON op.id = a.open_position_id
      LEFT JOIN jobs j ON j.id = op.job_id
      LEFT JOIN candidate_readiness_view crv ON crv.candidate_id = a.candidate_id
      ORDER BY a.applied_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('GET APPLICATIONS ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/applications/me (student only)
export const getMyApplications = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        a.id as application_id,
        op.title as open_position_title,
        j.target_role,
        a.status,
        a.applied_at
      FROM applications a
      LEFT JOIN open_positions op ON op.id = a.open_position_id
      LEFT JOIN jobs j ON j.id = op.job_id
      WHERE a.user_id = $1
      ORDER BY a.applied_at DESC
    `, [req.user.user_id]);
    res.json(result.rows);
  } catch (error) {
    console.error('GET MY APPLICATIONS ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/applications (student only)
export const createApplication = async (req, res) => {
  const { open_position_id } = req.body;
  if (!open_position_id) {
    return res.status(400).json({ error: 'open_position_id required' });
  }
  try {
    const userResult = await pool.query('SELECT id FROM users WHERE id = $1', [req.user.user_id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const candidateResult = await pool.query(
      'SELECT id FROM candidates WHERE user_id = $1',
      [req.user.user_id]
    );
    
    const candidate_id = candidateResult.rows.length > 0 ? candidateResult.rows[0].id : null;

    const result = await pool.query(
      `INSERT INTO applications (open_position_id, candidate_id, user_id, status)
       VALUES ($1, $2, $3, 'applied') RETURNING *`,
      [open_position_id, candidate_id, req.user.user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.message.includes('duplicate key')) {
      return res.status(409).json({ error: 'Already applied to this position' });
    }
    console.error('CREATE APPLICATION ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PATCH /api/applications/:id/status (hr/admin only)
export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['applied', 'shortlisted', 'interview', 'hired', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  try {
    const result = await pool.query(
      'UPDATE applications SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('UPDATE APPLICATION STATUS ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
