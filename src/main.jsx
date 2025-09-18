import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './assets/index.css';
import { ClientIpProvider } from './components/ClientIpContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClientIpProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </HashRouter>
    </ClientIpProvider>
  </React.StrictMode>
);
