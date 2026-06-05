require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

async function dropSkuIndex() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = mongoose.connection.collection('products');
  try {
    await collection.dropIndex('sku_1');
    console.log('SKU index dropped successfully.');
  } catch (err) {
    console.error('Error dropping SKU index:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

dropSkuIndex();
