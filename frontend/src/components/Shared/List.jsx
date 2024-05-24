import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function List({ type, data, columns, onRowClick, sortBy, sortOrder, onSort }) {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        if (onRowClick) {
            onRowClick(id);
        } else {
            navigate(`/${type}/${id}`);
        }
    };

    return (
        <div className="text-center">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
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
