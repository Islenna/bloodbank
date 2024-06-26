import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

export default function CustomNavbar(props) {
    const navigate = useNavigate();
    const { userRole, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const handleLogout = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/users/logout', null, { withCredentials: true })
            .then(() => {
                logout();
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/bloodfinder" className="flex items-center">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blood Finder</span>
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                {/* Mobile navigation menu */}
                <div
                    className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
                    id="navbar-mobile"
                >
                    <ul className="font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50">
                        {/* Common link for all users */}
                        <li>
                            <a href="/bloodfinder" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded">Get Blood</a>
                        </li>

                        {/* Conditionally render based on user's userRole */}
                        {userRole === 'admin' && (
                            <>
                                <li>
                                    <a href="/users" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded">User Management</a>
                                </li>
                                {/* Other admin-specific links */}
                            </>
                        )}

                        {['admin', 'manager'].includes(userRole) && (
                            <>
                                <li>
                                    <Link to="/inventory" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100">Inventory Management</Link>
                                </li>
                                {/* Other links for admin and manager */}
                            </>
                        )}

                        {/* Common links for all roles */}
                        <li>
                            <Link to="/suggestions" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100">Suggestions</Link>
                        </li>
                        <li>
                            <Link to={`/inventory/consumed`} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100">Analytics</Link>
                        </li>
                        <li>
                            <a href="#" onClick={handleLogout} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100">Logout</a>
                        </li>
                    </ul>
                </div>



                <div
                    className="hidden md:block"
                    id="navbar-desktop"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {/* Common link for all users */}
                        <li>
                            <a href="/bloodfinder" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Get Blood</a>
                        </li>

                        {/* Conditionally render based on user's userRole */}
                        {userRole === 'admin' && (
                            <>
                                <li>
                                    <a href="/users" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Users</a>
                                </li>
                                {/* Other admin-specific links */}
                            </>
                        )}

                        {['admin', 'manager'].includes(userRole) && (
                            <>
                                <li>
                                    <Link to="/inventory" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Inventory</Link>
                                </li>
                                <li>
                                <Link to="/owners" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Donors</Link>
                                </li>
                                {/* Other links for admin and manager */}
                            </>
                        )}

                        {/* Common links for all roles */}
                        <li>
                            <Link to="/suggestions" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Suggestions</Link>
                        </li>
                        <li>
                            <Link to={`/inventory/consumed`} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Analytics</Link>
                        </li>
                        <li>
                            <a href="#" onClick={handleLogout} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
