import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../Shared/Form';
import { toast } from 'react-toastify';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the initial data for the form
        axios.get(`http://localhost:8000/api/owners/${id}`, { withCredentials: true })
            .then((res) => {
                setInitialData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setLoading(false);
            });
    }, [id]);

    const ownerFormConfig = {
        type: 'owners',
        apiEndpoint: `http://localhost:8000/api/owners`, // The base endpoint
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

    const handleSubmit = async (formData) => {
        try {
            await axios.put(`${ownerFormConfig.apiEndpoint}/${id}`, formData, { withCredentials: true });
            toast.success('Owner updated successfully');
            navigate(`/owners/${id}`);
        } catch (err) {
            console.error('Error updating owner:', err);
            toast.error('Failed to update owner');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Form formConfig={ownerFormConfig} initialData={initialData} onSubmit={handleSubmit} />
        </div>
    );
};

export default Update;
