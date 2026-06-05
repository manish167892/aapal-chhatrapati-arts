require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');

async function listAll() {
    await connectDB();
    const products = await Product.find({ status: 'active' }).sort({ category: 1, subCategory: 1, name: 1 });
    
    console.log(`\nTotal active products: ${products.length}\n`);
    console.log('ID | SKU | Slug | Name | Category | SubCategory | BasePrice | Images');
    console.log('-'.repeat(150));
    
    for (const p of products) {
        console.log(`${p._id} | ${p.sku || '-'} | ${p.slug} | ${p.name} | ${p.category} | ${p.subCategory || '-'} | ${p.basePrice ?? 'null'} | ${(p.images || []).length} imgs`);
    }
    
    // Also show a grouped view
    const catMap = new Map();
    for (const p of products) {
        const key = `${p.category} > ${p.subCategory || 'none'}`;
        if (!catMap.has(key)) catMap.set(key, []);
        catMap.get(key).push(p);
    }
    
    console.log('\n\n=== GROUPED VIEW ===');
    for (const [key, items] of catMap) {
        console.log(`\n${key} (${items.length} products):`);
        for (const p of items) {
            console.log(`  - ${p.name} (slug: ${p.slug}, price: ${p.basePrice ?? 'null'}, sku: ${p.sku || '-'})`);
        }
    }

    process.exit(0);
}

listAll().catch(err => { console.error(err); process.exit(1); });
