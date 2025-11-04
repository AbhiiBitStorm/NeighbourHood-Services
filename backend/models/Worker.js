const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: String, required: true }, // electrician, plumber, painter
  experience: { type: Number, required: true },
  hourlyRate: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  availability: { type: Boolean, default: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Worker', workerSchema);