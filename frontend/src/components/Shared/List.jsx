import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';
import axios from 'axios';

function List({ apiEndpoint, type, columns, onRowClick, defaultSortBy, defaultSortOrder = 'asc', itemsPerPage = 10, ownerId }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [sortOrder, setSortOrder] = useState(defaultSortOrder);
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(apiEndpoint, { withCredentials: true })
            .then((res) => {
                setData(res.data);
                setFilteredData(res.data);
            })
            .catch((err) => {
                console.error('API request error:', err);
                setError(err);
            });
    }, [apiEndpoint]);

    useEffect(() => {
        applyFilters();
    }, [searchTerm]);

    useEffect(() => {
        sortData();
    }, [filteredData, sortOrder, sortBy]);

    const applyFilters = () => {
        const filteredResult = data.filter(item => {
            return columns.some(col => {
                const value = item[col.name]?.toString().toLowerCase();
                return value?.includes(searchTerm.toLowerCase());
            });
        });
        setFilteredData(filteredResult);
        setCurrentPage(1);
    };

    const sortData = () => {
        const sortedResult = [...filteredData].sort((a, b) => {
            const aValue = a[sortBy]?.toString().toLowerCase() || '';
            const bValue = b[sortBy]?.toString().toLowerCase() || '';
            return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
        setSortedData(sortedResult);
    };

    const handleSort = (property) => {
        if (property === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(property);
            setSortOrder('asc');
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const pageNumbers = Math.ceil(sortedData.length / itemsPerPage);
    const renderPageNumbers = Array.from({ length: pageNumbers }, (_, i) => (
        <button key={i + 1} onClick={() => handlePageClick(i + 1)} className={`flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === i + 1 ? 'font-semibold' : ''}`}>{i + 1}</button>
    ));

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="w-full">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>
                    <button
                        onClick={() => navigate(`/${type}/new?ownerId=${ownerId}`)}
                        type="button"
                        className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                        <svg
                            className="h-3.5 w-3.5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            />
                        </svg>
                        Add {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                </div>
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        {columns.map((col) => (
                                            <th
                                                key={col.name}
                                                scope="col"
                                                className="px-4 py-3 cursor-pointer"
                                                onClick={() => handleSort(col.name)}
                                            >
                                                {col.label}
                                                {sortBy === col.name && (
                                                    <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} className="ml-1" />
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedData.length > 0 ? sortedData.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
                                        <tr
                                            key={item._id}
                                            className="table-row border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-primary-700"
                                            onClick={() => onRowClick ? onRowClick(item._id) : navigate(`/${type}/${item._id}`)}
                                        >
                                            {columns.map((col) => (
                                                <td key={col.name} className="px-4 py-3">
                                                    {col.format ? col.format(item[col.name]) : item[col.name]}
                                                </td>
                                            ))}
                                        </tr>
                                    )) : <tr><td className="px-4 py-3" colSpan={columns.length}>No items found.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedData.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{sortedData.length}</span>
                            </span>
                            <div className="inline-flex items-stretch -space-x-px">
                                <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {renderPageNumbers}
                                <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === pageNumbers} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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

export default List;
