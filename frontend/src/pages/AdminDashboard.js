import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    workers: 0,
    bookings: 0,
    todayBookings: 0
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [resUsers, resWorkers, resBookings] = await Promise.all([
      axios.get('http://localhost:5000/api/users'),
      axios.get('http://localhost:5000/api/workers'),
      axios.get('http://localhost:5000/api/bookings')
    ]);

    const today = new Date().toISOString().split('T')[0];
    const todayBookings = resBookings.data.filter(b => b.scheduledDate === today);

    setBookings(resBookings.data);
    setStats({
      users: resUsers.data.length,
      workers: resWorkers.data.length,
      bookings: resBookings.data.length,
      todayBookings: todayBookings.length
    });
  };

  const pieData = {
    labels: ['Users', 'Workers'],
    datasets: [
      {
        data: [stats.users, stats.workers],
        backgroundColor: ['#3498db', '#2ecc71'],
        borderColor: ['#fff'],
        borderWidth: 1
      }
    ]
  };

  const barData = {
    labels: ['Total Bookings', 'Today’s Bookings'],
    datasets: [
      {
        label: 'Bookings',
        data: [stats.bookings, stats.todayBookings],
        backgroundColor: ['#9b59b6', '#f1c40f']
      }
    ]
  };

  return (
    <div className="admin-bi-container">
      <h1>📊 Admin Power Dashboard</h1>

      <div className="data-cards">
        <div className="card">
          <h3>📋 Total Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="card">
          <h3>🛠️ Total Workers</h3>
          <p>{stats.workers}</p>
        </div>
        <div className="card">
          <h3>📦 All Bookings</h3>
          <p>{stats.bookings}</p>
        </div>
        <div className="card">
          <h3>📅 Today’s Orders</h3>
          <p>{stats.todayBookings}</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h4>User vs Worker Distribution</h4>
          <Pie data={pieData} />
        </div>
        <div className="chart-box">
          <h4>Booking Analytics</h4>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;