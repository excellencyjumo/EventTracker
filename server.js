const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const connectDB = require('./config/db');
require('dotenv').config();
// Middleware
app.use(express.json());

// Routes
app.use('/api/v3/app', authRoutes);
app.use('/api/v3/app', eventRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});


const PORT = process.env.PORT || 3000;

// Connect Database
connectDB()
  .then(() => {
    //start the server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error.toString());
    throw error.toString()
  });
