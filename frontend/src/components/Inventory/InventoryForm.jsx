import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function InventoryForm() {

    const [donorID, setDonorID] = useState('');
    const [bloodSource, setBloodSource] = useState('');
    const [unitSize, setUnitSize] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [crossmatchHistory, setCrossmatchHistory] = useState('');
    const [validationError, setValidationError] = useState('');
    const [homeClinic, setHomeClinic] = useState('');
    const [productType, setProductType] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const [formErrors, setFormErrors] = useState({
        donorID: '',
        bloodSource: '',
        unitSize: '',
        bloodType: '',
        expirationDate: '',
        crossmatchHistory: '',
        homeClinic: '',
    });

    const validateForm = () => {
        const errors = {};
        if (!donorID) {
            errors.donorID = 'Donor ID is required';
        }
        if (!bloodSource) {
            errors.bloodSource = 'Blood Source is required';
        }
        if (!unitSize) {
            errors.unitSize = 'Unit Size is required';
        }
        if (!bloodType) {
            errors.bloodType = 'Blood Type is required';
        }
        if (!expirationDate) {
            errors.expirationDate = 'Expiration Date is required';
        }
        setFormErrors(errors);

        return Object.values(errors).every((error) => !error);
    };


    const createInventory = (e) => {
        e.preventDefault();
        console.log('Data to be sent:', {
            donorID,
            bloodSource,
            unitSize,
            bloodType,
            expirationDate,
            crossmatchHistory,
            homeClinic,
            productType
        });

        if (!validateForm()) {
            return;
        }

        axios
            .post(`http://localhost:8000/api/inventory`, {
                donorID,
                bloodSource,
                unitSize,
                bloodType,
                expirationDate,
                crossmatchHistory,
                homeClinic,
                productType
            }, { withCredentials: true })
            .then((res) => {
                console.log('Response:', res);
                navigate(`/inventory`);
            })
            .catch((err) => console.log('Error:', err));
    }

    return (
        <div>
            <div className="text-center">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">

                <h1>New Inventory Form</h1>
                <form onSubmit={createInventory}>


                    <label htmlFor="homeClinic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Home Clinic:</label>
                    <select id="homeClinic"
                        value={homeClinic}
                        onChange={(e) => setHomeClinic(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select Home Clinic</option>
                        <option value="Concord">Concord</option>
                        <option value="Campbell">Campbell</option>
                        <option value="Dublin">Dublin</option>
                        <option value="Redwood City">Redwood City</option>
                        <option value="San Francisco">San Francisco</option>
                    </select>

                    <div className="mb-6">
                        <label htmlFor="donorID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Donor ID:</label>
                        <input type="text" id="donorID"
                            value={donorID}
                            onChange={(e) => setDonorID(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formErrors.donorID && <div className="text-danger">{formErrors.donorID}</div>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="bloodSource" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood Source:</label>
                        <input type="text" id="bloodSource"
                            value={bloodSource}
                            onChange={(e) => setBloodSource(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formErrors.bloodSource && <div className="text-danger">{formErrors.bloodSource}</div>}
                    </div>

                    <label htmlFor="productType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Type:</label>
                    <select id="productType"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select a Product Type</option>
                        <option value="pRBC">pRBCs</option>
                        <option value="FFP">FFP</option>
                        <option value="FP">FP</option>
                        <option value="platelets">Platelets</option>
                        <option value="Cryo">Cryoprecipitate</option>
                        <option value="ALB">Albumin</option>
                        <option value="HBOC">HBOC</option>
                    </select>

                    <label htmlFor="unitSize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit Size:</label>
                    <select id="unitSize"
                        value={unitSize}
                        onChange={(e) => setUnitSize(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select a Unit Size</option>
                        <option value="50mL">50mL</option>
                        <option value="125mL">125mL</option>
                        <option value="150mL">150mL</option>
                        <option value="250mL">250mL</option>
                        {formErrors.unitSize && <div className="text-danger">{formErrors.unitSize}</div>}
                    </select>

                    <label htmlFor="bloodType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit Size:</label>
                    <select id="bloodType"
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select a blood type</option>
                        <option value="DEA 1.1 Positive">DEA 1.1 Positive</option>
                        <option value="DEA 1.1 Negative">DEA 1.1 Negative</option>
                        <option value="DEA 4">DEA 4</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        {formErrors.bloodType && <div className="text-danger">{formErrors.bloodType}</div>}
                    </select>

                    <div className="mb-6">
                        <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration Date:</label>
                        <input type="date" value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formErrors.expirationDate && <div className="text-danger">{formErrors.expirationDate}</div>}
                    </div>


                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Crossmatch History:</label>
                    <textarea id="message" value={crossmatchHistory}
                        onChange={(e) => setCrossmatchHistory(e.target.value)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter crossmatch history here."></textarea>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                </form>

            </section>
            </div>
        </div>
    )
}
