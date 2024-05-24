import React from 'react';
import Form from '../Shared/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ownerFormConfig = {
    type: 'owners',
    apiEndpoint: 'http://localhost:8000/api/owners/new', 
    fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true },
        {
            name: 'homeClinic',
            label: 'Home Clinic',
            type: 'select',
            options: ['Concord', 'Campbell', 'Redwood City', 'San Francisco', 'Dublin'],
            required: true,
        },
    ]
};

export default function OwnerForm() {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            await axios.post(ownerFormConfig.apiEndpoint, formData, { withCredentials: true });
            toast.success('Owner added successfully');
            navigate('/donors');
        } catch (err) {
            console.error('Error:', err);
            toast.error('Failed to add owner');
        }
    };

    return <Form formConfig={ownerFormConfig} onSubmit={handleSubmit} />;
}
