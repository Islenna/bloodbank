import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LogAndReg() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [regError, setRegError] = useState('');

    // Access setUserEmail and setIsLoggedIn from the context
    const { setUserEmail, setIsLoggedIn } = useAuth();

    const registrationHandler = (e) => {
        e.preventDefault();

        if (regPassword !== confirmPassword) {
            setRegError('Passwords do not match');
            return;
        }

        if (!/^([\w-\.]+@SageCentersTest\.com)?$/i.test(regEmail)) {
            setRegError('Invalid email. Please enter a valid email.');
            return;
        }

        const payload = {
            email: regEmail,
            password: regPassword,
            confirmPassword: confirmPassword,
        };

        axios
            .post('http://localhost:8000/api/users/register', payload, { withCredentials: true })
            .then((res) => {
                console.log(res);
                setUserEmail(res.data.email);
                setIsLoggedIn(true);
                navigate('/bloodfinder');
            })
            .catch((err) => {
                setRegError('An error occurred while submitting the form');
                console.log(err);
            });
    };

    const loginHandler = (e) => {
        e.preventDefault();

        const payload = {
            email: loginEmail,
            password: loginPassword,
        };
        axios
            .post('http://localhost:8000/api/users/login', payload, { withCredentials: true })
            .then((res) => {
                console.log(res);
                const userEmail = res.data.email;
                setUserEmail(userEmail);
                setIsLoggedIn(true);
                navigate('/bloodfinder');
            })
            .catch((err) => {
                setLoginError('An error occurred while submitting the form');
                console.log(err);
            });
    };

    return (
        <div>
            <div className="text-center">
                <h1>Login and Registration</h1>
                <div
                    style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                    text="white"
                    className="mt-4 p-4"
                >
                    <div>
                        <div>
                            <div onSubmit={loginHandler}>
                                <h2>Login</h2>
                                <div className="mb-3" controlId="loginForm">
                                    <div>Email address</div>
                                    <div
                                        type="email"
                                        placeholder="Enter email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                    />
                                    <div>Password</div>
                                    <div
                                        type="password"
                                        placeholder="Enter password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {loginError && <p className="text-danger">{loginError}</p>}
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </div>
                        <div>
                            <div onSubmit={registrationHandler}>
                                <h2>Registration</h2>
                                <div className="mb-3" controlId="regForm">
                                    <div>Email address</div>
                                    <div
                                        type="email"
                                        placeholder="Enter email"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        required
                                    />
                                    <div>Password</div>
                                    <div
                                        type="password"
                                        placeholder="Enter password"
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        required
                                    />
                                    <div>Confirm Password</div>
                                    <div
                                        type="password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {regError && <p className="text-danger">{regError}</p>}
                                <button type="submit" className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
