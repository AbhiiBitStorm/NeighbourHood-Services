import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear old error

    try {
      const response = await axios.post('http://localhost:5000/login', formData);

      // Save user and token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      alert('Login Successful 🎉');
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error('Login error:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>User Login 🔐</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: '15px' }}>
          Don't have an account?
          <a href="/register" style={{ color: '#3498db', marginLeft: '5px' }}>Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;