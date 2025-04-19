import express from 'express';
import routes from './routes/index.js'; // Assuming routes/index.ts exports default router
import connection from './config/connection.js'; // Your connection file

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use combined routes from index.ts
app.use('/api', routes);

// Check MongoDB connection status
connection.on('connected', () => {
  console.log('✅ MongoDB connected');
});

connection.on('error', (err: Error) => {
  console.error('❌ MongoDB connection error:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});