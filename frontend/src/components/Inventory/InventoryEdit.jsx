import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function InventoryEditForm() {
    const { id } = useParams();
    const { userRole } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        donorID: '',
        bloodSource: '',
        unitSize: '',
        bloodType: '',
        dateOrdered: '',
        dateReceived: '',
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
                    dateOrdered: existingData.dateOrdered,
                    dateReceived: existingData.dateReceived,
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
                toast.success('Inventory updated successfully!');
            })
            .catch((err) => {
                console.log('Error:', err);
                toast.error('Error updating inventory.');
            });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:8000/api/inventory/${id}`, { withCredentials: true })
            .then((res) => {
                toast.success('Inventory deleted successfully!');
                navigate('/inventory');
            })
            .catch((err) => {
                console.log('Error:', err);
                toast.error('Error deleting inventory.');
            });
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <h1 className="mb-2 text-2xl text-black dark:text-white font-bold">Donor: {formData.donorID}</h1>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-6">
                <h2 className="mb-4 text-lg text-black dark:text-white">Donor Source: {formData.bloodSource}</h2>
                <h2 className="mb-4 text-lg text-black dark:text-white">Product Type: {formData.productType}</h2>
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
                    {(userRole === 'admin' || userRole === 'manager') && (
                        <div>
                            <div className="mb-6">
                                <label htmlFor="dateOrdered" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ordered Date:</label>
                                <input
                                    type="date"
                                    id="dateOrdered"
                                    value={formData.dateOrdered}
                                    onChange={(e) => setFormData({ ...formData, dateOrdered: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="dateReceived" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Received Date:</label>
                                <input
                                    type="date"
                                    id="dateReceived"
                                    value={formData.dateReceived}
                                    onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>
                    )}

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
                    {(userRole === 'admin' || userRole === 'manager') && (
                        <button
                            type="submit"
                            onClick={handleDelete}
                            className="text-white bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:focus:ring-red-900"
                        >
                            Delete Inventory
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
