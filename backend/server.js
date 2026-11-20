const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables (supports running from backend dir or repo root)
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config(); // Fallback for root .env if present

// Environment & Security Validation
if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    console.error('FATAL SECURITY ERROR: JWT_SECRET environment variable is missing in production!');
    process.exit(1);
  } else {
    console.warn('WARNING: JWT_SECRET environment variable is not defined. Ensure .env is properly configured.');
  }
}

const app = express();

// Parse CORS allowed origins (supports single or comma-separated URLs in CLIENT_URL)
const configuredOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((url) => url.trim().replace(/\/$/, ''))
  : [];

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  ...configuredOrigins
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(cleanOrigin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// MongoDB connection with serverless connection reuse & pooling
const MONGO_URI = process.env.MONGO_URI || 'mongodb://undaviyaprince27_db_user:princeundaviya@ac-bkzdycn-shard-00-00.zmq8sva.mongodb.net:27017,ac-bkzdycn-shard-00-01.zmq8sva.mongodb.net:27017,ac-bkzdycn-shard-00-02.zmq8sva.mongodb.net:27017/prince-portfolio?replicaSet=atlas-dhpfbt-shard-0&ssl=true&authSource=admin';

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }
  try {
    cachedConnection = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    return cachedConnection;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

// Initial connection for local development
if (require.main === module) {
  connectDB()
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// Middleware to ensure DB connection is ready before handling API routes in serverless environments
app.use(async (req, res, next) => {
  if (req.path === '/') return next();
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Database connection failed. Verify MONGO_URI and MongoDB Atlas Network Access (0.0.0.0/0).',
      error: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
  }
});

// Static file serving for local image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Static uploads directory for local development
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/education', require('./routes/education'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contact', require('./routes/contact'));

// Base route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Prince Undaviya Portfolio API is running locally',
    version: '1.0.0',
    endpoints: [
      '/api/auth',
      '/api/projects',
      '/api/skills',
      '/api/experience',
      '/api/education',
      '/api/testimonials',
      '/api/contact'
    ]
  });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend server running locally on port ${PORT}`);
  });
}

module.exports = app;
