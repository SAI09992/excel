
import axios from 'axios';

const testBackend = async () => {
    try {
        console.log('Testing: https://excel-1-csv3.onrender.com/api/slots');
        const res = await axios.get('https://excel-1-csv3.onrender.com/api/slots');
        console.log('Status:', res.status);
        console.log('Data Type:', typeof res.data);
        console.log('Is Array?', Array.isArray(res.data));
    } catch (err: any) {
        console.log('Error:', err.message);
        if (err.response) {
            console.log('Remote Status:', err.response.status);
            console.log('Remote Data:', err.response.data);
        }
    }
};

testBackend();
