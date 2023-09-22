import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function OwnerCard() {
    const [owner, setOwner] = useState({});
    const [pets, setPets] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const deleteOwner = (ownerId) => {
        axios
            .delete(`http://localhost:8000/api/pets/owner/${ownerId}`, { withCredentials: true })
            .then(() => {
                axios
                    .delete(`http://localhost:8000/api/owners/${ownerId}`, { withCredentials: true })
                    .then((res) => {
                        console.log(res.data);
                        setOwner((prevOwners) =>
                            prevOwners.filter((owner) => owner._id !== ownerId)
                        );
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    const deletePet = (petId) => {
        axios
            .delete(`http://localhost:8000/api/pets/${petId}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/owners/${id}`, { withCredentials: true })
            .then((res) => {
                setOwner(res.data);
            })
            .catch((err) => console.log(err));

        axios
            .get(`http://localhost:8000/api/owners/${id}/pets`, { withCredentials: true })
            .then((res) => {
                setPets(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="text-center p-4">
                <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
                    {owner.firstName} {owner.lastName}'s Information
                </h1>
                <div
                    className="mt-4 p-4 bg-gray-600 text-white"
                >
                    <div>
                        <p>First Name: {owner.firstName}</p>
                        <p>Last Name: {owner.lastName}</p>
                        <p>Phone Number: {owner.phoneNumber}</p>
                        <p>Email: {owner.email}</p>
                        <p>Home Clinic: {owner.homeClinic}</p>
                        <p>Pets:</p>

                        <table className="table-auto w-3/4 mx-auto bg-gray-600 rounded">
                            <thead className="">
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Species</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pets.map((pet) => (
                                    <tr key={pet._id} className="text-center">
                                        <td className="border px-4 py-2">{pet.petName}</td>
                                        <td className="border px-4 py-2">{pet.petType}</td>
                                        <td className="border px-4 py-2 flex justify-center space-x-2">
                                            <button onClick={() => navigate(`/pets/${pet._id}`)} className="px-4 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 focus:ring-2 focus:ring-green-500">
                                                View
                                            </button>
                                            <button onClick={() => deletePet(pet._id)} className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <button onClick={() => navigate(`/owners/edit/${id}`)} className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
                        Edit
                    </button>
                    <button onClick={() => navigate(`/owners`)} className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 focus:ring-2 focus:ring-green-500">
                        Back
                    </button>
                    <button onClick={() => navigate(`/pets/new/${id}`)} className="px-4 py-2 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500">
                        Add Pet
                    </button>
                    {pets.length === 0 && (
                        <button onClick={() => deleteOwner(id)} className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                            Delete Owner
                        </button>
                    )}
                </div>
            </div>
        </div>
    </section>
);
}
