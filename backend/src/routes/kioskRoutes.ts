import express from 'express';
const router = express.Router();
router.post('/bookings', (req, res) => res.json({ message: 'Kiosk booking created' }));
export default router;
