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
            <div className="flex space-x-4 justify-center">
                <button
                    type="button"
                    onClick={() => navigate(`/owners/edit/${id}`)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Edit Owner
                </button>
                <button
                    type="button"
                    onClick={() => navigate(`/donors`)}
                    className="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                >
                    Back to Donors
                </button>
            </div>
        </div>
    );
}
