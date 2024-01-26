import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FilterButton from './FilterButton/FilterButton';
import { isExpiringSoon } from '../../utils/utils';
import { debounce } from '../../utils/debounce';


function InventoryList() {
    const [inventory, setInventory] = useState([]);
    const navigate = useNavigate();
    const navigateToItem = (id) => {
        navigate(`/inventory/${id}`);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        homeClinic: "",
        productType: "",
    });


    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(filteredInventory.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    //Filtering

    const debouncedApplyFilters = debounce(() => {
        applyFilters();
    }, 300);

    const handleFilterChange = (newFilters) => {
        setSelectedFilters(newFilters);
        debouncedApplyFilters();
    };
    const matchesFilter = (item, filterTerm, property) => {
        return filterTerm ? item[property].toString().toLowerCase().includes(filterTerm.toLowerCase()) : true;
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedApplyFilters();
    };
    
    const applyFilters = () => {
        const result = inventory.filter(item => {
            // If searchTerm is empty, it should not filter out anything
            const searchTermCondition = searchTerm
                ? item.productType.toLowerCase().includes(searchTerm.toLowerCase())
                : true;

            // Apply other filter conditions
            return matchesFilter(item, selectedFilters.homeClinic, 'homeClinic') &&
                // ... other filter conditions
                searchTermCondition;
        });
        console.log('Inventory:', inventory);
        console.log('Filtered Inventory:', filteredInventory);
        console.log('Search Term:', searchTerm);
        console.log('Selected Filters:', selectedFilters);
        

        setFilteredInventory(result);
    };


    useEffect(() => {
        axios.get('http://localhost:8000/api/inventory/active', { withCredentials: true })
            .then((res) => {
                setInventory(res.data);
                setFilteredInventory(res.data); // Set filtered inventory to the full list initially
            })
            .catch((err) => {
                console.error('Error fetching inventory data:', err);
            });
    }, []);

    useEffect(() => {
        applyFilters();
    }, [selectedFilters]);


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
                                        <input
                                            type="text"
                                            id="simple-search"
                                            onChange={handleSearchChange}
                                            value={searchTerm}
                                            className="focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Search"
                                            required=""
                                        />
                                    </div>
                                </form>
                            </div>
                            <FilterButton onFilterChange={handleFilterChange} />
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button onClick={() => navigate(`/inventory/new`)} type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add product
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Product Type</th>
                                        <th scope="col" className="px-4 py-3">Donor ID</th>
                                        <th scope="col" className="px-4 py-3">Date Ordered</th>
                                        <th scope="col" className="px-4 py-3">Date Received</th>
                                        <th scope="col" className="px-4 py-3">Unit Size</th>
                                        <th scope="col" className="px-4 py-3">Vendor</th>
                                        <th scope="col" className="px-4 py-3">Expiration Date</th>
                                        <th scope="col" className="px-4 py-3">Blood Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 ? null : <tr><td className="px-4 py-3">No inventory items found.</td></tr>}
                                    {currentItems.map((item) => {
                                        const expiringSoon = isExpiringSoon(item.expirationDate);
                                        const formattedDateOrdered = new Date(item.dateOrdered).toLocaleDateString('en-US', {
                                            month: 'numeric',
                                            day: 'numeric',
                                            year: 'numeric'
                                        });
                                        const formattedDateReceived = new Date(item.dateReceived).toLocaleDateString('en-US', {
                                            month: 'numeric',
                                            day: 'numeric',
                                            year: 'numeric'
                                        });
                                        const onHoldClass = item.onHold ? "text-yellow-500" : "text-green-500";


                                        return (
                                            <tr key={item._id} className="table-row border-b dark:border-gray-700"
                                                onClick={() => navigate(`/inventory/${item._id}`)}>
                                                <td className="px-4 py-3">{item.productType}</td>
                                                <td className={`px-4 py-3 ${onHoldClass}`}>{item.donorID}</td>
                                                <td className="px-4 py-3">{formattedDateOrdered}</td>
                                                <td className="px-4 py-3">{formattedDateReceived}</td>
                                                <td className="px-4 py-3">{item.unitSize}</td>
                                                <td className="px-4 py-3">{item.bloodSource}</td>
                                                <td className={expiringSoon ? "px-4 py-3 highlight" : "px-4 py-3"}>
                                                    {new Date(item.expirationDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                    })}
                                                </td>
                                                <td className="px-4 py-3">{item.bloodType}</td>

                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white"> {indexOfFirstItem + 1}-{indexOfLastItem} </span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white"> {filteredInventory.length} </span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        console.log(currentItems)

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

export default InventoryList;
