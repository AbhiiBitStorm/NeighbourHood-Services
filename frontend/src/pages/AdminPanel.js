import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const u = await axios.get('http://localhost:5000/api/users');
      const w = await axios.get('http://localhost:5000/api/workers');
      const b = await axios.get('http://localhost:5000/api/bookings');

      setUsers(u.data);
      setWorkers(w.data);
      setBookings(b.data);
      setLoading(false);
    } catch (err) {
      console.log("Admin fetch error:", err);
      setLoading(false);
    }
  };

  if (loading) return <div className="admin-container">Loading dashboard... 😎</div>;

  return (
    <div className="admin-container">
      <h1>Admin Dashboard 🧑‍💼</h1>

      <div className="admin-section">
        <h2>📋 All Users ({users.length})</h2>
        <ul>
          {users.map((u) => (
            <li key={u.id}><strong>{u.name}</strong> | {u.email} | {u.role}</li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h2>🛠️ Service Providers ({workers.length})</h2>
        <ul>
          {workers.map((w) => (
            <li key={w.id}><strong>{w.name}</strong> - {w.service} - ₹{w.hourlyRate}/hr</li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h2>📦 Bookings ({bookings.length})</h2>
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              {b.scheduledDate} - {b.service} - ₹{b.totalAmount} - status: <strong>{b.status}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;