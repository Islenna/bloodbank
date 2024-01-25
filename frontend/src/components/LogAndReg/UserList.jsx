import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/users', { withCredentials: true })
            .then((res) => {
                
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (

        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">User List</h1>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user._id}>

                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
