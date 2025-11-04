import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const services = [
    { icon: '🔌', name: 'Electrician', count: 45 },
    { icon: '🔧', name: 'Plumber', count: 32 },
    { icon: '🎨', name: 'Painter', count: 28 },
    { icon: '🔨', name: 'Carpenter', count: 21 }
  ];

  return (
    <div className="home">
      <div className="hero">
        <h1>Find Trusted Local Service Providers</h1>
        <p>Connect with skilled workers in your area</p>
        <Link to="/workers" className="cta-button">
          Find Workers Near You
        </Link>
      </div>

      <div className="services-grid">
        <h2>Popular Services</h2>
        <div className="services">
          {services.map((service, index) => (
            <Link to={`/workers?service=${service.name}`} key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.name}</h3>
              <p>{service.count} Workers Available</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;