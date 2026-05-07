import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * POST /auth/login
 * Body: { email, password }
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Fetch user + role name
    const result = await pool.query(
      `
      SELECT 
        u.id,
        u.email,
        u.password_hash,
        r.name AS role
      FROM users u
      JOIN roles r ON r.id = u.role_id
      WHERE u.email = $1 AND u.is_active = true
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare password with bcrypt hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      {
        user_id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Success response
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /auth/register
 * Body: { email, password, confirmPassword, full_name, role }
 */
export const register = async (req, res) => {
  const { email, password, confirmPassword, full_name, role } = req.body;

  // Validation
  if (!email || !password || !full_name || !role) {
    return res.status(400).json({ error: 'Email, password, full name, and role are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const validRoles = ['student', 'hr', 'admin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role. Must be one of: student, hr, admin' });
  }

  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Get role ID from role name
    const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [role]);
    if (roleResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid role in system' });
    }

    const roleId = roleResult.rows[0].id;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `
      INSERT INTO users (email, password_hash, full_name, role_id, is_active, created_at)
      VALUES ($1, $2, $3, $4, true, CURRENT_TIMESTAMP)
      RETURNING id, email, full_name
      `,
      [email, hashedPassword, full_name, roleId]
    );

    const newUser = result.rows[0];

    // Create JWT
    const token = jwt.sign(
      {
        user_id: newUser.id,
        role: role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.full_name,
        role: role
      }
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /auth/me
 * Header: Authorization: Bearer <token>
 */
export const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        u.id,
        u.email,
        u.full_name,
        r.name AS role,
        u.created_at
      FROM users u
      JOIN roles r ON r.id = u.role_id
      WHERE u.id = $1
      `,
      [req.user.user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('GET ME ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};