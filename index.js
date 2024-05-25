const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const dnsRoutes = require('./routes/DNSrouter.js');
const cors = require('cors'); 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); 

app.use('/api/auth', authRoutes);
app.use('/api', dnsRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(err));
