import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Reg() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [regError, setRegError] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
    };

    const registrationHandler = (e) => {
        e.preventDefault();
        setRegError('');

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
                login();
                navigate('/bloodfinder');
            })
            .catch((err) => {
                setRegError('An error occurred while submitting the form');
                console.log(err);
            });
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                    Blood Finder
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={registrationHandler}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <div className="relative">
                                    <input
                                        type={passwordShown ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        required />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                        style={{ outline: 'none' }}
                                    >
                                        <FontAwesomeIcon
                                            icon={passwordShown ? faEyeSlash : faEye}
                                            className="text-gray-700 dark:text-gray-200"
                                        />

                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <div className="relative">
                                    <input
                                        type={confirmPasswordShown ? "text" : "password"}
                                        name="confirm-password"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                        style={{ outline: 'none' }}
                                    >
                                        <FontAwesomeIcon
                                            icon={passwordShown ? faEyeSlash : faEye}
                                            className="text-gray-700 dark:text-gray-200"
                                        />

                                    </button>
                                </div>
                            </div>
                            <div className="flex items-start">

                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            {regError && <p className="text-sm text-red-500">{regError}</p>}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reg