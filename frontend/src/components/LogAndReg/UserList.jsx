import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const { userRole } = useAuth();

    useEffect(() => {
        
        console.log("User role in UserList:", userRole);
        console.log(localStorage.getItem('userRole'));
        if (userRole !== 'admin') {
            toast.error("You're not authorized to view this page");
            console.log("User role in the useEffect", userRole);
        }

        axios
            .get('http://localhost:8000/api/users', { withCredentials: true })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to fetch users");
            });
    }, [navigate, userRole]);

    const handleChangeRole = (userId, newRole) => {
        axios
            .patch(`http://localhost:8000/api/users/${userId}/role`, { role: newRole }, { withCredentials: true })
            .then((res) => {
                setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
                toast.success("User role updated successfully");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to update user role");
            });
    };

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
