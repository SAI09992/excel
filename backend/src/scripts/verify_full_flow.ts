
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const verifySystem = async () => {
    console.log('--- SYSTEM VERIFICATION START ---');

    // 1. Health Check
    try {
        await axios.get('http://localhost:5000/');
        console.log('✅ Backend is reachable (Health Check)');
    } catch (e: any) {
        console.error('❌ Backend Unreachable:', e.message);
        process.exit(1);
    }

    // 2. Register User
    const email = `test_${Date.now()}@example.com`;
    let token = '';
    try {
        const res = await axios.post(`${API_URL}/auth/register`, {
            name: "Test Bot",
            email: email,
            password: "password123",
            plateNumber: "TEST-001"
        });
        console.log('✅ Registration Successful');
        token = res.data.token;
    } catch (e: any) {
        console.error('❌ Registration Failed:', e.response?.data || e.message);
        // If user already exists, try login
    }

    // 3. Login User (if register failed or just to test)
    if (!token) {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, {
                email: email,
                password: "password123"
            });
            console.log('✅ Login Successful');
            token = res.data.token;
        } catch (e: any) {
            console.error('❌ Login Failed:', e.response?.data || e.message);
        }
    }

    if (!token) {
        console.error('❌ Authentication failed. Stopping.');
        process.exit(1);
    }

    // 4. Fetch Slots
    try {
        const res = await axios.get(`${API_URL}/slots`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (Array.isArray(res.data.slots)) {
            console.log(`✅ Slots Fetched: Found ${res.data.slots.length} slots`);
        } else {
            console.error('❌ Slots format incorrect');
        }
    } catch (e: any) {
        console.error('❌ Fetch Slots Failed:', e.message);
    }

    console.log('--- SYSTEM VERIFICATION COMPLETE ---');
};

verifySystem();
