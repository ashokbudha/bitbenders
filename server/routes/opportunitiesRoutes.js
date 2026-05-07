import express from 'express';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';
import { getOpportunities } from '../controllers/talentController.js';

const router = express.Router();

router.use(verifyToken, requireRole(['hr', 'admin']));

router.get('/', getOpportunities);

export default router;
