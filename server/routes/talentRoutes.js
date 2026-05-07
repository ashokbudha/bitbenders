import express from 'express';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';
import { getTalent, getShortlistedTalent } from '../controllers/talentController.js';

const router = express.Router();

router.use(verifyToken, requireRole(['hr', 'admin']));

router.get('/', getTalent);
router.get('/shortlisted', getShortlistedTalent);

export default router;
