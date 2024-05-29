import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../Shared/Card';
import List from '../Shared/List';

const ownerCardConfig = {
    type: 'owner',
    title: 'Owner',
    apiEndpoint: 'http://localhost:8000/api/owners',
    identifierField: 'firstName',
    editPath: '/owners/edit',
    fields: [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Email' },
        { name: 'phoneNumber', label: 'Phone Number' },
        { name: 'homeClinic', label: 'Home Clinic' }
    ],
    extraContent: (data, setData) => (
        <div>
            <h3 className="text-lg font-semibold">Pets</h3>
            <List
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
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/owners/${id}/pets`, { withCredentials: true })
            .then((res) => {
                setPets(res.data || []);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const cardConfigWithPets = {
        ...ownerCardConfig,
        extraContent: (data) => (
            <div>
                <h3 className="text-lg font-semibold">Pets</h3>
                <List
                    type="pets"
                    data={pets}
                    columns={petColumns}
                    onRowClick={(petId) => navigate(`/pets/${petId}`)}
                    ownerId={id} // Pass ownerId to List
                />
            </div>
        )
    };

    return (
        <div className="space-y-4">
            <Card cardConfig={cardConfigWithPets} isEditable={false} />
        </div>
    );
}
