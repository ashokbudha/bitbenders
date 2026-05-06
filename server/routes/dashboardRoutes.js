import express from 'express';
import { testDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/test', testDashboard);

export default router;