const Product = require('../models/Product');
const { productSchema } = require('../../shared/validationSchemas');

// @desc    Get all products (with optional filtering)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const { category, isFeatured, type } = req.query;
        let query = { status: 'active' };

        if (category) query.category = category;
        if (isFeatured) query.isFeatured = isFeatured === 'true';
        if (type) query.type = type;

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product by SKU or ID
const getProductByIdOrSku = async (req, res) => {
    try {
        const product = await Product.findOne({
            $or: [
                { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null },
                { sku: req.params.id },
                { slug: req.params.id }
            ],
            status: 'active'
        });

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const product = await Product.findById(req.params.id);

        if (product) {
            Object.assign(product, req.body);
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update stock
// @route   PATCH /api/products/:id/stock
// @access  Private/Admin
const updateStock = async (req, res) => {
    try {
        const { quantity, operation, variantSku } = req.body; // operation: 'add', 'subtract', 'set'

        if (typeof quantity !== 'number' || quantity < 0) {
            return res.status(400).json({ message: 'Quantity must be a valid positive number' });
        }
        if (!['add', 'subtract', 'set'].includes(operation)) {
            return res.status(400).json({ message: 'Invalid operation type' });
        }

        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (variantSku) {
            // Update specific variant stock
            if (!product.variants) product.variants = [];
            const variant = product.variants.find(v => v.sku === variantSku);
            if (!variant) return res.status(404).json({ message: 'Variant not found' });

            if (operation === 'add') {
                variant.stockQuantity += quantity;
            } else if (operation === 'subtract') {
                if (variant.stockQuantity < quantity) {
                    return res.status(400).json({ message: 'Insufficient variant stock to subtract' });
                }
                variant.stockQuantity -= quantity;
            } else if (operation === 'set') {
                variant.stockQuantity = quantity;
            }
            product.markModified('variants');
        } else {
            // Update main product stock
            if (operation === 'add') {
                product.stockQuantity += quantity;
            } else if (operation === 'subtract') {
                if (product.stockQuantity < quantity) {
                    return res.status(400).json({ message: 'Insufficient stock to subtract' });
                }
                product.stockQuantity -= quantity;
            } else if (operation === 'set') {
                product.stockQuantity = quantity;
            }
        }

        if (product.stockQuantity <= 0 && (!product.variants || product.variants.every(v => v.stockQuantity <= 0))) {
            product.status = 'inactive';
        } else if (product.status === 'inactive' && (product.stockQuantity > 0 || (product.variants && product.variants.some(v => v.stockQuantity > 0)))) {
            product.status = 'active'; // Auto reactivate
        }

        await product.save();
        res.json({ message: 'Stock updated', stockQuantity: product.stockQuantity, variants: product.variants, status: product.status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Calculate dynamic price securely
// @route   POST /api/products/calculate-price
// @access  Public
const calculatePrice = async (req, res) => {
    try {
        const { sku, selectedOptions } = req.body;
        const product = await Product.findOne({ sku });

        if (!product) return res.status(404).json({ message: 'Product not found' });

        let finalPrice = product.basePrice;

        if (selectedOptions && product.customizationOptions) {
            Object.keys(selectedOptions).forEach(optionName => {
                const userChoice = selectedOptions[optionName]?.value;
                if (!userChoice) return;

                const productOption = product.customizationOptions.find(o => o.name === optionName);
                if (productOption) {
                    const validChoice = productOption.choices.find(c => c.value === userChoice);
                    if (validChoice) {
                        if (validChoice.priceAdjustmentType === 'percentage') {
                            finalPrice += product.basePrice * (validChoice.priceAdjustment / 100);
                        } else {
                            finalPrice += validChoice.priceAdjustment;
                        }
                    }
                }
            });
        }

        res.json({ sku: product.sku, basePrice: product.basePrice, finalPrice: Math.max(0, finalPrice) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Bulk update product prices
// @route   PUT /api/products/bulk-update-prices
// @access  Private/Admin
const bulkUpdatePrices = async (req, res) => {
    try {
        const { category, type, adjustmentType, adjustmentValue, target } = req.body;

        if (!adjustmentType || typeof adjustmentValue !== 'number') {
            return res.status(400).json({ message: 'adjustmentType and adjustmentValue are required.' });
        }

        let query = {};
        if (category && category !== 'all') query.category = category;
        if (type && type !== 'all') query.type = type;

        const products = await Product.find(query);

        let updatedCount = 0;

        for (let product of products) {
            let changed = false;

            // 1. Update base price
            if (target === 'basePrice' || target === 'both') {
                let currentPrice = product.basePrice;
                let newPrice = currentPrice;
                if (adjustmentType === 'percentage') {
                    newPrice = currentPrice + (currentPrice * (adjustmentValue / 100));
                } else if (adjustmentType === 'fixed') {
                    newPrice = currentPrice + adjustmentValue;
                }
                product.basePrice = Math.max(0, Math.round(newPrice));
                changed = true;
            }

            // 2. Update variants prices
            if ((target === 'variants' || target === 'both') && product.variants && product.variants.length > 0) {
                product.variants = product.variants.map(variant => {
                    let currentPrice = variant.price;
                    let newPrice = currentPrice;
                    if (adjustmentType === 'percentage') {
                        newPrice = currentPrice + (currentPrice * (adjustmentValue / 100));
                    } else if (adjustmentType === 'fixed') {
                        newPrice = currentPrice + adjustmentValue;
                    }
                    variant.price = Math.max(0, Math.round(newPrice));
                    return variant;
                });
                product.markModified('variants');
                changed = true;
            }

            if (changed) {
                await product.save();
                updatedCount++;
            }
        }

        res.json({ message: `Successfully updated prices for ${updatedCount} products.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductByIdOrSku,
    createProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    calculatePrice,
    bulkUpdatePrices
};
