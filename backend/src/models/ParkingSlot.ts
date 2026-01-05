import mongoose, { Schema, Document } from 'mongoose';

export interface IParkingSlot extends Document {
    slotNumber: string;
    zone?: string;
    status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
    currentBookingId?: mongoose.Types.ObjectId;
}

const ParkingSlotSchema: Schema = new Schema({
    slotNumber: { type: String, required: true, unique: true },
    zone: { type: String },
    status: {
        type: String,
        enum: ['AVAILABLE', 'OCCUPIED', 'RESERVED'],
        default: 'AVAILABLE'
    },
    currentBookingId: { type: Schema.Types.ObjectId, ref: 'Booking', default: null }
}, { timestamps: true });

export default mongoose.model<IParkingSlot>('ParkingSlot', ParkingSlotSchema);
