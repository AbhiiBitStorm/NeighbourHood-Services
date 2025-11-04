import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">🔧 LocalService</Link>

        <div className="nav-menu">
          {/* ✅ Only for customers */}
          {token && user.role === 'customer' && (
            <Link to="/workers" className="nav-link">Find Workers</Link>
          )}

          {token ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link">Admin Panel</Link>
              )}
              {user.role === 'worker' && (
                <Link to="/dashboard/worker" className="nav-link">My Dashboard</Link>
              )}
              {user.role === 'customer' && (
                <>
                  <Link to="/my-bookings" className="nav-link">My Bookings</Link>
                  <Link to="/dashboard/customer" className="nav-link">My Dashboard</Link>
                </>
              )}
              <span className="nav-link">Hi, {user.name}</span>
              <button onClick={handleLogout} className="nav-link btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link btn-register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;