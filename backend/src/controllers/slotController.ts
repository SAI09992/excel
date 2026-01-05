import { Request, Response } from 'express';
import ParkingSlot from '../models/ParkingSlot';

export const getSlots = async (req: Request, res: Response) => {
    try {
        let slots = await ParkingSlot.find().sort({ slotNumber: 1 });

        // Seed slots if empty
        if (slots.length === 0) {
            const seedSlots = [
                { slotNumber: 'A1', type: 'CAR', status: 'AVAILABLE' as const, zone: 'A' },
                { slotNumber: 'A2', type: 'CAR', status: 'OCCUPIED' as const, zone: 'A' },
                { slotNumber: 'A3', type: 'CAR', status: 'AVAILABLE' as const, zone: 'A' },
                { slotNumber: 'A4', type: 'CAR', status: 'AVAILABLE' as const, zone: 'A' },
                { slotNumber: 'B1', type: 'CAR', status: 'AVAILABLE' as const, zone: 'B' },
                { slotNumber: 'B2', type: 'CAR', status: 'RESERVED' as const, zone: 'B' },
                { slotNumber: 'B3', type: 'CAR', status: 'AVAILABLE' as const, zone: 'B' },
                { slotNumber: 'B4', type: 'CAR', status: 'AVAILABLE' as const, zone: 'B' },
            ];
            slots = await ParkingSlot.insertMany(seedSlots);
            console.log('Seeded initial parking slots');
        }

        res.json({ slots });
    } catch (error: any) {
        console.error('Error fetching slots:', error);
        res.status(500).json({
            message: `Slot fetch error: ${error.message}`,
            details: error.toString()
        });
    }
};
