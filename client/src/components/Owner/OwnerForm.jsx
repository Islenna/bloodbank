import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const OwnerForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [homeClinic, setHomeClinic] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phoneNumber);
    };

    const validateForm = () => {
        const errors = {};

        if (!firstName.trim()) {
            errors.firstName = 'First Name is required';
        }

        if (!lastName.trim()) {
            errors.lastName = 'Last Name is required';
        }

        if (!validateEmail(email)) {
            errors.email = 'Invalid email address';
        }

        if (!validatePhoneNumber(phoneNumber)) {
            errors.phoneNumber = 'Invalid phone number';
        }

        if (!homeClinic) {
            errors.homeClinic = 'Home Clinic is required';
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        axios
            .post('http://localhost:8000/api/owners', {
                firstName,
                lastName,
                phoneNumber,
                email,
                homeClinic,
            }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/owners');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="text-center">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1 className="text-2xl font-bold mb-4">Owner Form</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-6">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter first name"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {formErrors.firstName && (
                            <p className="text-red-500">{formErrors.firstName}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter last name"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {formErrors.lastName && (
                            <p className="text-red-500">{formErrors.lastName}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {formErrors.phoneNumber && (
                            <p className="text-red-500">{formErrors.phoneNumber}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {formErrors.email && (
                            <p className="text-red-500">{formErrors.email}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="homeClinic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Home Clinic:</label>
                        <select
                            id="homeClinic"
                            name="homeClinic"
                            value={homeClinic}
                            onChange={(e) => setHomeClinic(e.target.value)}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Please select your home clinic.</option>
                            <option value="Concord">Concord</option>
                            <option value="Campbell">Campbell</option>
                            <option value="Dublin">Dublin</option>
                            <option value="Redwood City">Redwood City</option>
                            <option value="San Francisco">San Francisco</option>
                        </select>
                        {formErrors.homeClinic && (
                            <p className="text-red-500">{formErrors.homeClinic}</p>
                        )}
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submit
                    </button>

                    <Link to={`/owners`} className="block mt-4 text-blue-500 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                        Back
                    </Link>
                </form>
            </section>
        </div>
    );
};

export default OwnerForm;
