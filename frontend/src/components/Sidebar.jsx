import React from 'react';
import { FaBox, FaTable, FaHome, FaShoppingCart, FaSignOutAlt, FaTruck, FaUsers } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuitem = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />, isParent: true },
    { name: "Products", path: "/admin-dashboard/products", icon: <FaBox />, isParent: false },
    { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable />, isParent: false },
    { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart />, isParent: false },
    { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck />, isParent: false },
    { name: "Transactions", path: "/admin-dashboard/transactions", icon: <FaUsers />, isParent: false },
    { name: "Logout", path: "/logout", icon: <FaSignOutAlt />, isParent: false },
    {name: "Users", path: "/admin-dashboard/users", icon:<FaUsers />, isParent: false},

  ];

  const handleLogoutClick = (e) => {
    e.preventDefault(); // prevent normal navigation
    logout();
    navigate("/login"); // redirect to login
  };

  return (
    <div className='flex flex-col h-screen p-4 bg-gray-950 text-gray-300 shadow-xl w-16 md:w-64 fixed transition-all duration-300 ease-in-out'>
      <div className='flex items-center justify-center h-16 border-b border-gray-800 mb-8'>
        <span className='hidden md:block text-3xl font-extrabold text-cyan-400 tracking-wide'>StoreMate</span>
        <span className='md:hidden text-3xl font-extrabold text-cyan-400'>SM</span>
      </div>
      <nav className='flex-1'>
        <ul className='space-y-4'>
          {menuitem.map((item) => (
            <li key={item.name}>
              {item.name === "Logout" ? (
                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center p-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 border-l-4 border-transparent transition duration-200 ease-in-out"
                >
                  <span className='text-xl mr-4 group-hover:scale-110 transition-transform duration-200'>{item.icon}</span>
                  <span className='hidden md:block font-medium'>{item.name}</span>
                </button>
              ) : (
                <NavLink
                  end={item.isParent}
                  to={item.path}
                  className={({ isActive }) =>
                    (isActive
                      ? "bg-cyan-900 bg-opacity-30 text-white shadow-inner border-l-4 border-cyan-500 font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-gray-800 border-l-4 border-transparent") +
                    " flex items-center p-3 rounded-md transition duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                  }
                >
                  <span className='text-xl mr-4 group-hover:scale-110 transition-transform duration-200'>{item.icon}</span>
                  <span className='hidden md:block font-medium'>{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
