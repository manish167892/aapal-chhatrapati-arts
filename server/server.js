const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

if (process.env.NODE_ENV === 'production') {
    // Disable console.log in production, keep console.error
    console.log = function () { };
    console.warn = function () { };
}

const corsOptions = {
    origin: function (origin, callback) {
        if (process.env.NODE_ENV === 'production') {
            const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS policy'));
            }
        } else {
            callback(null, true);
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
const path = require('path');
app.use(express.static(path.join(__dirname, 'client', 'public')));



// Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server running in development mode on port ${PORT}`);
    }
});
