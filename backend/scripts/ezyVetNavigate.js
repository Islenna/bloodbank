const axios = require('axios');

async function getEzyVetAccessToken() {
    try {
        const response = await axios.post('https://api.ezyvet.com/v1/oauth/access_token', new URLSearchParams({
            partner_id: 'c01b6dc90ccd07e7b0a325ecd13c3094fbe89568399d557beb44084077a16bdb',
            client_id: '068ed79d9788a26ccd2331fa4fd0afb2',
            client_secret: '$2y$10$gxQRM4IiLTLlQcATlqvZHOPAnYRU0oXNIRTc8qFhKa3gF9lxrXoEu',
            grant_type: 'client_credentials',
            scope: 'read-animal'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw new Error('Failed to fetch access token');
    }
}

async function getAnimalDetailsByCode(accessToken, code) {
    try {
        const response = await axios.get(`https://api.ezyvet.com/v1/animal?code=${code}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data.items[0].animal;
    } catch (error) {
        console.error('Error fetching animal details:', error);
        throw new Error('Failed to fetch animal details');
    }
}

async function main() {
    try {
        const accessToken = await getEzyVetAccessToken();
        const animalCode = '476773'; // Replace with the actual animal code
        const animalDetails = await getAnimalDetailsByCode(accessToken, animalCode);
        console.log('Animal Details:', animalDetails);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
