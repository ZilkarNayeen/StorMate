import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect after logout
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 transition-all duration-300 ease-in-out ml-16 md:ml-64 p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-xl min-h-full p-6 md:p-8">
          {/* Logout button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          {/* Dashboard content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
