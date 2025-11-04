const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

// Create new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ 
      message: 'Booking created successfully! 🎉', 
      booking 
    });
  } catch (error) {
    res.status(500).json({ message: 'Booking nahi ho paya', error: error.message });
  }
});

// Get customer's bookings
router.get('/customer/:customerId', async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.customerId })
      .populate({
        path: 'workerId',
        populate: { path: 'userId', select: 'name phone email' }
      })
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Get worker's bookings
router.get('/worker/:workerId', async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.params.workerId })
      .populate('customerId', 'name phone email location')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Update booking status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({ message: 'Status updated!', booking });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

// Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    
    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling', error: error.message });
  }
});

module.exports = router;