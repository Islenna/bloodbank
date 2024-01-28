import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userRole } = useAuth();

    useEffect(() => {
        if (userRole === '') {
            setIsLoading(true);
            return;
        }

        if (userRole !== 'admin') {
            toast.error("You're not authorized to view this page");
            navigate('/bloodfinder');
            return;
        }

        setIsLoading(true);
        axios.get('http://localhost:8000/api/users', { withCredentials: true })
            .then((res) => {
                setUsers(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to fetch users");
                setIsLoading(false);
            });
    }, [navigate, userRole]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleChangeRole = (id, role) => {
        axios.put(`http://localhost:8000/api/users/${id}/role`, { role }, { withCredentials: true })
            .then((res) => {
                setUsers(users.map((user) => (user._id === id ? { ...user, role } : user)));
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to update user's role");
            });
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/users/${id}`, { withCredentials: true })
            .then((res) => {
                setUsers(users.filter((user) => user._id !== id));
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to delete user");
            });
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">User List</h1>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">{user.role}</td>
                        <td className="border px-4 py-2">
                            <select
                                value={user.role}
                                onChange={(e) => handleChangeRole(user._id, e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                            </select>
                        </td>
                        <td className="border px-4 py-2">
                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                        </td>
                    </tr>
                    
                    ))}
                </tbody>
            </table>
        </div>
    );
}
