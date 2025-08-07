// src/utils/Root.jsx

import { useEffect } from "react"; // Changed 'use' to 'useEffect'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router"; // Corrected import from "react-router" to "react-router-dom"

const Root = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin-dashboard');
            } else if (user.role === 'customer') {
                navigate('/customer-dashboard');
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    return (null); // This will render a blank page while the redirect happens
};

export default Root;