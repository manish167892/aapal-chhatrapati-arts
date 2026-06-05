require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');

async function findAndRemoveDuplicates() {
    await connectDB();

    // Get all active products
    const products = await Product.find({ status: 'active' }).sort({ createdAt: -1 });
    console.log(`\nTotal active products: ${products.length}\n`);

    // Group by name (case-insensitive) to find duplicates
    const nameMap = new Map();
    for (const p of products) {
        const key = (p.name || '').toLowerCase().trim();
        if (!nameMap.has(key)) {
            nameMap.set(key, []);
        }
        nameMap.get(key).push(p);
    }

    // Also group by slug to find slug duplicates
    const slugMap = new Map();
    for (const p of products) {
        const key = (p.slug || '').toLowerCase().trim();
        if (!slugMap.has(key)) {
            slugMap.set(key, []);
        }
        slugMap.get(key).push(p);
    }

    console.log('=== DUPLICATE PRODUCTS (by name) ===');
    let duplicateCount = 0;
    const idsToRemove = [];

    for (const [name, items] of nameMap) {
        if (items.length > 1) {
            duplicateCount++;
            console.log(`\nDuplicate: "${name}" (${items.length} copies)`);
            // Keep the first one (newest, since sorted by createdAt desc)
            // If any has basePrice set (seeded product), keep that one
            const seeded = items.find(i => i.basePrice !== null && i.basePrice !== undefined);
            const keepItem = seeded || items[0];
            
            for (const item of items) {
                const isKeep = item._id.equals(keepItem._id);
                console.log(`  ${isKeep ? 'KEEP' : 'REMOVE'} - _id: ${item._id}, sku: ${item.sku || 'none'}, slug: ${item.slug}, basePrice: ${item.basePrice}, category: ${item.category}, subCategory: ${item.subCategory}`);
                if (!isKeep) {
                    idsToRemove.push(item._id);
                }
            }
        }
    }

    if (duplicateCount === 0) {
        console.log('No duplicates found by name.');
    }

    console.log(`\n=== SUMMARY ===`);
    console.log(`Total products: ${products.length}`);
    console.log(`Duplicate groups: ${duplicateCount}`);
    console.log(`Products to remove: ${idsToRemove.length}`);

    if (idsToRemove.length > 0) {
        console.log('\nRemoving duplicates...');
        const result = await Product.deleteMany({ _id: { $in: idsToRemove } });
        console.log(`Removed ${result.deletedCount} duplicate products.`);
        
        const remaining = await Product.countDocuments({ status: 'active' });
        console.log(`Remaining active products: ${remaining}`);
    }

    process.exit(0);
}

findAndRemoveDuplicates().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
