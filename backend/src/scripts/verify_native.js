
const http = require('http');

const post = (path, data) => {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify(data);
        const req = http.request({
            hostname: 'localhost',
            port: 5000,
            path: '/api' + path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        }, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(responseBody));
                } else {
                    reject({ status: res.statusCode, body: responseBody });
                }
            });
        });
        req.on('error', (e) => reject(e));
        req.write(body);
        req.end();
    });
};

const verify = async () => {
    console.log('--- SYSTEM VERIFICATION START ---');
    try {
        // Register
        const email = `test_${Date.now()}@example.com`;
        console.log(`Attempting to register: ${email}`);
        const regData = await post('/auth/register', {
            name: "Test Bot",
            email: email,
            password: "password123",
            plateNumber: "TEST-001"
        });
        console.log('✅ Registration SUCCESS');
        console.log(`Token received: ${regData.token ? 'Yes' : 'No'}`);

    } catch (error) {
        console.error('❌ Verification FAILED');
        if (error.status) {
            console.error(`Status: ${error.status}`);
            console.error(`Body: ${error.body}`);
        } else {
            console.error(`Error: ${error.message}`);
        }
    }
    console.log('--- SYSTEM VERIFICATION END ---');
};

verify();
