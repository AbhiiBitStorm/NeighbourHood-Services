import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkerCard from '../components/WorkerCard';
import './WorkersList.css';

function WorkersList() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    service: '',
    location: ''
  });

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/workers');
      setWorkers(response.data);
      setFilteredWorkers(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching workers:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });

    let filtered = workers;
    
    if (name === 'service' && value) {
      filtered = filtered.filter(w => w.service === value);
    }
    
    if (name === 'location' && value) {
      filtered = filtered.filter(w => 
        w.location.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredWorkers(filtered);
  };

  const resetFilters = () => {
    setFilters({ service: '', location: '' });
    setFilteredWorkers(workers);
  };

  if (loading) {
    return <div className="loading">Loading workers... ⏳</div>;
  }

  return (
    <div className="workers-list-container">
      <div className="workers-header">
        <h1>Find Local Service Providers</h1>
        <p>Browse and connect with skilled workers in your area</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Service Type:</label>
          <select name="service" value={filters.service} onChange={handleFilterChange}>
            <option value="">All Services</option>
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
            <option value="Painter">Painter</option>
            <option value="Carpenter">Carpenter</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            placeholder="Enter city..."
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>

        <button className="reset-btn" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <div className="workers-grid">
        {filteredWorkers.length > 0 ? (
          filteredWorkers.map(worker => (
            <WorkerCard key={worker.id} worker={worker} />
          ))
        ) : (
          <div className="no-workers">
            <h3>No workers found 😕</h3>
            <p>Try different filters or check back later</p>
          </div>
        )}
      </div>

      <div className="workers-count">
        Showing {filteredWorkers.length} of {workers.length} workers
      </div>
    </div>
  );
}

export default WorkersList;