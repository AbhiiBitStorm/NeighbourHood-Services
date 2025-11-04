import React, { useState } from 'react';
import axios from 'axios';
import './BookingForm.css';

function BookingForm({ worker, onClose }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    customerId: user.id,
    workerId: worker.id,
    workerName: worker.name,
    service: worker.service,
    scheduledDate: '',
    scheduledTime: '',
    customerAddress: '',
    customerPhone: '',
    description: '',
    totalAmount: worker.hourlyRate
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bookings', formData);
      alert('Booking successful! 🎉');
      onClose();
      window.location.href = '/my-bookings';
    } catch (error) {
      alert('Booking failed! Try again.');
      console.log(error);
    }
  };

  return (
    <div className="booking-modal">
      <div className="booking-form-container">
        <div className="booking-form-header">
          <h2>Book {worker.name}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Service</label>
              <input type="text" value={worker.service} disabled />
            </div>
            <div className="form-group">
              <label>Rate</label>
              <input type="text" value={`₹${worker.hourlyRate}/hour`} disabled />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Select Date*</label>
              <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label>Select Time*</label>
              <input
                type="time"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Your Address*</label>
            <input
              type="text"
              name="customerAddress"
              placeholder="Enter your complete address"
              value={formData.customerAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Phone*</label>
            <input
              type="tel"
              name="customerPhone"
              placeholder="Enter your phone number"
              value={formData.customerPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Work Description (Optional)</label>
            <textarea
              name="description"
              placeholder="Describe the work you need..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <button type="submit" className="submit-booking-btn">
            Confirm Booking 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;