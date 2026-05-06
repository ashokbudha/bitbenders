import pkg from 'pg';
const { Pool } = pkg;

console.log('⚠️ USING DIRECT DB CONFIG (NO ENV)');

const pool = new Pool({
  user: 'bitbenders_app',
  host: 'localhost',
  database: 'leapfrog_connect',
  password: 'bitbenders123',
  port: 5432,
});

pool.query('SELECT current_user, current_database()')
  .then(res => {
    console.log('✅ Connected as:', res.rows[0].current_user);
    console.log('✅ Database:', res.rows[0].current_database);
  })
  .catch(err => {
    console.error('❌ Database connection failed HARD');
    console.error(err);
  });

export default pool;