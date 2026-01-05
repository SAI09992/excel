
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-parking';

const diagnose = async () => {
    console.log('--- DIAGNOSTIC START ---');
    console.log(`Connecting to MongoDB at ${MONGO_URI}...`);

    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connection Successful');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error);
        process.exit(1);
    }

    try {
        console.log('Testing Bcrypt...');
        const testPass = 'password123';
        const hash = await bcrypt.hash(testPass, 10);
        console.log('✅ Bcrypt Hash Successful');
        const match = await bcrypt.compare(testPass, hash);
        console.log(`✅ Bcrypt Compare Result: ${match}`);
    } catch (error) {
        console.error('❌ Bcrypt Failed:', error);
    }

    try {
        const email = 'edusaidhanush@gmail.com';
        console.log(`Searching for user: ${email}...`);
        const user = await User.findOne({ email });

        if (user) {
            console.log('✅ User Found:', user.email);
            console.log('User Role:', user.role);
            console.log('Password Hash length:', user.passwordHash ? user.passwordHash.length : 'MISSING');

            // Note: We cannot check password validity without knowing the password, 
            // but we can check if the hash looks valid (starts with $2b$)
            if (user.passwordHash && user.passwordHash.startsWith('$2b$')) {
                console.log('✅ Password Hash format looks valid (bcrypt)');
            } else {
                console.log('❌ Password Hash format looks INVALID');
            }
        } else {
            console.log('❌ User NOT Found. This might be why login fails if they think they are registered.');

            // List all users to see who IS there
            const allUsers = await User.find({}, 'email name');
            console.log('Current Users in DB:', allUsers.map(u => u.email));
        }

    } catch (error) {
        console.error('❌ DB Query Failed:', error);
    }

    console.log('--- DIAGNOSTIC END ---');
    process.exit(0);
};

diagnose();
