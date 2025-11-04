const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/serviceMarketplace');
    console.log('MongoDB connected bhai! 🚀');
  } catch (error) {
    console.log('Connection fail ho gaya:', error);
  }
};

module.exports = connectDB;