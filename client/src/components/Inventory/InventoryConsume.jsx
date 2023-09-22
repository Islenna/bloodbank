import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function InventoryConsume({ totalVolume }) {
    const { id } = useParams();
    const [consumeType, setConsumeType] = useState('');
    const [patientID, setPatientID] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [itemData, setItemData] = useState(null);
    const [transferredTo, setTransferredTo] = useState('');
    const [transferredBy, setTransferredBy] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => { // validate the form
        const errors = {};
        if (!consumeType) {
            errors.consumeType = 'Consumption Type is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    useEffect(() => { // get the information of the inventory item
        axios
            .get(`http://localhost:8000/api/inventory/${id}`, { withCredentials: true })
            .then((res) => {
                setItemData(res.data);
            })
            .catch((err) => {
                console.error('Error fetching item data:', err);
            });
    }, [id]);

    const handleConsume = (e) => { // handle the consumption
        e.preventDefault();
        if (!validateForm()) { // validate the form
            return;
        }
        if (!itemData) { // check if item data is available
            console.error('Item data not available.');
            return;
        }

        const consumptionData = {
            consumptionType: consumeType,
            patientID: patientID,
            patientName: patientName,
            patientLastName: patientLastName,
            transferredTo: transferredTo,
            transferredBy: transferredBy,
        };
        console.log('Data to be sent:', consumptionData);// log the data to be sent
        axios
            .put(`http://localhost:8000/api/inventory/consume/${id}`, consumptionData, { withCredentials: true })
            .then((res) => {
                setItemData(res.data);
                console.log('Item consumed successfully:', res.data);
                navigate('/bloodfinder');
            })
            .catch((err) => {
                console.error('Error consuming item:', err);
            });
    };

    return (
        <div className="text-center">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1>Consume Blood</h1>

                <div className="flex justify-center items-center space-y-4">
                    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="space-y-4">
                            <div className="text-xl font-semibold">Inventory Information</div>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <span className="font-semibold">Donor ID:</span> {itemData?.donorID}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Blood Source:</span> {itemData?.bloodSource}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Unit Size:</span> {itemData?.unitSize}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Home Clinic:</span> {itemData?.homeClinic}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Blood Type:</span> {itemData?.bloodType}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Expiration Date:</span> {new Date(itemData?.expirationDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                    })}
                                </p>

                                <p className="text-sm">
                                    <span className="font-semibold">Total Volume:</span> {itemData?.unitSize}
                                </p>
                            </div>
                            <label for="consumeType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Consumption Type:</label>
                            <label htmlFor="consumeType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Consumption Type:
                            </label>
                            <select
                                id="consumeType"
                                value={consumeType}
                                onChange={(e) => setConsumeType(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Select Consumption Type</option>
                                <option value="Successfully Transfused">Successfully Transfused</option>
                                <option value="Expired">Expired</option>
                                <option value="Wasted">Wasted</option>
                                <option value="Transferred">Transferred</option>
                            </select>

                            {consumeType === 'Successfully Transfused' && (
                                <div>
                                    <div className="mb-6">
                                        <label htmlFor="patientID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Patient ID:
                                        </label>
                                        <input
                                            type="text"
                                            value={patientID}
                                            onChange={(e) => setPatientID(e.target.value)}
                                            id="default-input"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="patientName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Patient Name:
                                        </label>
                                        <input
                                            type="text"
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                            id="patientName"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="patientLastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Patient Last Name:
                                        </label>
                                        <input
                                            type="text"
                                            value={patientLastName}
                                            onChange={(e) => setPatientLastName(e.target.value)}
                                            id="patientLastName"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {consumeType === 'Transferred' && (
                                <div>
                                    <select
                                        id="transferredTo"
                                        value={transferredTo}
                                        onChange={(e) => setTransferredTo(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">Select Receiving Hospital</option>
                                        <option value="Concord">Concord</option>
                                        <option value="Campbell">Campbell</option>
                                        <option value="Dublin">Dublin</option>
                                        <option value="Redwood City">Redwood City</option>
                                        <option value="San Francisco">San Francisco</option>
                                    </select>
                                    <div className="mb-6">
                                        <label htmlFor="patientID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Transferred By:
                                        </label>
                                        <input
                                            type="text"
                                            value={transferredBy}
                                            onChange={(e) => setTransferredBy(e.target.value)}
                                            id="default-input"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button type="button" onClick={handleConsume} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Consume</button>
            </section >

        </div >
    );
}
