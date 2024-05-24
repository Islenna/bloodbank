import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '../Shared/Form';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PetForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ownerId = queryParams.get('ownerId');
    const [initialData, setInitialData] = useState({ owner: ownerId });

    const petFormConfig = {
        type: 'pets',
        apiEndpoint: 'http://localhost:8000/api/pets',
        fields: [
            { name: 'petName', label: 'Pet Name', type: 'text', required: true },
            { name: 'petType', label: 'Pet Type', type: 'select', options: ['Dog', 'Cat'], required: true },
            { name: 'petDescription', label: 'Pet Description', type: 'text', required: false },
            { name: 'ezyVetCode', label: 'EzyVet ID', type: 'text', required: true },
            { name: 'bloodType', label: 'Blood Type', type: 'select', options: ['DEA 1.1 Positive', 'DEA 1.1 Negative', 'A', 'B', 'AB'], required: true },
            { name: 'lastDonated', label: 'Last Donated', type: 'date', required: false },
            { name: 'labworkStatus', label: 'Labwork Status', type: 'select', options: ['Incomplete', 'Pending', 'Complete'], required: false },
            { name: 'dateLabworkCompleted', label: 'Date Labwork Completed', type: 'date', required: false },
            { name: 'homeClinic', label: 'Home Clinic', type: 'select', options: ['Concord', 'Campbell', 'Redwood City', 'San Francisco', 'Dublin'], required: true },
        ]
    };

    useEffect(() => {
        if (!ownerId) {
            console.error('Owner ID is required to create a pet');
            navigate('/donors'); // Redirect back to owners if no owner ID is found
            toast.error('Owner ID is required to create a pet');
        }
    }, [ownerId, navigate]);

    const handleSubmit = async (formData) => {
        try {
            // Ensure owner ID is included in the form data
            const dataWithOwner = { ...formData, owner: ownerId };
            console.log('Submitting data:', dataWithOwner); // Log the data being sent
            await axios.post(petFormConfig.apiEndpoint, dataWithOwner, { withCredentials: true });
            toast.success(`${petFormConfig.type.charAt(0).toUpperCase() + petFormConfig.type.slice(1)} added successfully`);
            navigate(`/owners/${ownerId}`);
        } catch (err) {
            console.error('Error creating pet:', err.response ? err.response.data : err.message); // Log any errors
            toast.error(`Failed to add ${petFormConfig.type}`);
        }
    };

    return (
        <div>
            <Form
                formConfig={petFormConfig}
                initialData={initialData}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
