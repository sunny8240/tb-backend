require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/auth');
const stateRoutes = require('./routes/states');
const destinationRoutes = require('./routes/destinations');
const uploadRoutes = require('./routes/uploads');

const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
const dbOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority',
  ssl: true,
  tlsInsecure: false,
  authSource: 'admin'
};

const connectWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI, dbOptions)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch(err => {
      console.error('MongoDB connection failed:', err.message || err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// DB Events
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err.message);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/uploads', uploadRoutes);

// Serve uploaded files
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
app.use('/uploads', express.static(uploadsPath));

// Error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`   Server running on http://localhost:${PORT}`);
  console.log(`   API Documentation:`);
  console.log(`   GET /api/states              - Get all states`);
  console.log(`   GET /api/destinations       - Get all destinations`);
  console.log(`   POST /api/auth/admin-login  - Admin login`);
}); 

module.exports = app;
