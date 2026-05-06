import pool from '../config/db.js';

export const getCandidateProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const candidateQuery = \`
      SELECT c.*, v.readiness_score, v.target_role
      FROM candidates c
      LEFT JOIN candidate_readiness_view v ON c.candidate_id = v.candidate_id
      WHERE c.candidate_id = $1;
    \`;
    const candidateResult = await pool.query(candidateQuery, [id]);

    if (candidateResult.rows.length === 0) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    const candidate = candidateResult.rows[0];

    // Get skills
    const skillsQuery = \`
      SELECT s.name, s.category, cs.proficiency_level
      FROM candidate_skills cs
      JOIN skills s ON cs.skill_id = s.skill_id
      WHERE cs.candidate_id = $1;
    \`;
    const skillsResult = await pool.query(skillsQuery, [id]);

    // Get certifications
    const certsQuery = \`
      SELECT c.name, c.issuer, cc.issue_date, cc.expiry_date
      FROM candidate_certifications cc
      JOIN certifications c ON cc.certification_id = c.certification_id
      WHERE cc.candidate_id = $1;
    \`;
    const certsResult = await pool.query(certsQuery, [id]);

    // Get training records
    const trainingQuery = \`
      SELECT course_name, provider, completion_date, status
      FROM training_records
      WHERE candidate_id = $1;
    \`;
    const trainingResult = await pool.query(trainingQuery, [id]);

    // Get assessments
    const assessmentsQuery = \`
      SELECT name, score, date, type
      FROM assessments
      WHERE candidate_id = $1;
    \`;
    const assessmentsResult = await pool.query(assessmentsQuery, [id]);

    // Get stage history
    const historyQuery = \`
      SELECT from_stage, to_stage, movement_date, notes
      FROM candidate_stage_history
      WHERE candidate_id = $1
      ORDER BY movement_date DESC;
    \`;
    const historyResult = await pool.query(historyQuery, [id]);

    res.json({
      ...candidate,
      skills: skillsResult.rows,
      certifications: certsResult.rows,
      training_records: trainingResult.rows,
      assessments: assessmentsResult.rows,
      stage_history: historyResult.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
