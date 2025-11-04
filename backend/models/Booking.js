const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  workerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Worker', 
    required: true 
  },
  service: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  scheduledTime: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerPhone: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);