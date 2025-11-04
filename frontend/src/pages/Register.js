import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    role: 'customer',
    service: '',
    experience: '',
    hourlyRate: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/register', formData);
      alert('Registration successful! 🎉');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register 📝</h2>
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input type="text" name="location" placeholder="Your City/Location" onChange={handleChange} required />

          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="customer">I need services (Customer)</option>
            <option value="worker">I provide services (Worker)</option>
          </select>

          {formData.role === 'worker' && (
            <>
              <select name="service" value={formData.service} onChange={handleChange} required>
                <option value="">-- Select Service --</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Painter">Painter</option>
                <option value="Carpenter">Carpenter</option>
              </select>

              <input type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} required />
              <input type="number" name="hourlyRate" placeholder="Hourly Rate (in ₹)" onChange={handleChange} required />
            </>
          )}

          <button type="submit">Create Account</button>
        </form>

        <p style={{ marginTop: '15px' }}>
          Already have an account?
          <a href="/login" style={{ color: '#3498db', marginLeft: '5px' }}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;