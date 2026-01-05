import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
const router = express.Router();

import { protect } from '../middleware/authMiddleware';

router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);

export default router;
