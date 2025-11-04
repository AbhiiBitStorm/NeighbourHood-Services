import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';
import './WorkerDetail.css';

function WorkerDetail() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkerDetails();
  }, [id]);

  const fetchWorkerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/workers/${id}`);
      setWorker(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('Please login to book!');
      window.location.href = '/login';
      return;
    }
    setShowBookingForm(true);
  };

  if (loading) {
    return <div className="loading">Loading... ⏳</div>;
  }

  if (!worker) {
    return <div className="loading">Worker not found 😕</div>;
  }

  const { name, location, phone, email, service, experience, hourlyRate, rating, totalReviews, description } = worker;

  return (
    <div className="worker-detail-container">
      <div className="worker-detail-card">
        <div className="worker-header-detail">
          <div className="worker-main-info">
            <h1>{name}</h1>
            <p className="service-type">🔧 {service}</p>
            <p className="location">📍 {location}</p>
            {description && <p className="description">{description}</p>}
          </div>
          <div className="worker-stats">
            <div className="stat-box">
              <span className="stat-value">⭐ {rating.toFixed(1)}</span>
              <span className="stat-label">{totalReviews} Reviews</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">💼 {experience}y</span>
              <span className="stat-label">Experience</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">₹{hourlyRate}</span>
              <span className="stat-label">Per Hour</span>
            </div>
          </div>
        </div>

        <div className="worker-contact">
          <p>📞 {phone}</p>
          <p>✉️ {email}</p>
        </div>

        <button className="book-now-btn" onClick={handleBookNow}>
          Book Now 🚀
        </button>
      </div>

      {showBookingForm && (
        <BookingForm 
          worker={worker} 
          onClose={() => setShowBookingForm(false)} 
        />
      )}
    </div>
  );
}

export default WorkerDetail;