import { Request, Response } from 'express';
import User from '../models/User';

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        // req.user is added by authMiddleware
        const userId = (req as any).user.id;
        const user = await User.findById(userId).select('-passwordHash');

        if (user) {
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                vehicleNo: user.managedCars && user.managedCars.length > 0 ? user.managedCars[0] : '',
                membership: 'Standard' // Placeholder
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const user = await User.findById(userId);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.vehicleNo) {
                // Simple replacement for primary car
                user.managedCars = [req.body.vehicleNo];
            }
            if (req.body.password) {
                // hashing logic would go here
            }

            const updatedUser = await user.save();
            res.json({
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                vehicleNo: updatedUser.managedCars[0],
                token: req.headers.authorization?.split(' ')[1] // return same token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
