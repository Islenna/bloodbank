import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PetForm = () => {
    const [ownerFirstName, setOwnerFirstName] = useState('');
    const [ownerLastName, setOwnerLastName] = useState('');
    const [ownerID, setOwnerID] = useState('');
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [petDescription, setPetDescription] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/owners/${id}`, { withCredentials: true })
            .then((res) => {
                setOwnerFirstName(res.data.firstName);
                setOwnerLastName(res.data.lastName);
                setOwnerID(res.data._id);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const createPet = (e) => {
        e.preventDefault();

        // Perform validation based on petType and bloodType
        if (
            (petType === 'dog' || petType === 'canine') &&
            (bloodType !== 'DEA 1.1 Positive' && bloodType !== 'DEA 1.1 Negative')
        ) {
            setValidationError('Invalid bloodType for the selected petType');
            return;
        } else if (
            (petType === 'cat' || petType === 'feline') &&
            (bloodType !== 'A' && bloodType !== 'B' && bloodType !== 'AB')
        ) {
            setValidationError('Invalid bloodType for the selected petType');
            return;
        }

        axios
            .post(`http://localhost:8000/api/pets`, {
                petName,
                petType,
                petDescription,
                owner: ownerID,
                bloodType,
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

                    <form onSubmit={createPet}>

                        <div className="mb-6">
                            <label htmlFor="petName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pet Name:</label>
                            <input type="text" id="petName"
                                value={petName}
                                onChange={(e) => setPetName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <label htmlFor="species" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Species:</label>
                        <select id="species"
                            value={petType}
                            onChange={(e) => setPetType(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="default">Select an option</option>
                            <option value="Dog">Canine</option>
                            <option value="Cat">Feline</option>
                        </select>

                        <div className="mb-6">
                            <label htmlFor="petDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pet Breed or Description:</label>
                            <input type="text" id="petDescription"
                                value={petDescription}
                                onChange={(e) => setPetDescription(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        {petType && (
                            <div>

                                <label htmlFor="bloodType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Blood Type:</label>
                                <select id="bloodType"
                                    value={bloodType}
                                    onChange={(e) => setBloodType(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Select a blood type</option>
                                    {petType === 'Dog' || petType === 'Canine' ? (
                                        <>
                                            <option value="DEA 1.1 Positive">DEA 1.1 Positive</option>
                                            <option value="DEA 1.1 Negative">DEA 1.1 Negative</option>
                                        </>
                                    ) : petType === 'Cat' || petType === 'Feline' ? (
                                        <>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="AB">AB</option>
                                        </>
                                    ) : null}
                                </select>
                            </div>
                        )}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>

                    </form>
                </section>
            </div>
        </div>
    );
};

export default PetForm;
