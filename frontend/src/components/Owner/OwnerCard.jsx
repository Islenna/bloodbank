import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../Shared/Card';
import List from '../Shared/List';

function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

const ownerCardConfig = {
    type: 'owners',
    title: 'Owner',
    apiEndpoint: 'http://localhost:8000/api/owners',
    identifierField: 'firstName',
    editPath: '/owners/edit',
    fields: [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Email' },
        { name: 'phoneNumber', label: 'Phone Number', format: formatPhoneNumber },
        { name: 'homeClinic', label: 'Home Clinic' }
    ],
    extraContent: (data, id) => (
        <div>
            <h3 className="text-lg font-semibold">Pets</h3>
            <List
                apiEndpoint={`http://localhost:8000/api/owners/${id}/pets`}
                type="pets"
                data={data.pets || []}
                columns={petColumns}
                onRowClick={(petId) => navigate(`/pets/${petId}`)}
                ownerId={id} // Pass ownerId to List
            />
        </div>
    )
};

const petColumns = [
    { name: 'petName', label: 'Pet Name' },
    { name: 'petType', label: 'Pet Type' },
    { name: 'bloodType', label: 'Blood Type' },
    { name: 'ezyVetCode', label: 'EzyVet ID' },
    { name: 'lastDonated', label: 'Last Donated', format: (date) => date ? new Date(date).toLocaleDateString('en-US') : 'N/A' },
];

export default function OwnerCard() {
    const { id } = useParams();
    const [ownerData, setOwnerData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/owners/${id}`, { withCredentials: true })
            .then((res) => {
                setOwnerData(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (!ownerData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-4">
            <Card
                cardConfig={{
                    ...ownerCardConfig,
                    extraContent: (data) => (
                        <div>
                            <h3 className="text-lg font-semibold">Pets</h3>
                            <List
                                apiEndpoint={`http://localhost:8000/api/owners/${id}/pets`}
                                type="pets"
                                data={data.pets || []}
                                columns={petColumns}
                                onRowClick={(petId) => navigate(`/pets/${petId}`)}
                                ownerId={id} // Pass ownerId to List
                            />
                        </div>
                    )
                }}
                data={ownerData}
                isEditable={false}
            />
        </div>
    );
}
