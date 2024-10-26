import React, { createContext, useContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// Create an Auth Context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User state
    const navigate = useNavigate();

    // Function to log in and set user state
    const login = (token) => {
        const decodedToken = jwt_decode(token);
        setUser({
            id: decodedToken.id,
            role: decodedToken.role,
        });
        localStorage.setItem('authToken', token);
        navigate(decodedToken.role === 'admin' ? '/admin' : '/player');
    };

    // Function to log out and reset user state
    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    // Load user from token on initial render
    React.useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            login(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
