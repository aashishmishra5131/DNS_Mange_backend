const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const dnsRoutes = require('./routes/DNSrouter.js');
const cors = require('cors'); 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', dnsRoutes);

// Database connection and server start
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');

        const PORT = process.env.PORT || 4000; // Use PORT from env or default to 3000
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log('MongoDB connection error:', err));
