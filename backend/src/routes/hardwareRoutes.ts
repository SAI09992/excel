import express from 'express';
import { handlePlateRecognition } from '../services/bookingService';
const router = express.Router();

router.post('/plate-recognition', async (req, res) => {
    try {
        const { plateNumber, gateId } = req.body;
        const result = await handlePlateRecognition(plateNumber, gateId);
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/slot-status', (req, res) => {
    // Update slot status logic
    res.json({ message: 'Slot updated' });
});

export default router;
