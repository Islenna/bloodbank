import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function InventoryCard() {
    const [inventory, setInventory] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const donorID = inventory.donorID;
    const bloodSource = inventory.bloodSource;
    const unitSize = inventory.unitSize;
    const homeClinic = inventory.homeClinic;
    const bloodType = inventory.bloodType;
    const expirationDate = inventory.expirationDate;
    const crossmatchHistory = inventory.crossmatchHistory;
    const productType = inventory.productType;
    const onHold = inventory.onHold;

    useEffect(() => {
        // get the information of the inventory item
        axios
            .get(`http://localhost:8000/api/inventory/${id}`, { withCredentials: true })
            .then((res) => {
                setInventory(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const changeOnHold = () => {
        axios
            .put(
                `http://localhost:8000/api/inventory/${id}`,
                { onHold: !onHold },
                { withCredentials: true }
            )
            .then((res) => {
                setInventory(res.data);
            })
            .catch((err) => console.log(err));
    };






    return (
        <div className="space-y-4">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1 className="mb-2 text-2xl text-black dark:text-white font-bold">Donor {donorID} Information</h1>
                <h2 className="mb-4 text-lg text-gray-500">Click to Edit</h2>
                <div className="flex justify-center items-center space-y-4">
                    <div
                        onClick={() => navigate(`/inventory/edit/${id}`)}
                        className="w-full p-6 mb-8 bg-white border text-black border-gray-200 rounded-lg shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"c
                    >
                        <div className="space-y-4">
                            <div className="text-xl font-semibold">Inventory Information</div>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <span className="font-semibold">Donor ID:</span> {donorID}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Blood Source:</span> {bloodSource}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Unit Size:</span> {unitSize}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Home Clinic:</span> {homeClinic}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Blood Type:</span> {bloodType}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold mb-3">Product Type:</span> {productType}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Expiration Date:</span>{' '}
                                    {new Date(expirationDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                    })}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Crossmatch History:</span> {crossmatchHistory}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">On Hold status:</span>{' '}
                                    {inventory.onHold ? (
                                        <span className="text-yellow-500">On Hold</span>
                                    ) : (
                                        <span className="text-green-500">Not On Hold</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => navigate(`/inventory/${id}/consume`)}
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Consume
                </button>
                <button
                    type="button"
                    onClick={() => changeOnHold()}
                    className="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                >
                    {inventory.onHold ? 'Remove Hold' : 'Put On Hold'}
                </button>

            </section>
        </div>
    );
}

export default InventoryCard;