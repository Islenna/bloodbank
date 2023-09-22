import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PetEdit = () => {
    const [pet, setPet] = useState({});
    const [owner, setOwner] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pets/${id}`, { withCredentials: true })
            .then((res) => {
                setPet(res.data);
                return axios.get(`http://localhost:8000/api/owners/${res.data.owner}`, { withCredentials: true });
            })
            .then((res) => {
                setOwner(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();

        // Perform validation based on petType and bloodType
        if (
            (pet.petType === 'dog' || pet.petType === 'canine') &&
            (pet.bloodType !== 'DEA 1.1 Positive' && pet.bloodType !== 'DEA 1.1 Negative')
        ) {
            console.log('Invalid bloodType for the selected petType');
            return;
        } else if (
            (pet.petType === 'cat' || pet.petType === 'feline') &&
            (pet.bloodType !== 'A' && pet.bloodType !== 'B' && pet.bloodType !== 'AB')
        ) {
            console.log('Invalid bloodType for the selected petType');
            return;
        }

        axios
            .put(`http://localhost:8000/api/pets/${id}`, pet, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate(`/pets/${id}`);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setPet({ ...pet, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div>
                <div className="text-center">
                    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                        <h1>Edit {pet.petName}'s Information</h1>
                        <form onSubmit={submitHandler}>
                            <div className="mb-6">
                                <label htmlFor="petName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pet Name:</label>
                                <input
                                    type="text"
                                    id="petName"
                                    name="petName"
                                    value={pet.petName || ''}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="petType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pet Type:</label>
                                <select
                                    id="petType"
                                    name="petType"
                                    value={pet.petType}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Select a pet type</option>
                                    <option value="dog">Canine</option>
                                    <option value="cat">Feline</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="bloodType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood Type:</label>
                                <select
                                    id="bloodType"
                                    name="bloodType"
                                    value={pet.bloodType || ''}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Select a blood type</option>
                                    {pet.petType === 'dog' || pet.petType === 'canine' ? (
                                        <>
                                            <option value="DEA 1.1 Positive">DEA 1.1 Positive</option>
                                            <option value="DEA 1.1 Negative">DEA 1.1 Negative</option>
                                        </>
                                    ) : pet.petType === 'cat' || pet.petType === 'feline' ? (
                                        <>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="AB">AB</option>
                                        </>
                                    ) : null}
                                </select>

                                <div className="mb-6">
                                    <label htmlFor="lastDonated" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Donated:</label>
                                    <input
                                        type="date"
                                        id="lastDonated"
                                        name="lastDonated"
                                        value={pet.lastDonated || ''}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="labworkStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Labwork Status:</label>
                                    <select
                                        id="petType"
                                        name="labworkStatus"
                                        value={pet.labworkStatus || ''}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Select a labwork status</option>
                                        <option value="Incomplete">Incomplete</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="dateLabworkCompleted" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Labwork Completed:</label>
                                    <input
                                        type="date"
                                        id="dateLabworkCompleted"
                                        name="dateLabworkCompleted"
                                        value={pet.dateLabworkCompleted || ''}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>

                            </div>
                            <div className="mb-6">
                                <label htmlFor="petDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description / Breed:</label>
                                <input
                                    type="text"
                                    id="petDescription"
                                    name="petDescription"
                                    value={pet.petDescription || ''}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                        </form>
                    </section>
                    <Link to={`/owners/${owner._id}`} style={{ color: 'white', textDecoration: 'none' }}>Back</Link>
                </div>

            </div>
        </div>
    );
};

export default PetEdit;
