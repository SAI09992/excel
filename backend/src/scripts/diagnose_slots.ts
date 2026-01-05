
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ParkingSlot from '../models/ParkingSlot';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-parking';

const diagnoseSlots = async () => {
    console.log('--- SLOT DIAGNOSTIC START ---');

    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connection Successful');

        const count = await ParkingSlot.countDocuments();
        console.log(`Current Slot Count: ${count}`);

        if (count === 0) {
            console.log('No slots found. Attempting to seed...');
            const seedSlots = [
                { slotNumber: 'A1', type: 'CAR', status: 'AVAILABLE', zone: 'A' },
                { slotNumber: 'A2', type: 'CAR', status: 'OCCUPIED', zone: 'A' },
                { slotNumber: 'A3', type: 'CAR', status: 'AVAILABLE', zone: 'A' },
                { slotNumber: 'A4', type: 'CAR', status: 'AVAILABLE', zone: 'A' },
                { slotNumber: 'B1', type: 'CAR', status: 'AVAILABLE', zone: 'B' },
                { slotNumber: 'B2', type: 'CAR', status: 'RESERVED', zone: 'B' },
                { slotNumber: 'B3', type: 'CAR', status: 'AVAILABLE', zone: 'B' },
                { slotNumber: 'B4', type: 'CAR', status: 'AVAILABLE', zone: 'B' },
            ];

            // Note: Mongoose might strip 'type' if it's not in the schema, but should strictly save the rest
            const result = await ParkingSlot.insertMany(seedSlots);
            console.log(`✅ Seeded ${result.length} slots.`);
        } else {
            const slots = await ParkingSlot.find({});
            console.log('Slots found:', slots.map(s => `${s.slotNumber} (${s.status})`));
        }

    } catch (error) {
        console.error('❌ Slot Diagnostic Failed:', error);
    }

    console.log('--- SLOT DIAGNOSTIC END ---');
    process.exit(0);
};

diagnoseSlots();
