const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { loginAdmin } = require('../controllers/adminAuthController');

// Rate limiter for login - maximum 10 requests per 15 minutes window
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: 'Too many login attempts, please try again after 15 minutes' }
});

router.post('/login', loginLimiter, loginAdmin);

module.exports = router;
