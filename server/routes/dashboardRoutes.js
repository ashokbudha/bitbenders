import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  getPipeline,
  getTopCandidates,
  getPriorityCandidates,
  getFunnelMovements,
  getReadinessByRole,
  getRecentActivity
} from '../controllers/dashboardController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/pipeline', getPipeline);
router.get('/top-candidates', getTopCandidates);
router.get('/priority-candidates', getPriorityCandidates);
router.get('/funnel-movements', getFunnelMovements);
router.get('/readiness-by-role', getReadinessByRole);
router.get('/recent-activity', getRecentActivity);

export default router;
