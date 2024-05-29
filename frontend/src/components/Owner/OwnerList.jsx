import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';

function List({ type, data, columns, onRowClick, sortBy, sortOrder, onSort, ownerId }) {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        if (onRowClick) {
            onRowClick(id);
        } else {
            navigate(`/${type}/${id}`);
        }
    };

    const handleAdd = () => {
        if (ownerId) {
            navigate(`/pets/new?ownerId=${ownerId}`);
        } else {
            navigate(`/${type}/new`);
        }
    };

    return (
        <div className="w-full">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <Search />
                    </div>
                    <button
                        onClick={handleAdd}
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
                                                onClick={() => onSort && onSort(col.name)}
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
                                    {data.length > 0 ? data.map((item) => (
                                        <tr
                                            key={item._id}
                                            className="table-row border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-primary-700"
                                            onClick={() => handleRowClick(item._id)}
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
                    </div>
                </div>
            </section>
        </div>
    );
}

export default List;
