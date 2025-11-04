const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Worker = require('../models/Worker');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role, location, service, experience, hourlyRate } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered hai bhai!' });
    }

    // Password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // User create karo
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      location
    });
    
    await user.save();

    // Agar worker hai to worker profile bhi banao
    if (role === 'worker') {
      const worker = new Worker({
        userId: user._id,
        service,
        experience,
        hourlyRate
      });
      await worker.save();
    }

    res.status(201).json({ message: 'Account ban gaya bhai! 🎉' });
  } catch (error) {
    res.status(500).json({ message: 'Kuch gadbad ho gayi', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // User find karo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ya password galat hai!' });
    }

    // Password check karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ya password galat hai!' });
    }

    // Token banao
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'secret-key-bhai', // Production me .env use karna
      { expiresIn: '7d' }
    );

    res.json({ 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login me problem', error: error.message });
  }
});

module.exports = router;