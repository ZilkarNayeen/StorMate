import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import AuthProvider from './context/AuthContext';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Categories from './components/Categories';
import Root from './utils/Root';
import Suppliers from './components/Suppliers';
import Products from './components/Products';
import Orders from './components/Orders';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

        
          <Route element={<ProtectedRoutes requireRole={['admin']} />}>
            
            <Route path="/admin-dashboard" element={<Dashboard />}>
              
              <Route index element={<h1>Store Mate offers a powerful yet easy-to-use inventory management system that helps you keep full control over your stock. You can effortlessly add, edit, or delete products, organize them into categories, and track quantity changes in real-time. With features like low stock alerts, barcode scanning, and smart search filters, managing thousands of items becomes quick and stress-free. Store Mate also logs all stock activity so you can view your inventory history anytime, making your store operations more transparent and efficient.</h1>} />
              <Route path="categories" element={<Categories/>} />
              <Route path="products" element={<Products/>} />
              <Route path="suppliers" element={<Suppliers/>} />
              <Route path="orders" element={<Orders/>} />
              <Route path="users" element={<h1>users</h1>} />
            </Route>
          </Route>

          
          <Route element={<ProtectedRoutes requireRole={['customer']} />}>
            <Route path="/customer/dashboard" element={<h1> Customer Dashboard</h1>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;