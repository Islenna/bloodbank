import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function InventoryEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        donorID: '',
        bloodSource: '',
        unitSize: '',
        bloodType: '',
        expirationDate: '',
        crossmatchHistory: '',
        homeClinic: '',
        onHold: false,
        productType: '',
    });

    useEffect(() => {
        // get the information of the inventory item
        axios
            .get(`http://localhost:8000/api/inventory/${id}`, { withCredentials: true })
            .then((res) => {
                const existingData = res.data;
                setFormData({
                    donorID: existingData.donorID,
                    bloodSource: existingData.bloodSource,
                    unitSize: existingData.unitSize,
                    bloodType: existingData.bloodType,
                    expirationDate: existingData.expirationDate,
                    crossmatchHistory: existingData.crossmatchHistory,
                    homeClinic: existingData.homeClinic,
                    onHold: existingData.onHold,
                    productType: existingData.productType,
                });
            })
            .catch((err) => {
                console.log('Error:', err);
            });
    }, [id]);

    const updateInventory = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/inventory/notes/${id}`, formData, { withCredentials: true })
            .then((res) => {
                console.log('Response:', res);
                navigate(`/inventory/${id}`);
            })
            .catch((err) => {
                console.log('Error:', err);
            });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:8000/api/inventory/${id}`, { withCredentials: true })
            .then((res) => {
                console.log('Response:', res);
                navigate('/inventory');
            })
            .catch((err) => {
                console.log('Error:', err);
            });
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <h1 className="mb-2 text-2xl font-bold">Donor: {formData.donorID}</h1>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-6">
                <h2 className="mb-4 text-lg">Donor Source: {formData.bloodSource}</h2>
                <h2 className="mb-4 text-lg">Product Type: {formData.productType}</h2>
                <form onSubmit={updateInventory} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="homeClinic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Blood Location:
                        </label>
                        <select
                            id="homeClinic"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formData.homeClinic}
                            onChange={(e) => {
                                setFormData({ ...formData, homeClinic: e.target.value });
                                console.log('Selected Home Clinic:', e.target.value);
                            }}
                        >
                            <option value="">Bag Location</option>
                            <option value="Concord">Concord</option>
                            <option value="Campbell">Campbell</option>
                            <option value="Dublin">Dublin</option>
                            <option value="Redwood City">Redwood City</option>
                            <option value="San Francisco">San Francisco</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="onHold" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            On Hold:
                        </label>
                        <select
                            id="onHold"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formData.onHold}
                            onChange={(e) => {
                                setFormData({ ...formData, onHold: e.target.value });
                                console.log('Selected On Hold:', e.target.value);
                            }}
                        >
                            <option value="">On Hold</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="crossmatchHistory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Crossmatch History:
                        </label>
                        <textarea
                            id="crossmatchHistory"
                            rows={3}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formData.crossmatchHistory}
                            onChange={(e) => setFormData({ ...formData, crossmatchHistory: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:focus:ring-red-900"
                    >
                        Update Inventory
                    </button>
                    <button
                        type="submit"
                        onClick= {handleDelete}
                        className="text-white bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:focus:ring-red-900"
                    >
                        Delete Inventory
                    </button>
                    <h3>Only delete inventory that was entered incorrectly.</h3>
                </form>
            </div>
        </div>
    );
}
