import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { isExpiringSoon } from '../utils/utils'

function BloodFinder() {
    const [homeClinic, setHomeClinic] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [productType, setProductType] = useState('');
    const [matchingBlood, setMatchingBlood] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const { userRole } = useAuth();

    const searchBlood = (e) => {
        e.preventDefault();
        axios
            .get(`http://localhost:8000/api/inventory/search/${homeClinic}/${bloodType}/${productType}`, { withCredentials: true })
            .then((res) => {
                const filteredBlood = res.data.filter((blood) => !blood.isDeleted);
                setMatchingBlood(filteredBlood);
            })
            .catch((err) => console.log(err));

    };

    const parseUnitSize = (unitSize) => {
        const numericPart = parseFloat(unitSize);
        return isNaN(numericPart) ? 0 : numericPart;
    };

    const calculateTotalVolume = (bloodBags) => {
        let totalVolume = 0;
        for (const bag of bloodBags) {
            totalVolume += parseUnitSize(bag.unitSize);
        }
        return totalVolume;
    };

    return (

        <div className="text-center">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full">
                                <form onSubmit={searchBlood}>
                                    <div>
                                        <label htmlFor="homeClinic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Home Clinic:</label>
                                        <select id="homeClinic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={homeClinic}
                                            onChange={(e) => setHomeClinic(e.target.value)}>
                                            <option value="">Select Home Clinic</option>
                                            <option value="Concord">Concord</option>
                                            <option value="Campbell">Campbell</option>
                                            <option value="Dublin">Dublin</option>
                                            <option value="Redwood City">Redwood City</option>
                                            <option value="San Francisco">San Francisco</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="productType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Type:</label>
                                        <select id="productType"
                                            value={productType}
                                            onChange={(e) => setProductType(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value="">Select Product Type</option>
                                            <option value="pRBC">pRBCs</option>
                                            <option value="FFP">FFP</option>
                                            <option value="FP">FP</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="bloodType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood Type:</label>
                                        <select id="bloodType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={bloodType}
                                            onChange={(e) => setBloodType(e.target.value)}>

                                            <option value="">Select Blood Type</option>
                                            <option value="DEA 1.1 Positive">DEA 1.1 Positive</option>
                                            <option value="DEA 1.1 Negative">DEA 1.1 Negative</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="AB">AB</option>
                                        </select>
                                    </div>
                                    <div className="mt-8">
                                        <button type="button" onClick={searchBlood} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                    </div>
                                </form>
                                <div>

                                    <h2 className="text-gray-700 dark:text-white">Inventory</h2>
                                    <p className="text-xs text-gray-700 dark:text-white">Total Volume: {calculateTotalVolume(matchingBlood)} mL</p>
                                    {matchingBlood.length > 0 ? (
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4 text-center">
                                                        Donor ID
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-center">
                                                        Unit Size
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-center">
                                                        Expiration Date
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-center">
                                                        Availability
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-center">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {matchingBlood.map((blood) => {
                                                    const expiringSoon = isExpiringSoon(blood.expirationDate);
                                                    return (
                                                        <tr className="table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                            onClick={() => navigate(`/inventory/${blood._id}`)}
                                                            key={blood._id}>
                                                            <td className="px-6 py-4 text-center">{blood.donorID}</td>
                                                            <td className="px-6 py-4 text-center">{blood.unitSize}</td>
                                                            <td className={expiringSoon ? "px-4 py-3 highlight text-center" : "px-4 py-3 text-center"}>
                                                                {new Date(blood.expirationDate).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                })}
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                {blood.onHold ? (
                                                                    <span style={{ color: '#FFC107' }}>On Hold</span>
                                                                ) : (
                                                                    <span style={{ color: '#A9C27E' }}>Available</span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <button type="button" onClick={() => navigate(`/inventory/${blood._id}/consume`)}
                                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                    Consume
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No blood of that type on hand.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BloodFinder;
