const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Worker = require('../models/Worker');

// Add review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    // Update worker rating
    const reviews = await Review.find({ workerId: req.body.workerId });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRating / reviews.length;

    await Worker.findByIdAndUpdate(req.body.workerId, {
      rating: avgRating,
      totalReviews: reviews.length
    });

    res.status(201).json({ message: 'Review added! 🌟', review });
  } catch (error) {
    res.status(500).json({ message: 'Review submit nahi hua', error: error.message });
  }
});

// Get worker reviews
router.get('/worker/:workerId', async (req, res) => {
  try {
    const reviews = await Review.find({ workerId: req.params.workerId })
      .populate('customerId', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

module.exports = router;