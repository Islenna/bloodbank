import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FilterButton from '../Inventory/FilterButton/FilterButton';

function ConsumedList() {

    const [consumedInventory, setConsumedInventory] = useState([]);
    const [searchedClinic, setSearchedClinic] = useState('');
    const [filteredConsumedInventory, setFilteredConsumedInventory] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [selectedFilters, setSelectedFilters] = useState({
        homeClinic: '',
        productType: '',
        consumptionType: '',
        // other filters if needed...
    });
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/consumed', { withCredentials: true })
            .then((res) => {
                setConsumedInventory(res.data);
            })
            .catch((error) => {
                console.error('Error fetching consumed data:', error);
            });
    }, []);

    useEffect(() => {
        applyFilters();
    }, [selectedFilters, consumedInventory]); // Apply filters when selectedFilters or consumedInventory changes

    const applyFilters = () => {
        const result = consumedInventory.filter(item => {
            const homeClinicCondition = selectedFilters.homeClinic ? item.homeClinic.toLowerCase().includes(selectedFilters.homeClinic.toLowerCase()) : true;
            const productTypeCondition = selectedFilters.productType ? item.productType.toLowerCase().includes(selectedFilters.productType.toLowerCase()) : true;
            const consumptionType = selectedFilters.consumptionType ? item.consumptionType.toLowerCase().includes(selectedFilters.consumptionType.toLowerCase()) : true;
            return homeClinicCondition && productTypeCondition && consumptionType; // ... && other conditions
        });

        setFilteredConsumedInventory(result);
    }


    const handleFilterChange = (newFilters) => {
        setSelectedFilters(newFilters);
        applyFilters();
    };
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredConsumedInventory.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(filteredConsumedInventory.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (

        <div className="text-center">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="text" id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                                    </div>
                                </form>
                            </div>
                            <FilterButton onFilterChange={handleFilterChange} />
                        </div>
                        <div className="overflow-x-auto">
                            {Array.isArray(filteredConsumedInventory) && filteredConsumedInventory.length > 0 ? (

                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Product Type</th>
                                            <th scope="col" className="px-4 py-3">Location</th>
                                            <th scope="col" className="px-4 py-3">Unit Size</th>
                                            <th scope="col" className="px-4 py-3">Vendor</th>
                                            <th scope="col" className="px-4 py-3">Consumption Type:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredConsumedInventory.length > 0 ? null : <tr><td className="px-4 py-3">No inventory items found.</td></tr>}
                                        {filteredConsumedInventory.map((item) => (
                                            <tr key={item._id} className="table-row border-b dark:border-gray-700"
                                                onClick={() => navigate(`/consumed/${item._id}`)}>
                                                {error && <p className="text-red-500">Error loading data: {error}</p>}
                                                <td className="px-4 py-3">{item.productType}</td>
                                                <td className="px-4 py-3">{item.homeClinic}</td>
                                                <td className="px-4 py-3">{item.unitSize}</td>
                                                <td className="px-4 py-3">{item.bloodSource}</td>
                                                <td className="px-4 py-3">{item.consumptionType}</td>
                                                <td className="px-4 py-3 flex items-center justify-end">
                                                    <button
                                                        id={`${item.productName}-dropdown-button`}
                                                        data-dropdown-toggle={`${item.productName}-dropdown`}
                                                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                        type="button"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            aria-hidden="true"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                        </svg>
                                                    </button>
                                                    <div
                                                        id={`${item.productName}-dropdown`}
                                                        className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                    >
                                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`${item.productName}-dropdown-button`}>
                                                            <li>
                                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                    Show
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                    Edit
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <div className="py-1">
                                                            <a
                                                                href="#"
                                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                Delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No consumed inventory data available.</p>
                            )}
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white"> {indexOfFirstItem + 1}-{indexOfLastItem} </span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white"> {filteredConsumedInventory.length} </span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                                    }} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                {pageNumbers.map(number => (
                                    <li key={number}>
                                        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(number); }} className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{number}</a>
                                    </li>
                                ))}
                                <li>
                                    <a href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage < pageNumbers.length) setCurrentPage(currentPage + 1);
                                        }}
                                        className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default ConsumedList;
