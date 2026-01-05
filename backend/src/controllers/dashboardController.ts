import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Booking from '../models/Booking';
import ParkingSlot from '../models/ParkingSlot';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        // req.user is added by authMiddleware
        const userId = (req as any).user.id;

        // Calculate Total Bookings for this user
        const totalBookings = await Booking.countDocuments({ userId });

        // Calculate Total Revenue for this user
        const revenueResult = await Booking.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: "$totalCost" } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        // Get Current Active Booking for this user
        const activeBooking = await Booking.findOne({
            userId,
            status: { $in: ['PENDING_ARRIVAL', 'ACTIVE'] }
        })
            .sort({ createdAt: -1 })
            .populate('slotId');

        // Get Occupancy Status (Global, not per user)
        const totalSlots = await ParkingSlot.countDocuments();
        const occupiedSlots = await ParkingSlot.countDocuments({ status: { $ne: 'AVAILABLE' } });

        res.json({
            stats: {
                totalRevenue,
                totalBookings,
                occupancy: { occupied: occupiedSlots, total: totalSlots }
            },
            activeBooking: activeBooking ? {
                id: activeBooking._id,
                slotNumber: (activeBooking.slotId as any).slotNumber,
                status: activeBooking.status,
                startTime: activeBooking.startTime,
                bufferExpiry: activeBooking.bufferExpiry,
                carNumber: activeBooking.carNumber
            } : null
        });

    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
