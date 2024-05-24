import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Card({ cardConfig }) {
    const [data, setData] = useState({});
    const [pets, setPets] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${cardConfig.apiEndpoint}/${id}`, { withCredentials: true })
            .then((res) => {
                setData(res.data);
                if (cardConfig.type === 'owner') {
                    fetchPets(res.data.pets);
                }
            })
            .catch((err) => console.log(err));
    }, [cardConfig.apiEndpoint, id]);

    const fetchPets = (petIds) => {
        if (petIds && petIds.length > 0) {
            axios
                .get(`http://localhost:8000/api/pets`, { params: { ids: petIds.join(',') }, withCredentials: true })
                .then((res) => {
                    setPets(res.data);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleDelete = () => {
        axios
            .delete(`${cardConfig.apiEndpoint}/${id}`, { withCredentials: true })
            .then(() => {
                navigate(`/${cardConfig.type}`);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="space-y-4">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1 className="mb-2 text-2xl text-black dark:text-white font-bold">{cardConfig.title} {data[cardConfig.identifierField]}</h1>
                <h2 className="mb-4 text-lg text-gray-500">Click to Edit</h2>
                <div className="flex justify-center items-center space-y-4">
                    <div
                        onClick={() => navigate(`${cardConfig.editPath}/${id}`)}
                        className="w-full p-6 mb-8 bg-white border text-black border-gray-200 rounded-lg shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                        <div className="space-y-4">
                            <div className="text-xl font-semibold">{cardConfig.title} Information</div>
                            <div className="space-y-2">
                                {cardConfig.fields.map((field) => (
                                    <p className="text-sm" key={field.name}>
                                        <span className="font-semibold">{field.label}:</span> {field.format ? field.format(data[field.name]) : data[field.name]}
                                    </p>
                                ))}
                                {cardConfig.type === 'owner' && (
                                    <div>
                                        <h3 className="text-lg font-semibold">Pets</h3>
                                        {pets.length > 0 ? (
                                            pets.map(pet => (
                                                <p key={pet._id} className="text-sm">
                                                    <span className="font-semibold">{pet.name}</span> - {pet.species}
                                                </p>
                                            ))
                                        ) : (
                                            <p className="text-sm">No pets found</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {cardConfig.type === 'owner' && (
                    <button
                        type="button"
                        onClick={() => navigate(`/pets/new?ownerId=${id}`)}
                        className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Create Pet
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleDelete}
                    className="mr-4 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Delete
                </button>
            </section>
        </div>
    );
}

export default Card;
