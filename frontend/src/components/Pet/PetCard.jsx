import React from 'react';
import Card from '../Shared/Card';

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
        { name: 'ezyVetId', label: 'EzyVet ID'},
        { name: 'bloodType', label: 'Blood Type' },
        { name: 'lastDonated', label: 'Last Donated', format: (date) => date ? new Date(date).toLocaleDateString('en-US') : 'N/A' },
        { name: 'labworkStatus', label: 'Labwork Status' },
        { name: 'dateLabworkCompleted', label: 'Date Labwork Completed', format: (date) => date ? new Date(date).toLocaleDateString('en-US') : 'N/A' },
        { name: 'homeClinic', label: 'Home Clinic' }
    ]
};

export default function PetCard() {
    return <Card cardConfig={petCardConfig} />;
}
