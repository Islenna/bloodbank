import React, { useState } from 'react';
import Card from '../Shared/Card';
import axios from 'axios';

const petCardConfig = {
    type: 'pet',
    title: 'Pet',
    apiEndpoint: 'http://localhost:8000/api/pets',
    identifierField: 'petName',
    editPath: '/pets/edit',
    fields: [
        { name: 'petName', label: 'Pet Name' },
        { name: 'petType', label: 'Pet Type' },
        { name: 'petDescription', label: 'Pet Description' },
        { name: 'ezyVetCode', label: 'Patient ID (EzyVet Code)' },
        { name: 'bloodType', label: 'Blood Type' },
        { name: 'lastDonated', label: 'Last Donated', format: (date) => date ? new Date(date).toLocaleDateString('en-US') : 'N/A' },
        { name: 'labworkStatus', label: 'Labwork Status' },
        { name: 'dateLabworkCompleted', label: 'Date Labwork Completed', format: (date) => date ? new Date(date).toLocaleDateString('en-US') : 'N/A' },
        { name: 'homeClinic', label: 'Home Clinic' }
    ],
    extraContent: (data, setData) => (
        <>
            {data.ezyVetId ? (
                <button
                    className="btn btn-success"
                    onClick={() => window.open(`https://sagecenters.usw2.ezyvet.com/?recordclass=Animal&recordid=${data.ezyVetId}`, '_blank')}
                >
                    Open in EzyVet
                </button>
            ) : (
                <button
                    className="btn btn-primary"
                    onClick={() => fetchEzyVetId(data.ezyVetCode, setData)}
                >
                    Fetch EzyVet ID
                </button>
            )}
        </>
    )
};

const fetchEzyVetId = async (code, setData) => {
    try {
        if (!code) {
            console.error('EzyVet code is undefined');
            return;
        }
        console.log('Fetching EzyVet ID for code:', code);
        const response = await axios.get(`http://localhost:8000/api/ezyvet/animal/${code}`);
        const ezyVetData = response.data;
        console.log('Fetched EzyVet Data:', ezyVetData);
        setData(prevData => ({ ...prevData, ezyVetId: ezyVetData.id }));
    } catch (error) {
        console.error('Error fetching EzyVet ID:', error);
    }
};

export default function PetCard() {
    return <Card cardConfig={petCardConfig} />;
}
