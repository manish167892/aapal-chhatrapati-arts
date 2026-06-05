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
  // Connect to MongoDB
  const connectDB = require('./config/db');
  await connectDB();

  const imageFiles = [];

  // Recursively walk the images directory
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        // Only process image files
        if (entry.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
          const relPath = path.relative(IMAGES_ROOT, fullPath);
          imageFiles.push(relPath);
        }
      }
    }
  }

  walk(IMAGES_ROOT);
  console.log(`Found ${imageFiles.length} image files.`);

  // Grouping logic
  // Map key: Product identifier. Value: product data object
  const productsMap = new Map();

  for (const relPath of imageFiles) {
    const parts = relPath.split(path.sep);
    // parts = [TopLevel, SubLevel, ProductFolder, ImageFile] depending on depth
    
    let categoryFolder = null;
    let subCategoryFolder = null;
    let productFolder = null;
    let fileName = null;

    if (parts.length === 1) {
      // Loose file in root
      fileName = parts[0];
      categoryFolder = 'Uncategorized';
    } else if (parts.length === 2) {
      // e.g. Devotion Collection/Devotion_Collection.png
      categoryFolder = parts[0];
      fileName = parts[1];
    } else if (parts.length === 3) {
      // e.g. Devotion Collection/श्री गणेश/उशी बाल गणेश.jpeg
      categoryFolder = parts[0];
      subCategoryFolder = parts[1];
      fileName = parts[2];
    } else if (parts.length >= 4) {
      // e.g. History Collection/छत्रपती शिवाजी महाराज/महयोद्धा - बावडा चौक १३ inch/3.jpeg
      categoryFolder = parts[0];
      subCategoryFolder = parts[1];
      productFolder = parts[parts.length - 2]; // Immediate parent folder
      fileName = parts[parts.length - 1];
    }

    const category = getCategory(categoryFolder);
    const subCategory = subCategoryFolder || undefined;

    // Determine Product Name and unique Map Key
    let productName;
    let mapKey;

    if (productFolder) {
      // Depth >= 4: The folder is the product. All images in it go to the gallery.
      productName = productFolder;
      mapKey = `${category}_${subCategory}_${productFolder}`;
    } else {
      // Depth 2 or 3: The file itself is an individual product.
      productName = fileName.replace(/\.[^/.]+$/, ''); // remove extension
      mapKey = `${category}_${subCategory}_${fileName}`;
    }

    const imageUrl = `/images/IMAGE OF COLLECTION/${relPath.replace(/\\/g, '/')}`;

    if (!productsMap.has(mapKey)) {
      // Generate a simple slug. We only replace spaces with hyphens. 
      // We don't strip non-word characters to preserve Marathi Unicode.
      let slug = productName.trim().toLowerCase().replace(/\s+/g, '-');
      // Remove any characters that could break URLs (like ?, &, #, /, %)
      slug = slug.replace(/[?&#\/%]/g, '');

      productsMap.set(mapKey, {
        sku: undefined, // Let it be undefined to avoid unique index issues
        slug: slug || Date.now().toString(), // fallback if regex strips everything
        name: productName,
        category,
        subCategory,
        type: 'Basic',
        status: 'active',
        basePrice: null, // intentionally null for imported bulk
        description: '',
        material: '',
        finish: '',
        weight: null,
        images: [imageUrl],
        trackInventory: false,
        stockQuantity: null,
        variants: []
      });
    } else {
      // If product already exists (e.g. second image in a ProductFolder), append image
      const existingProduct = productsMap.get(mapKey);
      existingProduct.images.push(imageUrl);
    }
  }

  // Clear existing imported products (those with basePrice: null) to avoid duplicates
  console.log('Clearing old imported products...');
  await Product.deleteMany({ basePrice: null });

  console.log(`Starting import of ${productsMap.size} distinct products...`);

  // Insert products
  let importedCount = 0;
  for (const productDoc of productsMap.values()) {
    try {
      await Product.create(productDoc);
      importedCount++;
    } catch (err) {
      console.error('Failed to import', productDoc.name, err.message);
    }
  }

  console.log(`Successfully imported ${importedCount} products out of ${productsMap.size}.`);
  process.exit(0);
}

importImages().catch(err => {
  console.error('Import script error:', err);
  process.exit(1);
});
