
import http from 'http';

const email = JSON.stringify({
    email: 'mainserver333@gmail.com'
});

const options = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/auth/forgot',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': email.length
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log('Response Body:', data);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(email);
req.end();
