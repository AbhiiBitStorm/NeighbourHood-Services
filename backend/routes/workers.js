const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const User = require('../models/User');

// Saare workers get karo (with filters)
router.get('/', async (req, res) => {
  try {
    const { service, location } = req.query;
    
    // Query build karo
    let query = {};
    if (service) query.service = service;
    
    const workers = await Worker.find(query)
      .populate('userId', 'name phone location email')
      .sort({ rating: -1 }); // Best rating wale pehle
    
    // Location filter (agar chahiye)
    let filteredWorkers = workers;
    if (location) {
      filteredWorkers = workers.filter(w => 
        w.userId.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    res.json(filteredWorkers);
  } catch (error) {
    res.status(500).json({ message: 'Workers fetch nahi ho paye', error: error.message });
  }
});

// Single worker details
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id)
      .populate('userId', 'name phone location email');
    
    if (!worker) {
      return res.status(404).json({ message: 'Worker nahi mila' });
    }
    
    res.json(worker);
  } catch (error) {
    res.status(500).json({ message: 'Error aa gaya', error: error.message });
  }
});

module.exports = router;