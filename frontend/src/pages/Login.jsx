
import React, { useState } from "react"; 
import { useAuth } from "../context/AuthContext.jsx";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router"; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Hardcoded admin credentials
        const adminCredentials = {
            email: "admin@gmail.com",
            password: "admin123",
            role: "admin",
            name: "Admin User"
        };

        // Hardcoded customer credentials
        const customerCredentials = {
            email: "customer@example.com",
            password: "customer123",
            role: "user",
            name: "Customer User"
        };

        // Check credentials
        if (email === adminCredentials.email && password === adminCredentials.password) {
            login(adminCredentials);
            navigate("/admin-dashboard");
        } 
        else if (email === customerCredentials.email && password === customerCredentials.password) {
            login(customerCredentials);
            navigate("/dashboard");
        } 
        else {
            setError("Invalid email or password.");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 p-4">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-sm transform transition-transform duration-300 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-2">
                    StoreMate
                </h1>
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
                    Login
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email input */}
                    <div className="relative">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaUser />
                        </span>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Password input */}
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaLock />
                        </span>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
