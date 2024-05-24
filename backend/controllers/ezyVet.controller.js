const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function getEzyVetAccessToken() {
    try {
        const response = await axios.post('https://api.ezyvet.com/v1/oauth/access_token', new URLSearchParams({
            partner_id: process.env.EZYVET_PARTNER_ID,
            client_id: process.env.EZYVET_CLIENT_ID,
            client_secret: process.env.EZYVET_CLIENT_SECRET,
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

async function getAnimalDetailsByCode(req, res) {
    const { code } = req.params;
    try {
        if (!code) {
            console.error('Code is undefined in the request params');
            return res.status(400).json({ error: 'Code is required' });
        }
        console.log('Fetching animal details for code:', code);
        const accessToken = await getEzyVetAccessToken();
        const response = await axios.get('https://api.ezyvet.com/v1/animal', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                code: code
            }
        });

        if (response.data.items.length === 0) {
            return res.status(404).json({ error: 'Animal not found' });
        }

        const animalDetails = response.data.items[0].animal;
        res.json({
            id: animalDetails.id, // EzyVet record ID
            code: animalDetails.code, // Patient ID
            name: animalDetails.name,
        });
    } catch (error) {
        console.error('Error fetching animal details:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAnimalDetailsByCode
};
