import React from 'react';
import { Link } from 'react-router-dom';
import './WorkerCard.css';

function WorkerCard({ worker }) {
  const { name, location, service, experience, hourlyRate, rating, totalReviews, availability } = worker;

  const getServiceIcon = (service) => {
    const icons = {
      'Electrician': '🔌',
      'Plumber': '🔧',
      'Painter': '🎨',
      'Carpenter': '🔨'
    };
    return icons[service] || '🛠️';
  };

  return (
    <div className="worker-card">
      <div className="worker-header">
        <div className="service-badge">
          {getServiceIcon(service)} {service}
        </div>
        {availability ? (
          <span className="status available">Available</span>
        ) : (
          <span className="status unavailable">Busy</span>
        )}
      </div>

      <div className="worker-info">
        <h3>{name}</h3>
        <p className="location">📍 {location}</p>
        <p className="experience">💼 {experience} years experience</p>
      </div>

      <div className="worker-rating">
        <div className="rating">
          ⭐ {rating.toFixed(1)} 
          <span className="reviews">({totalReviews} reviews)</span>
        </div>
        <div className="rate">
          ₹{hourlyRate}/hour
        </div>
      </div>

      <Link to={`/worker/${worker.id}`} className="contact-btn">
        View Details
      </Link>
    </div>
  );
}

export default WorkerCard;