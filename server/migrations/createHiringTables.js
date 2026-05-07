import pool from '../config/db.js';

export async function createHiringTables() {
  try {
    /* =========================
       1. Create JOBS table
    ========================== */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        target_role VARCHAR(100),
        created_by INT NOT NULL REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    /* =========================
       2. Create OPEN_POSITIONS table
    ========================== */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS open_positions (
        id SERIAL PRIMARY KEY,
        job_id INT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        position_type VARCHAR(50),
        openings INT DEFAULT 1,
        status VARCHAR(50) DEFAULT 'open',
        created_by INT NOT NULL REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    /* =========================
       3. Create APPLICATIONS table
    ========================== */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        open_position_id INT NOT NULL REFERENCES open_positions(id) ON DELETE CASCADE,
        candidate_id INT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
        user_id INT NOT NULL REFERENCES users(id),
        status VARCHAR(50) DEFAULT 'applied',
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (open_position_id, candidate_id)
      )
    `);

    /* =========================
       4. Seed data ONLY if jobs table is empty
    ========================== */
    const jobCount = await pool.query('SELECT COUNT(*) FROM jobs');
    if (jobCount.rows[0].count === '0') {
      /* Get real HR user */
      const hrUserResult = await pool.query(
        `SELECT id FROM users WHERE email = $1 LIMIT 1`,
        ['hr@leapfrogconnect.com']
      );

      if (hrUserResult.rows.length === 0) {
        throw new Error(
          'HR user (hr@leapfrogconnect.com) not found. Create HR user before running hiring migrations.'
        );
      }

      const hrUserId = hrUserResult.rows[0].id;
      console.log(`✅ Found HR user ID: ${hrUserId}`);

      /* =========================
         5. Seed JOBS
      ========================== */
      await pool.query(`
        INSERT INTO jobs (title, description, target_role, created_by)
        SELECT
          seed.title,
          seed.description,
          seed.target_role,
          creator.id
        FROM (
          VALUES
            (
              'Backend Developer Intern',
              'Entry-level backend role focused on APIs, PostgreSQL, and Node fundamentals.',
              'Backend Developer'
            ),
            (
              'Frontend Developer Intern',
              'Frontend role focused on React, UI implementation, and API integration.',
              'Frontend Developer'
            ),
            (
              'QA Engineer Trainee',
              'QA trainee role focused on manual and API testing.',
              'QA Engineer'
            )
        ) AS seed(title, description, target_role)
        CROSS JOIN (
          SELECT id
          FROM users
          WHERE email = 'hr@leapfrogconnect.com'
          LIMIT 1
        ) AS creator
        ON CONFLICT DO NOTHING;
      `);

      /* =========================
         6. Seed OPEN_POSITIONS
      ========================== */
      await pool.query(`
        INSERT INTO open_positions (
          job_id,
          title,
          location,
          position_type,
          openings,
          status,
          created_by
        )
        SELECT
          j.id,
          j.title,
          seed.location,
          seed.position_type,
          seed.openings,
          'open',
          creator.id
        FROM (
          VALUES
            ('Backend Developer Intern', 'Kathmandu', 'Internship', 2),
            ('Frontend Developer Intern', 'Kathmandu', 'Internship', 2),
            ('QA Engineer Trainee', 'Kathmandu', 'Traineeship', 3)
        ) AS seed(title, location, position_type, openings)
        JOIN jobs j ON j.title = seed.title
        CROSS JOIN (
          SELECT id
          FROM users
          WHERE email = 'hr@leapfrogconnect.com'
          LIMIT 1
        ) AS creator
        ON CONFLICT DO NOTHING;
      `);

      console.log('✅ Seeded jobs and open positions');
    }

    console.log('✅ Hiring tables ready');
  } catch (error) {
    console.error('⚠️ Migration error:', error.message);
    throw error;
  }
}
