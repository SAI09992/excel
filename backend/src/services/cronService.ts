import cron from 'node-cron';
import { autoCancelExpiredBuffers } from './bookingService';

export const setupCronJobs = () => {
    // Run every minute
    cron.schedule('* * * * *', async () => {
        console.log('Running buffer expiry check...');
        try {
            await autoCancelExpiredBuffers();
        } catch (error) {
            console.error('Error in buffer expiry job:', error);
        }
    });
};
