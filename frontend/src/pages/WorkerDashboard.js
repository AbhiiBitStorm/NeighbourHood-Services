import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WorkerDashboard.css';

function WorkerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [workerId, setWorkerId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getWorker();
  }, []);

  const getWorker = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/workers`);
      const worker = res.data.find(w => w.email === user.email);

      if (worker) {
        setWorkerId(worker.id);
        fetchBookings(worker.id);
      }
    } catch (err) {
      console.error('Error fetching worker:', err);
    }
  };

  const fetchBookings = async (wId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings`);
      const today = new Date().toISOString().split('T')[0];

      const assigned = res.data.filter(
        b => b.workerId === wId && b.scheduledDate >= today
      );
      setBookings(assigned);
    } catch (err) {
      console.error('Booking error:', err);
    }
  };

  return (
    <div className="worker-dashboard">
      <h2>📅 Today’s Assigned Bookings</h2>
      {bookings.length === 0 ? (
        <p>No Orders for Today ✅</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Time</th><th>Customer</th><th>Amount</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.scheduledDate}</td>
                <td>{b.scheduledTime}</td>
                <td>{b.customerName || "-"}</td>
                <td>₹{b.totalAmount}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WorkerDashboard;