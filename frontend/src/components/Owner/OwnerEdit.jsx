import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [homeClinic, setHomeClinic] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phoneNumber);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/owners/${id}`, { withCredentials: true })
            .then((res) => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setPhoneNumber(res.data.phoneNumber);
                setEmail(res.data.email);
                setHomeClinic(res.data.homeClinic)
            })
            .catch((err) => console.log(err));
    }, [id]);

    const updateOwner = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setPhoneNumberError('Invalid phone number');
            return;
        }

        axios
            .put(`http://localhost:8000/api/owners/${id}`, {
                firstName,
                lastName,
                phoneNumber,
                email,
                homeClinic
            }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate(`/owners/${id}`);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="text-center">
                <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                    <h1>Update an Owner</h1>
                    <form onSubmit={updateOwner}>
                        <div className="mb-6">
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name:</label>
                            <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number:</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {phoneNumberError && <div className="text-danger">{phoneNumberError}</div>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {emailError && <div className="text-danger">{emailError}</div>}
                        </div>

                        <label htmlFor="homeClinic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Home Clinic:</label>
                        <select id="homeClinic" value={homeClinic} onChange={(e) => setHomeClinic(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Please select your home clinic.</option>
                            <option value="Concord">Concord</option>
                            <option value="Campbell">Campbell</option>
                            <option value="Dublin">Dublin</option>
                            <option value="Redwood City">Redwood City</option>
                            <option value="San Francisco">San Francisco</option>
                        </select>

                        <div className="mt-6">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                            <Link to={`/owners`} className="text-blue-600 hover:text-blue-700 ml-3 dark:text-blue-400">Back</Link>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Update;
