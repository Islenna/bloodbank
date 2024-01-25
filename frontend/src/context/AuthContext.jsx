import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(''); 

    const login = (email, role) => {
        setUserEmail(email);
        setIsLoggedIn(true);
        setUserRole(role); // Set the user role on login
    };

    const logout = () => {
        setUserEmail('');
        setIsLoggedIn(false);
        setUserRole(''); // Reset the user role on logout
    };

    return (
        <AuthContext.Provider value={{ userEmail, isLoggedIn, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
