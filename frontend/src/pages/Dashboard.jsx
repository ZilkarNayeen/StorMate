import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar with a modern dark blue theme */}
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </div>

      {/* Main content area, with a smooth transition and a soft bluish background */}
      <div className="flex-1 transition-all duration-300 ease-in-out ml-16 md:ml-64 p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-xl min-h-full p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;