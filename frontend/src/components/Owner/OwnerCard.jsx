import React from 'react';
import Card from '../Shared/Card';

const ownerCardConfig = {
    type: 'owner',
    title: 'Owner',
    apiEndpoint: 'http://localhost:8000/api/owners',
    identifierField: 'firstName', // Use a field that uniquely identifies the owner
    editPath: '/owners/edit',
    fields: [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Email' },
        { name: 'phoneNumber', label: 'Phone Number' },
        { name: 'homeClinic', label: 'Home Clinic' }
    ]
};

export default function OwnerCard() {
    return <Card cardConfig={ownerCardConfig} />;
}
