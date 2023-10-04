import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/users/loggedin', { withCredentials: true })
            .then(() => {
                setIsLoggedIn(true); // User is logged in
                axios
                    .get('http://localhost:8000/api/users', { withCredentials: true })
                    .then((res) => {
                        console.log(res);
                        setUsers(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch(() => {
                setIsLoggedIn(false); // User is not logged in
                navigate('/login'); // Redirect to the login page
            });
    }, []);

    return (
        <div>
            <div className="text-center">
                {isLoggedIn ? (
                    <>
                        <h1>User List</h1>
                        <div
                            style={{
                                backgroundColor: '#725846',
                                border: 'none',
                                borderTop: '10px solid #A9C27E',
                            }}
                            text="white"
                            className="mt-4 p-4"
                        >
                            <div>Users</div>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        <div variant = "danger"
                                                            onClick={() => {
                                                                axios
                                                                    .delete(
                                                                        `http://localhost:8000/api/users/${user._id}`,
                                                                        { withCredentials: true }
                                                                    )
                                                                    .then((res) => {
                                                                        console.log(res);
                                                                        setUsers(
                                                                            users.filter(
                                                                                (user) => user._id !== res.data._id
                                                                            )
                                                                        );
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log(err);
                                                                    });
                                                            }}
                                                        >
                                                            Delete
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
