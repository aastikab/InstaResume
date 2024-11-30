const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Set strictQuery to true (or false based on your preference)
mongoose.set('strictQuery', true);

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Connect to MongoDB with error handling
const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');

    // Routes
    app.post('/api/auth/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        console.log('Login attempt with:', { email, password });

        // Generate a token without validation
        const token = jwt.sign(
          { email: email },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        // Send successful response
        res.json({
          token,
          user: {
            email: email,
            name: email.split('@')[0] // Use email prefix as name
          }
        });

      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
      }
    });

    // Register route
    app.post('/api/auth/register', async (req, res) => {
      try {
        const { name, email, password } = req.body;

        // Generate token without saving to database
        const token = jwt.sign(
          { email: email },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.status(201).json({
          token,
          user: {
            name: name || email.split('@')[0],
            email: email
          }
        });
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
      }
    });

    // Health check route
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    });

    // Add this after your existing routes
    app.post('/api/resumes', async (req, res) => {
      try {
        const { title, content, templateId } = req.body;
        
        // For now, just return success response
        res.status(201).json({
          success: true,
          message: 'Resume created successfully',
          data: {
            id: Date.now(),
            title,
            content,
            templateId
          }
        });
      } catch (error) {
        console.error('Resume creation error:', error);
        res.status(500).json({ message: 'Error creating resume' });
      }
    });

    const PORT = parseInt(process.env.PORT) || 8002;
    
    // Add error handling for port in use
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        const newPort = PORT + 1;
        console.log(`Port ${PORT} is busy, trying ${newPort}`);
        server.listen(newPort);
      } else {
        console.error('Server error:', err);
      }
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Add graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

startServer();