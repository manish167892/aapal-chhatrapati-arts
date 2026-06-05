const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductByIdOrSku,
    createProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    calculatePrice,
    bulkUpdatePrices
} = require('../controllers/productController');
const jwt = require('jsonwebtoken');

// Auth middleware (mocked basic version until fully implemented with Admin model reqs)
const protectAdmin = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            req.admin = decoded; // attach admin details
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Public routes
router.route('/').get(getProducts);
router.route('/calculate-price').post(calculatePrice);
router.route('/:id').get(getProductByIdOrSku);

// Admin protected routes
router.route('/bulk-update-prices').put(protectAdmin, bulkUpdatePrices);
router.route('/').post(protectAdmin, createProduct);
router.route('/:id')
    .put(protectAdmin, updateProduct)
    .delete(protectAdmin, deleteProduct);
router.route('/:id/stock').patch(protectAdmin, updateStock);

module.exports = router;
