import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FilterButton from './FilterButton/FilterButton';
import { isExpiringSoon } from '../../utils/utils';
import { debounce } from '../../utils/debounce';
import Search from '../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function InventoryList() {
    const [inventory, setInventory] = useState([]);
    const navigate = useNavigate();
    const { userRole } = useAuth();
    const [sortOrder, setSortOrder] = useState('asc'); // Initial sorting order
    const [sortBy, setSortBy] = useState('expirationDate'); // Initial sorting property
    const navigateToItem = (id) => {
        navigate(`/inventory/${id}`);
    };
    const [sortedInventory, setSortedInventory] = useState([]);


    const [searchTerm, setSearchTerm] = useState("");
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        homeClinic: "",
        productType: "",
    });

    const sortInventory = () => {
        const sortedInventory = [...filteredInventory].sort((a, b) => {
            // Compare expiration dates
            const dateA = new Date(a.expirationDate).getTime();
            const dateB = new Date(b.expirationDate).getTime();

            // Determine the sorting order based on sortOrder
            const result = sortOrder === 'asc' ? dateA - dateB : dateB - dateA;

            return result;
        });

        // Update the sorted inventory state
        setSortedInventory(sortedInventory);
    };



    // Function to handle sorting when a table header is clicked
    const handleSort = (property) => {
        // Toggle sorting order if the same property is clicked again
        if (property === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // If a different property is clicked, set it as the new sorting property and reset the sorting order to ascending
            setSortBy(property);
            setSortOrder('asc');
        }
        sortInventory(); // Call sortInventory function to update sortedInventory
    };

    // Apply Filters with Sorting and Pagination
    const applyFilters = () => {
        // Filter the inventory based on search term and selected filters
        const filteredResult = inventory.filter(item => {
            const searchTermCondition = item.homeClinic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.donorID.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesFilter(item, selectedFilters.homeClinic, 'homeClinic') &&
                matchesFilter(item, selectedFilters.productType, 'productType') &&
                searchTermCondition;
        });

        // Sort the filtered result
        const sortedFilteredResult = [...filteredResult].sort((a, b) => {
            const dateA = new Date(a[sortBy]);
            const dateB = new Date(b[sortBy]);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        // Update the filtered inventory state with sorted result
        setFilteredInventory(sortedFilteredResult);

        // Reset current page to 1 when filters change
        setCurrentPage(1);
    };

    // Pagination
    const [currentPage, setCurrentPage] = useState(1); // Define currentPage state variable
    const itemsPerPage = 10;

    // Calculate pagination parameters based on sorted inventory
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Generate pagination buttons based on sorted inventory
    const pageNumbers = Math.ceil(sortedInventory.length / itemsPerPage);
    const renderPageNumbers = Array.from({ length: pageNumbers }, (_, i) => (
        <button key={i + 1} onClick={() => handlePageClick(i + 1)} className={`flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === i + 1 ? 'font-semibold' : ''}`}>{i + 1}</button>
    ));

    // Handle pagination click
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const debouncedApplyFilters = debounce(() => {
        applyFilters();
    }, 300);


    const handleFilterChange = (newFilters) => {
        setSelectedFilters(newFilters);
        applyFilters(); // Trigger applyFilters function when filters change
    };

    const matchesFilter = (item, filterTerm, property) => {
        return filterTerm ? item[property].toString().toLowerCase().includes(filterTerm.toLowerCase()) : true;
    };
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedApplyFilters(); // Apply filters when the search term changes
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
        sortInventory();
    }, [filteredInventory, sortOrder, sortBy]);

    useEffect(() => {
        applyFilters(); // Call applyFilters when search term or selected filters change
    }, [searchTerm, selectedFilters]); // Add searchTerm and selectedFilters as dependencies

    return (
        <div className="text-center">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            </div>
                            <FilterButton onFilterChange={handleFilterChange} />
                            {(userRole === 'admin' || userRole === 'manager') && (
                                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    <button onClick={() => navigate(`/inventory/new`)} type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                        </svg>
                                        Add product
                                    </button>
                                </div>
                            )}
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
                                        <th scope="col" 
                                        className="px-4 py-3 cursor-pointer" 
                                        title="Click to sort by Expiration Date"
                                        onClick={() => handleSort('expirationDate')}>
                                            Expires On
                                            {sortBy === 'expirationDate' && (
                                                <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} className="ml-1" />
                                            )}
                                            {!sortBy && (
                                                <FontAwesomeIcon icon={faSort} className="ml-1" />
                                            )}
                                        </th>

                                        <th scope="col" className="px-4 py-3">Blood Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedInventory.length > 0 ? null : <tr><td className="px-4 py-3">No inventory items found.</td></tr>}
                                    {sortedInventory.slice(indexOfFirstItem, indexOfLastItem).map((item) => {

                                        const expiringSoon = isExpiringSoon(item.expirationDate);
                                        const formattedDateOrdered = new Date(item.dateOrdered).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        });
                                        const formattedDateReceived = new Date(item.dateReceived).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        });
                                        const onHoldClass = item.onHold ? "text-yellow-500" : "text-green-500";

                                        return (
                                            <tr key={item._id} className="table-row border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-primary-700"
                                                onClick={() => navigate(`/inventory/${item._id}`)}>
                                                <td className="px-4 py-3">{item.productType}</td>
                                                <td className={`px-4 py-3 ${onHoldClass}`}>{item.donorID}</td>
                                                <td className="px-4 py-3">{formattedDateOrdered}</td>
                                                <td className="px-4 py-3">{formattedDateReceived}</td>
                                                <td className="px-4 py-3">{item.unitSize} mL</td>
                                                <td className="px-4 py-3">{item.bloodSource}</td>
                                                <td className={expiringSoon ? "px-4 py-3 highlight" : "px-4 py-3"}>
                                                    {new Date(item.expirationDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        day: 'numeric',
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
                                Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredInventory.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredInventory.length}</span>
                            </span>
                            <div className="inline-flex items-stretch -space-x-px">
                                <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </svg>
                                </button>
                                {renderPageNumbers}
                                <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === pageNumbers} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </svg>
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default InventoryList;
