import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    phone?: string;
    passwordHash: string;
    role: 'USER' | 'ADMIN';
    managedCars: string[]; // Simple array of plate numbers for easier lookup, or link to Car model
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    managedCars: [{ type: String }], // Store plates directly for simplicity in Phase 1
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
