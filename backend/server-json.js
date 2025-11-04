const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

// Middleware
server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// ✅ Register Route
server.post('/register', (req, res) => {
  const {
    name, email, password, phone, role,
    location, service, experience, hourlyRate
  } = req.body;

  const db = router.db;

  // Check if email already exists
  const existingUser = db.get('users').find({ email }).value();
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered!' });
  }

  // Create user
  const userId = Date.now().toString();
  const newUser = {
    id: userId,
    name,
    email,
    password, // NOT encrypted - only for demo
    phone,
    role,
    location,
    createdAt: new Date().toISOString()
  };

  db.get('users').push(newUser).write();

  // If worker, create in workers table
  if (role === 'worker') {
    const newWorker = {
      id: 'w_' + Date.now(),
      userId,
      name,
      email,
      phone,
      location,
      service,
      experience: parseInt(experience),
      hourlyRate: parseInt(hourlyRate),
      rating: 4.5,
      totalReviews: 0,
      availability: true,
      description: ""
    };

    db.get('workers').push(newWorker).write();
  }

  res.status(201).json({ message: 'Account created!', user: newUser });
});

// ✅ Login Route
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;

  const user = db.get('users').find({ email, password }).value();
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }

  res.json({
    token: 'fake-token-' + user.id,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Remaining API
server.use('/api', router);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server running on port ${PORT}`);
});