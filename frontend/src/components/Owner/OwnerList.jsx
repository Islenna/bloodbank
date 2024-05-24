import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import List from '../Shared/List';

const ownerColumns = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email' },
    { name: 'phoneNumber', label: 'Phone Number' },
    { name: 'homeClinic', label: 'Home Clinic' }
];

export default function OwnerList() {
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('lastName');

    useEffect(() => {
        axios.get('http://localhost:8000/api/owners', { withCredentials: true })
            .then((res) => {
                setOwners(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSort = (property) => {
        if (property === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(property);
            setSortOrder('asc');
        }
        setOwners([...owners].sort((a, b) => {
            const aValue = a[property].toLowerCase();
            const bValue = b[property].toLowerCase();
            return (sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue));
        }));
    };

    return (
        <List
            type="owners"
            data={owners}
            columns={ownerColumns}
            onRowClick={(id) => navigate(`/owners/${id}`)}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
        />
    );
}
