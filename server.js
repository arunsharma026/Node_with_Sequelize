const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:8081', // Adjust this as needed
};

// Apply middleware
app.use(cors(corsOptions)); // Enable CORS with specified options
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Add custom headers middleware
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Express');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    // Add other headers as needed
    next();
});

// Route definitions
// Uncomment and configure the router when ready
const router = require('./routes/productRouter.js');
app.use('/api/products', router);

// Testing API route
app.get('/', (req, res) => {
    res.json({ message: 'Hello Test API' });
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
