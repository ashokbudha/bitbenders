import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getCandidateProfile } from '../controllers/candidateController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/:id', getCandidateProfile);

export default router;
