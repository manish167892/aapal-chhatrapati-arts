const mongoose = require('mongoose');
const { PRODUCT_TYPES, PRODUCT_STATUSES, PRICE_ADJUSTMENT_TYPES } = require('../../shared/constants');

const ChoiceSchema = new mongoose.Schema({
    value: { type: String, required: true },
    priceAdjustment: { type: Number, default: 0 },
    priceAdjustmentType: { type: String, enum: PRICE_ADJUSTMENT_TYPES, default: 'fixed' }
}, { _id: false });

const CustomizationOptionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['dropdown', 'text', 'radio'], required: true },
    choices: [ChoiceSchema]
}, { _id: false });

const TranslationSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String }
}, { _id: false });

const VariantSchema = new mongoose.Schema({
    sku: { type: String, required: true },
    size: { type: String, required: true },
    finish: { type: String },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    type: { type: String, enum: PRODUCT_TYPES, required: true },
    status: { type: String, enum: PRODUCT_STATUSES, default: 'draft' },
    isFeatured: { type: Boolean, default: false },
    slug: { type: String, required: true, unique: true, index: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    images: [{ type: String }],
    basePrice: { type: Number, default: null },
    sku: { type: String, default: undefined },
    description: { type: String, default: '' },
    material: { type: String },
    finish: { type: String },
    weight: { type: Number },
    dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number }
    },
    trackInventory: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 0 },
    lowStockAlertLevel: { type: Number, default: 5 },
    customizationOptions: [CustomizationOptionSchema],
    variants: [VariantSchema],
    translations: {
        en: TranslationSchema,
        mr: TranslationSchema,
        hi: TranslationSchema
    }
}, { timestamps: true });

// Create indexes for efficient querying
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ isFeatured: 1, status: 1 });

module.exports = mongoose.model('Product', ProductSchema);
