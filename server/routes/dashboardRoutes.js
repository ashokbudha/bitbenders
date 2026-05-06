import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  getPipelineOverview,
  getTopCandidates,
  getPriorityCandidates,
  getFunnelMovements,
  getReadinessByRole,
  getRecentActivity
} from '../controllers/dashboardController.js';

const router = express.Router();

// Apply auth middleware to all dashboard endpoints
router.use(verifyToken);

router.get('/pipeline', getPipelineOverview);
router.get('/top-candidates', getTopCandidates);
router.get('/priority-candidates', getPriorityCandidates);
router.get('/funnel-movements', getFunnelMovements);
router.get('/readiness-by-role', getReadinessByRole);
router.get('/recent-activity', getRecentActivity);

export default router;