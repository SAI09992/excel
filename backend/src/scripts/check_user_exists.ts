
import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart-parking');
        console.log('Connected to MongoDB');

        const email = 'mainserver333@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            console.log(`User found: ${user.name} (${user.email})`);
            console.log(`ID: ${user._id}`);
            console.log(`Role: ${user.role}`);
        } else {
            console.log(`User NOT found with email: ${email}`);
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUser();
