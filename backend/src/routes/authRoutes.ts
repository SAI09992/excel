import express from 'express';
import { loginUser, registerUser, forgotPassword, resetPassword } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

router.get('/me', protect, (req: any, res) => {
    res.json(req.user);
});

export default router;
