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

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    'https://tb-frontend-nine.vercel.app'
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority',
  ssl: true,
  authSource: 'admin'
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'TravelBharat Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? 'OK' : 'DB_DISCONNECTED',
    database: dbConnected,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/uploads', uploadRoutes);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Backend running on port ${PORT}`);
  }
});

process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close(false, () => process.exit(0));
  });
});

process.on('uncaughtException', () => {
  process.exit(1);
});

module.exports = app;
