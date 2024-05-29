import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function FilterButton({ onFilterChange }) { // Prop to handle filter changes
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        homeClinic: '',
        productType: '',
        consumptionType: '',
        // other filters if needed...
    });
    const location = useLocation();

    const handleFilterChange = (key, value) => {
        const newFilters = { ...selectedFilters, [key]: value };
        setSelectedFilters(newFilters);
        onFilterChange(newFilters); // Notify parent of filter change
    };

    const shouldDisplayConsumption = location.pathname == "/inventory/consumed";

    return (
        <div className="relative inline-block w-full md:w-auto">
            <button
                id="filterDropdownButton"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                type="button"
            >
                Filter
                <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
            </button>
            {showDropdown && (
                <div id="filterDropdown" className=" dropdown-content absolute z-10 mt-2 rounded-md shadow-lg bg-white border border-gray-200 text-gray-900 ... dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">

                    <div className="bg-white border border-gray-200 text-gray-900  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">
                        <label>
                            Clinic:
                            <select className="bg-white border border-gray-200 text-gray-900  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 ark:hover:text-white dark:hover:bg-gray-700"
                                value={selectedFilters.homeClinic} onChange={e => handleFilterChange('homeClinic', e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="Concord">Concord</option>
                                <option value="Campbell">Campbell</option>
                                <option value="Dublin">Dublin</option>
                                <option value="Redwood City">Redwood City</option>
                                <option value="San Francisco">San Francisco</option>
                            </select>
                        </label>
                        <label>
                            Product Type:
                        </label>
                        <select className="bg-white border border-gray-200 text-gray-900 ... dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"


                            value={selectedFilters.productType}
                            onChange={e => handleFilterChange('productType', e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="pRBC">pRBC</option>
                            <option value="Whole Blood">Whole Blood</option>
                            <option value="FFP">FFP</option>
                            <option value="Cryo">Cryo</option>
                            <option value="HBOC">HBOC</option>
                        </select>
                        {shouldDisplayConsumption && (
                            <div>
                                <label>
                                    Consumption Type:
                                    <select className="bg-white border border-gray-200 text-gray-900 ... dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        value={selectedFilters.consumptionType}
                                        onChange={e => handleFilterChange('consumptionType', e.target.value)}
                                    >
                                        <option value="">All</option>
                                        <option value="Successfully Transfused">Successfully Transfused</option>
                                        <option value="Wasted">Wasted</option>
                                        <option value="Expired">Expired</option>
                                        <option value="Transferred">Transferred</option>
                                    </select>
                                </label>
                            </div>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
};

            export default FilterButton;
