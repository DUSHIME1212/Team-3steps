// Import required modules
const express = require('express');
const dotenv = require('dotenv');

// Placeholder function for MongoDB connection
const connectDB = async () => {
  console.log("MongoDB connection skipped (placeholder mode)");
};

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB (placeholder mode for now)
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/listings', require('./routes/listingRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
