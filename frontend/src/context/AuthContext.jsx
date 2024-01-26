import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');

    // Read the user role from localStorage when the app loads
    useEffect(() => {
        const storedUserRole = localStorage.getItem('userRole');
        if (storedUserRole) {
            setUserRole(storedUserRole);
        }
    }, []);

    const login = (email, role) => {
        setUserEmail(email);
        setUserRole(role); // Set the user role in state
        localStorage.setItem('userRole', role); // Store the user role in localStorage
    };

    const logout = () => {
        setUserEmail('');
        setUserRole(''); // Reset the user role in state
        localStorage.removeItem('userRole'); // Clear the user role from localStorage
    };

    return (
        <AuthContext.Provider value={{ userEmail, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
