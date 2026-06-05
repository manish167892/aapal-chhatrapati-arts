const Joi = require('joi');
const { PRODUCT_TYPES, PRODUCT_STATUSES, PRICE_ADJUSTMENT_TYPES } = require('./constants');

const productSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    subCategory: Joi.string().optional().allow(''),
    type: Joi.string().valid(...PRODUCT_TYPES).required(),
    status: Joi.string().valid(...PRODUCT_STATUSES).default('draft'),
    isFeatured: Joi.boolean().default(false),
    slug: Joi.string().required(),
    metaTitle: Joi.string().optional().allow(''),
    metaDescription: Joi.string().optional().allow(''),
    images: Joi.array().items(Joi.string().uri().allow('')).optional(),
    basePrice: Joi.number().min(0).optional(),
    sku: Joi.string().optional(),
    description: Joi.string().optional(),
    material: Joi.string().optional().allow(''),
    finish: Joi.string().optional().allow(''),
    weight: Joi.number().min(0).optional(),
    dimensions: Joi.object({
        length: Joi.number().min(0).optional(),
        width: Joi.number().min(0).optional(),
        height: Joi.number().min(0).optional(),
    }).optional(),
    trackInventory: Joi.boolean().default(true),
    stockQuantity: Joi.number().min(0).default(0),
    lowStockAlertLevel: Joi.number().min(0).default(5),
    customizationOptions: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            type: Joi.string().valid('dropdown', 'text', 'radio').required(),
            choices: Joi.array().items(
                Joi.object({
                    value: Joi.string().required(),
                    priceAdjustment: Joi.number().default(0),
                    priceAdjustmentType: Joi.string().valid(...PRICE_ADJUSTMENT_TYPES).default('fixed')
                })
            ).optional()
        })
    ).optional(),
    variants: Joi.array().items(
        Joi.object({
            sku: Joi.string().required(),
            size: Joi.string().required(),
            finish: Joi.string().optional().allow(''),
            price: Joi.number().min(0).required(),
            stockQuantity: Joi.number().min(0).default(0)
        })
    ).optional(),
    translations: Joi.object({
        en: Joi.object().optional(),
        mr: Joi.object().optional(),
        hi: Joi.object().optional(),
    }).optional()
});

module.exports = {
    productSchema
};
