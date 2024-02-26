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
        <div className="flex flex-col items-center justify-center my-8">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-6 text-gray-900 dark:text-white">User List</h1>
                <div className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 transition duration-300">
                    <table className="w-full table-auto">
                        <thead className="text-left text-black dark:text-white bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-gray-600 dark:text-gray-400">Email</th>
                                <th className="px-4 py-2 text-gray-600 dark:text-gray-400">Role</th>
                                <th className="px-4 py-2 text-gray-600 dark:text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b text-black dark:text-white dark:border-gray-700">
                                    <td className="px-4 py-2 dark:text-white">{user.email}</td>
                                    <td className="px-4 py-2 dark:text-white">{user.role}</td>
                                    <td className="px-4 py-2 dark:text-white">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleChangeRole(user._id, e.target.value)}
                                            className="px-2 py-1 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 dark:focus:ring-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

    );
}
