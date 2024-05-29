import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Card({ cardConfig, isEditable = true }) {
    const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${cardConfig.apiEndpoint}/${id}`, { withCredentials: true })
            .then((res) => {
                setData(res.data);
                console.log('Fetched data:', res.data);
            })
            .catch((err) => console.log(err));
    }, [cardConfig.apiEndpoint, id]);

    const handleDelete = () => {
        axios
            .delete(`${cardConfig.apiEndpoint}/${id}`, { withCredentials: true })
            .then(() => {
                navigate(`/${cardConfig.type}`);
            })
            .catch((err) => console.log(err));
    };

    const handleEditClick = () => {
        if (isEditable) {
            navigate(`${cardConfig.editPath}/${id}`);
        }
    };

    return (
        <div className="space-y-4">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1 className="mb-2 text-2xl text-black dark:text-white font-bold">{cardConfig.title} {data[cardConfig.identifierField]}</h1>
                <div
                    className={`flex justify-center items-center space-y-4 ${isEditable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''} border border-gray-200 rounded-lg shadow-md p-6 mb-8`}
                    onClick={handleEditClick}
                >
                    <div className="w-full">
                        <div className="space-y-4">
                            <div className="text-xl font-semibold">{cardConfig.title} Information</div>
                            <div className="space-y-2">
                                {cardConfig.fields.map((field) => (
                                    <p className="text-sm" key={field.name}>
                                        <span className="font-semibold">{field.label}:</span> {field.format ? field.format(data[field.name]) : data[field.name]}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {cardConfig.extraContent && typeof cardConfig.extraContent === 'function' && cardConfig.extraContent(data, setData)}
            </section>
            <div className="flex justify-between items-center space-x-4">
                <button
                    type="button"
                    onClick={() => navigate(`${cardConfig.editPath}/${id}`)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Edit {cardConfig.title}
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Delete {cardConfig.title}
                </button>
                <button
                    type="button"
                    onClick={() => navigate(`/${cardConfig.type}`)}
                    className="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                >
                    Back to {cardConfig.type === 'owner' ? 'Donors' : 'Pets'}
                </button>
            </div>
        </div>
    );
}

export default Card;
