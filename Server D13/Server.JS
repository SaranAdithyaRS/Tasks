const express = require('express');
const server = express();
const port = 5000;

// Middleware to parse JSON request bodies
server.use(express.json());

const items = [
    { id: 1, Name: 'ADITHYA' },
    { id: 2, Name: 'VERIZON' },
    { id: 3, Name: 'ADITHYA' }
];

// Routes
server.get('/', (req, res) => {
    res.end("I Am Dr Strange");
});

server.get('/Saran', (req, res) => {
    res.end("Hello Peter");
});

server.get('/PRO', (req, res) => {
    res.json(items);
});

server.post('/PRO', (req, res) => {
    // Ensure `name` is sent in the body
    const newItem = { id: items.length + 1, Name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
});

server.delete('/PRO/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        const deletedItem = items.splice(itemIndex, 1); 
        res.json(deletedItem[0]); 
    } else {
        res.status(404).json({ error: 'Item not found' }); 
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB Connection
const dbURI = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection string
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the 'updatedAt' field before saving
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API!');
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
