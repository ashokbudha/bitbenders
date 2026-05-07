import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import talentRoutes from './routes/talentRoutes.js';
import opportunitiesRoutes from './routes/opportunitiesRoutes.js';
import { createHiringTables } from './migrations/createHiringTables.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/talent', talentRoutes);
app.use('/api/opportunities', opportunitiesRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await createHiringTables();
    console.log('✅ Migrations complete');
  } catch (error) {
    console.error('⚠️ Migration error:', error.message);
  }
});

export default server;
