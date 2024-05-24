import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../Shared/Form';
import axios from 'axios';

export default function PetEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);

    const petFormConfig = {
        type: 'pets',
        apiEndpoint: 'http://localhost:8000/api/pets',
        fields: [
            { name: 'petName', label: 'Pet Name', type: 'text', required: true },
            { name: 'petType', label: 'Pet Type', type: 'select', options: ['Dog', 'Cat'], required: true },
            { name: 'owner', label: 'Owner', type: 'text', required: true, readOnly: true }, 
            { name: 'petDescription', label: 'Pet Description', type: 'text', required: false },
            { name: 'ezyVetId', label: 'EzyVet ID', type: 'text', required: true },
            { name: 'bloodType', label: 'Blood Type', type: 'select', options: ['DEA 1.1 Positive', 'DEA 1.1 Negative', 'A', 'B', 'AB'], required: true },
            { name: 'lastDonated', label: 'Last Donated', type: 'date', required: false },
            { name: 'labworkStatus', label: 'Labwork Status', type: 'select', options: ['Incomplete', 'Pending', 'Complete'], required: false },
            { name: 'dateLabworkCompleted', label: 'Date Labwork Completed', type: 'date', required: false },
            { name: 'homeClinic', label: 'Home Clinic', type: 'select', options: ['Concord', 'Campbell', 'Redwood City', 'San Francisco', 'Dublin'], required: true },
        ]
    };
    useEffect(() => {
        axios.get(`${petFormConfig.apiEndpoint}/${id}`, { withCredentials: true })
            .then((res) => {
                setInitialData(res.data);
            })
            .catch((err) => {
                console.error(err);
                // Optionally handle errors, e.g., navigate back or show a message
            });
    }, [id]);

    const handleSubmit = async (formData) => {
        try {
            await axios.put(`${petFormConfig.apiEndpoint}/${id}`, formData, { withCredentials: true });
            navigate(`/pets/${id}`);
        } catch (err) {
            console.error(err);
            // Optionally handle errors
        }
    };

    return (
        <div>
            {initialData ? (
                <Form
                    formConfig={petFormConfig}
                    initialData={initialData}
                    onSubmit={handleSubmit}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
