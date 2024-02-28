import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ConsumedCard() {
    const [consumed, setConsumed] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const donorID = consumed.donorID;
    const bloodSource = consumed.bloodSource;
    const unitSize = consumed.unitSize;
    const homeClinic = consumed.homeClinic;
    const bloodType = consumed.bloodType;
    const expirationDate = consumed.expirationDate;
    const crossmatchHistory = consumed.crossmatchHistory;
    const consumptionType = consumed.consumptionType;
    const patientID = consumed.patientID;
    const patientName = consumed.patientName;
    const patientLastName = consumed.patientLastName;
    const transferredTo = consumed.transferredTo;
    const transferredBy = consumed.transferredBy;

    useEffect(() => {
        // Get the information of the consumed item
        axios
            .get(`http://localhost:8000/api/consumed/${id}`, { withCredentials: true })
            .then((res) => {
                setConsumed(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const deleteConsumed = () => {
        // Delete the consumed item
        axios
            .delete(`http://localhost:8000/api/consumed/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate(`/inventory/consumed`);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="space-y-4">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1 className="mb-2 text-2xl text-black dark:text-white font-bold">Consumed Information</h1>
                <h2 className="mb-4 text-lg text-gray-500">Click to Edit</h2>
                <div className="flex justify-center items-center space-y-4">
                    <div
                        onClick={() => navigate(`/inventory/edit/${id}`)}
                        className="w-full p-6 mb-8 bg-white border text-black border-gray-200 rounded-lg shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                        <div className="space-y-4">
                            <div className="text-xl font-semibold">Consumed Information</div>
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
                                    <span className="font-semibold">Consumption Type:</span> {consumptionType}
                                </p>
                                {consumed.consumptionType === 'Successfully Transfused' ? (
                                    <>
                                        <p className="text-sm font-semibold">Recipient Information</p>
                                        <p className="text-sm">
                                            <span className="font-semibold">Patient ID:</span> {patientID}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-semibold">Patient Name:</span> {patientName}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-semibold">Patient Last Name:</span> {patientLastName}
                                        </p>
                                    </>
                                ) : null}
                                {consumed.consumptionType === 'Transferred' ? (
                                    <>
                                        <p className="text-sm font-semibold">Transfer Information</p>
                                        <p className="text-sm">
                                            <span className="font-semibold">Transferred To:</span> {transferredTo}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-semibold">Transferred By:</span> {transferredBy}
                                        </p>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={deleteConsumed}
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Delete
                </button>
            </section>
        </div>
    );
}

export default ConsumedCard;
