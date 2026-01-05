
import axios from 'axios';

const checkApi = async () => {
    console.log('--- API CHECK START ---');
    const url = 'http://localhost:5000/api/slots';
    console.log(`GET ${url}`);

    try {
        const res = await axios.get(url);
        console.log('✅ Status:', res.status);
        console.log('✅ Data:', JSON.stringify(res.data, null, 2));
    } catch (error: any) {
        if (error.response) {
            console.log('❌ Error Status:', error.response.status);
            console.log('❌ Error Data (Body):', JSON.stringify(error.response.data, null, 2));
            console.log('❌ Error Headers:', JSON.stringify(error.response.headers, null, 2));
        } else if (error.request) {
            console.log('❌ No Response Received. Server might be down or blocked.');
            console.log('Error details:', error.message);
        } else {
            console.log('❌ Request Setup Error:', error.message);
        }
    }
    console.log('--- API CHECK END ---');
};

checkApi();
