import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function PetCard() {
    const [pet, setPet] = useState({});
    const [owner, setOwner] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pets/${id}`, { withCredentials: true })
            .then((res) => {
                setPet(res.data);
                const ownerId = res.data.owner._id;
                const homeClinic = res.data.owner.homeClinic;
                axios
                    .get(`http://localhost:8000/api/owners/${ownerId}`, { withCredentials: true })
                    .then((res) => {
                        setOwner(res.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [id]);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="text-center p-4">
                    <h1 className="text-2xl font-medium text-gray-900 dark:text-white">{pet.petName}'s Information</h1>
                    <div
                        className="mt-4 p-4 bg-gray-600 text-white rounded"
                    >
                        <p>Pet Name: {pet.petName}</p>
                        <p>Pet Type: {pet.petType}</p>
                        <p>Description: {pet.petDescription}</p>
                        <p>Blood Type: {pet.bloodType}</p>
                        <p>Home Clinic: {owner.homeClinic}</p>
                        <Link to={`/owners/${owner._id}`} className="text-blue-400 hover:underline">
                            {owner.firstName} {owner.lastName}
                        </Link>
                        <p>Last Donated: {pet.lastDonated && formatDate(pet.lastDonated)}</p>
                        <p>Labwork Status: {pet.labworkStatus}</p>
                        <p>Date Labwork Completed: {pet.dateLabworkCompleted && formatDate(pet.dateLabworkCompleted)}</p>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                        <button onClick={() => navigate(`/pets/edit/${id}`)} className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
                            Edit
                        </button>
                        <button onClick={() => navigate(`/pets/delete/${id}`)} className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                            Delete
                        </button>
                        <button onClick={() => navigate(`/owners`)} className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 focus:ring-2 focus:ring-green-500">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
