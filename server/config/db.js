const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/entries', require('./routes/entries'));
app.use('/api/goals', require('./routes/goals'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Finance Tracker API Running ✅' });
});

// Connect DB and Start Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.log('❌ DB Error:', err));