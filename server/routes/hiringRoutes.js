import express from 'express';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';
import {
  getJobs,
  createJob,
  getOpenPositions,
  createOpenPosition,
  updatePositionStatus,
  getApplications,
  getMyApplications,
  createApplication,
  updateApplicationStatus
} from '../controllers/hiringController.js';

const router = express.Router();

// Public routes
router.get('/jobs', getJobs);
router.get('/open-positions', getOpenPositions);

// Student routes
router.post('/applications', verifyToken, requireRole(['student']), createApplication);
router.get('/applications/me', verifyToken, requireRole(['student']), getMyApplications);

// HR/Admin routes
router.post('/jobs', verifyToken, requireRole(['hr', 'admin']), createJob);
router.post('/open-positions', verifyToken, requireRole(['hr', 'admin']), createOpenPosition);
router.patch('/open-positions/:id/status', verifyToken, requireRole(['hr', 'admin']), updatePositionStatus);
router.get('/applications', verifyToken, requireRole(['hr', 'admin']), getApplications);
router.patch('/applications/:id/status', verifyToken, requireRole(['hr', 'admin']), updateApplicationStatus);

export default router;
