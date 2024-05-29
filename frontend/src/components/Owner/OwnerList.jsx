import React from 'react';
import List from '../Shared/List';


function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

const ownerColumns = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email' },
    { name: 'phoneNumber', label: 'Phone Number', format: formatPhoneNumber },
    { name: 'homeClinic', label: 'Home Clinic' }
];

export default function OwnerList() {
    return (
        <List
            apiEndpoint="http://localhost:8000/api/owners"
            type="owners"
            columns={ownerColumns}
            defaultSortBy="lastName"
        />
    );
}
