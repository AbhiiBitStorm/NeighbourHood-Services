import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyBookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings/customer/${user.id}`
      );
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel?')) return;

    try {
      await axios.patch(`http://localhost:5000/api/bookings/${bookingId}`, {
        status: 'cancelled'
      });
      alert('Booking cancelled!');
      fetchBookings();
    } catch (error) {
      alert('Cancellation failed!');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'status-pending', text: '⏳ Pending' },
      accepted: { class: 'status-accepted', text: '✅ Accepted' },
      rejected: { class: 'status-rejected', text: '❌ Rejected' },
      completed: { class: 'status-completed', text: '🎉 Completed' },
      cancelled: { class: 'status-cancelled', text: '🚫 Cancelled' }
    };
    return badges[status] || badges.pending;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading bookings... ⏳</div>;
  }

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <h3>No bookings yet! 📋</h3>
          <p>Book a service provider to get started</p>
          <a href="/workers" className="browse-btn">Browse Workers</a>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => {
            const statusBadge = getStatusBadge(booking.status);
            return (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <div>
                    <h3>{booking.workerName || booking.workerDetails?.name}</h3>
                    <p className="service-name">🔧 {booking.service}</p>
                  </div>
                  <span className={`status-badge ${statusBadge.class}`}>
                    {statusBadge.text}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="detail-item">
                    <strong>📅 Date:</strong> {formatDate(booking.scheduledDate)}
                  </div>
                  <div className="detail-item">
                    <strong>⏰ Time:</strong> {booking.scheduledTime}
                  </div>
                  <div className="detail-item">
                    <strong>📍 Address:</strong> {booking.customerAddress}
                  </div>
                  <div className="detail-item">
                    <strong>💰 Amount:</strong> ₹{booking.totalAmount}
                  </div>
                  {booking.description && (
                    <div className="detail-item">
                      <strong>📝 Description:</strong> {booking.description}
                    </div>
                  )}
                </div>

                <div className="booking-actions">
                  <div className="worker-contact">
                    📞 {booking.workerDetails?.phone || 'Contact details available after confirmation'}
                  </div>
                  {booking.status === 'pending' && (
                    <button 
                      className="cancel-btn"
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBookings;