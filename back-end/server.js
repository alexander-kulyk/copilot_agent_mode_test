const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./middleware/logger');
const todosRoutes = require('./routes/todosRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Allow React app
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(logger);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🚀 Todo List API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      'GET /todos': 'Get all todos',
      'POST /todos': 'Create a new todo',
      'PUT /todos/:id/complete': 'Toggle todo completion',
      'DELETE /todos/:id': 'Delete a todo',
      'PUT /todos/:id': 'Update a todo',
    },
  });
});

// API routes
app.use('/todos', todosRoutes);

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.method} ${req.originalUrl} does not exist`,
    availableRoutes: [
      'GET /',
      'GET /todos',
      'POST /todos',
      'PUT /todos/:id/complete',
      'DELETE /todos/:id',
      'PUT /todos/:id',
    ],
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  res.status(error.status || 500).json({
    error: 'Internal server error',
    message: error.message || 'Something went wrong',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 ================================');
  console.log(`📝 Todo List API Server Running`);
  console.log(`🌐 Port: ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('🚀 ================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

module.exports = app;
