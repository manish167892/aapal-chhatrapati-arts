require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Product = require('./models/Product');

// Root folder where collection images are stored (relative to project root)
const IMAGES_ROOT = path.join(__dirname, '..', 'client', 'public', 'images', 'IMAGE OF COLLECTION');

// Map top-level collection folder names to category identifiers used in the DB
const CATEGORY_MAP = {
  'History Collection': 'history',
  'Devotion Collection': 'devotion',
  'Heritage & Folk Art': 'heritage'
};

function getCategory(folderName) {
  return CATEGORY_MAP[folderName] || folderName.toLowerCase().replace(/\s+/g, '-');
}

async function importImages() {
  // Connect to MongoDB (uses same connection helper as other scripts)
  const connectDB = require('./config/db');
  await connectDB();

  const imageFiles = [];

  // Recursively walk the images directory and collect file paths
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        // Store path relative to IMAGES_ROOT so we can build the public URL later
        const relPath = path.relative(IMAGES_ROOT, fullPath);
        imageFiles.push(relPath);
      }
    }
  }

  walk(IMAGES_ROOT);

  console.log(`Found ${imageFiles.length} image files to import.`);

  for (const relPath of imageFiles) {
    // Split the relative path into its components
    const parts = relPath.split(path.sep);
    // Top‑level folder (e.g. "History Collection") determines the category
    const topFolder = parts[0];
    // If there is a sub‑folder, it becomes the subCategory; otherwise undefined
    const subFolder = parts.length > 2 ? parts[1] : null;
    const fileName = parts[parts.length - 1]; // keep the original filename

    // Build the public URL that the front‑end expects
    const imageUrl = encodeURI(`/images/IMAGE OF COLLECTION/${relPath.replace(/\\/g, '/')}`);

    const category = getCategory(topFolder);
    const subCategory = subFolder || undefined;

    // Use the filename (including extension) as the product name, exactly as requested
    const productName = fileName;

    // Generate a simple slug from the filename (strip extension, lower‑case, replace spaces)
    const slug = fileName.replace(/\.[^/.]+$/, '').toLowerCase().replace(/\s+/g, '-');

    // Construct a minimal product document – pricing, SKU, inventory are intentionally left empty
    const productDoc = {
      sku: '',
      slug,
      name: productName,
      category,
      subCategory,
      type: 'Basic',
      status: 'active',
      basePrice: null,
      description: '',
      material: '',
      finish: '',
      weight: null,
      images: [imageUrl],
      trackInventory: false,
      stockQuantity: null,
      variants: []
    };

    try {
      await Product.create(productDoc);
      console.log(`Imported product: ${productName} → category: ${category}${subCategory ? ', subCategory: ' + subCategory : ''}`);
    } catch (err) {
      console.error('Failed to import', productName, err);
    }
  }

  console.log('Image import completed.');
  process.exit(0);
}

importImages().catch(err => {
  console.error('Import script error:', err);
  process.exit(1);
});
