require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    // Connect using existing DB config
    const connectDB = require('./config/db');
    await connectDB();

    const db = mongoose.connection;
    const collection = db.collection('products');
    // List indexes for debugging
    const indexes = await collection.indexes();
    console.log('Existing indexes:', indexes);
    // Attempt to drop sku_1 if exists
    const indexName = 'sku_1';
    try {
      await collection.dropIndex(indexName);
      console.log(`Dropped index ${indexName}`);
    } catch (err) {
      console.error('Error dropping index (may not exist):', err.message);
    }
    process.exit(0);
  } catch (err) {
    console.error('Failed to drop index:', err);
    process.exit(1);
  }
})();
