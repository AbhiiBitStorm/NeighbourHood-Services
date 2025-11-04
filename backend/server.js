const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Database connect karo
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route test ke liye
app.get('/', (req, res) => {
  res.send('Bhai server chal raha hai! 💪');
});

// Server start karo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server port ${PORT} pe chal raha hai bhai!`);
});

// Routes import karo (cors ke baad add karna)
const authRoutes = require('./routes/auth');
const workerRoutes = require('./routes/workers');

// Routes use karo
app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);

// Routes import karo (existing routes ke niche)
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');

// Routes use karo (existing routes ke niche)
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);