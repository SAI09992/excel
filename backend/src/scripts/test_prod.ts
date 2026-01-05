const testBackend = async () => {
    try {
        console.log('Testing: https://excel-1-csv3.onrender.com/api/slots');
        const res = await fetch('https://excel-1-csv3.onrender.com/api/slots');
        console.log('Status:', res.status);
        const data: any = await res.json();
        console.log('Data Type:', typeof data);
        console.log('Is Array?', Array.isArray(data.slots || data));
    } catch (err: any) {
        console.log('Error:', err.message);
    }
};

testBackend();
