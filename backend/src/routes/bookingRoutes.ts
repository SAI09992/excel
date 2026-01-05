import express from 'express';
import { createBooking, handlePlateRecognition, cancelBooking } from '../services/bookingService';
const router = express.Router();

import Booking from '../models/Booking';

import { protect } from '../middleware/authMiddleware';

router.post('/', protect, async (req: any, res) => {
    try {
        const { slotId, carNumber, startTime, endTime, source } = req.body;
        const booking = await createBooking(req.user.id, carNumber, slotId, startTime, endTime, source || 'WEB');
        res.json(booking);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// Get User Bookings
router.get('/', protect, async (req: any, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).populate('slotId').sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/:id/cancel', async (req, res) => {
    try {
        const booking = await cancelBooking(req.params.id);
        res.json(booking);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/entry', async (req, res) => {
    try {
        const { carNumber, gateId } = req.body;
        const result = await handlePlateRecognition(carNumber, gateId || 'GATE_01');
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
