import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    userId?: mongoose.Types.ObjectId; // Null for Kiosk
    source: 'WEB' | 'KIOSK';
    carNumber: string;
    slotId: mongoose.Types.ObjectId;
    status: 'PENDING_PAYMENT' | 'PENDING_ARRIVAL' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
    startTime: Date;
    endTime: Date;
    actualStartTime?: Date;
    actualEndTime?: Date;
    bufferExpiry?: Date;
    totalCost: number;
    paymentId?: mongoose.Types.ObjectId;
    notificationsSent: string[];
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    source: { type: String, enum: ['WEB', 'KIOSK'], required: true },
    carNumber: { type: String, required: true },
    slotId: { type: Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
    status: {
        type: String,
        enum: ['PENDING_PAYMENT', 'PENDING_ARRIVAL', 'ACTIVE', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING_PAYMENT'
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    actualStartTime: { type: Date },
    actualEndTime: { type: Date },
    bufferExpiry: { type: Date }, // For WEB bookings
    totalCost: { type: Number, required: true },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
    notificationsSent: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);
