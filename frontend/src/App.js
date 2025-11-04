import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkersList from './pages/WorkersList';
import WorkerDetail from './pages/WorkerDetail';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workers" element={<WorkersList />} />
        <Route path="/worker/:id" element={<WorkerDetail />} />

        {/* Customer Only */}
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />

        {/* Worker */}
        <Route path="/dashboard/worker" element={<WorkerDashboard />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;