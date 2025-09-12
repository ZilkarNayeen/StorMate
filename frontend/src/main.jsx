import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap App with AuthProvider so useAuth works */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
