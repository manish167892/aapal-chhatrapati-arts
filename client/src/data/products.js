import { productsMetadata } from './productsMetadata';

// Dynamically discover all images under public/images/IMAGE OF COLLECTION at compile time
const imageModules = import.meta.glob('/public/images/IMAGE OF COLLECTION/**/*.{jpg,jpeg,png,webp,gif}', { eager: true });

const CATEGORY_MAP = {
  'History Collection': 'history',
  'Devotion Collection': 'devotion',
  'Heritage & Folk Art': 'heritage'
};

const getCategory = (folderName) => {
  return CATEGORY_MAP[folderName] || folderName.toLowerCase().replace(/\s+/g, '-');
};

const prefix = '/public/images/IMAGE OF COLLECTION/';
const discoveredMap = new Map();

// Parse and group globbed images
Object.keys(imageModules).forEach((key) => {
  if (!key.startsWith(prefix)) return;
  const relPath = key.substring(prefix.length);
  const parts = relPath.split('/');

  let categoryFolder = null;
  let subCategoryFolder = null;
  let productFolder = null;
  let fileName = null;

  if (parts.length === 1) {
    fileName = parts[0];
    categoryFolder = 'Uncategorized';
  } else if (parts.length === 2) {
    categoryFolder = parts[0];
    fileName = parts[1];
    // Skip category main banners
    if (fileName.match(/(HISTORY_COLLECTION|Devotion_Collection|Heritage & Folk Art)\.png$/i)) {
      return;
    }
  } else if (parts.length === 3) {
    categoryFolder = parts[0];
    subCategoryFolder = parts[1];
    fileName = parts[2];
  } else if (parts.length >= 4) {
    categoryFolder = parts[0];
    subCategoryFolder = parts[1];
    productFolder = parts[parts.length - 2];
    fileName = parts[parts.length - 1];
  }

  const category = getCategory(categoryFolder);
  const subCategory = subCategoryFolder || undefined;

  let productName;
  let mapKey;

  if (productFolder) {
    productName = productFolder;
    mapKey = `${category}_${subCategory}_${productFolder}`;
  } else {
    productName = fileName.replace(/\.[^/.]+$/, '');
    mapKey = `${category}_${subCategory}_${fileName}`;
  }

  // Vite serves public assets without the /public prefix
  const imageUrl = key.replace(/^\/public/, '');

  if (!discoveredMap.has(mapKey)) {
    let slug = productName.trim().toLowerCase().replace(/\s+/g, '-');
    slug = slug.replace(/[?&#\/%]/g, '');

    discoveredMap.set(mapKey, {
      name: productName,
      category,
      subCategory,
      slug,
      images: [imageUrl]
    });
  } else {
    discoveredMap.get(mapKey).images.push(imageUrl);
  }
});

// Build final list of products, merging discovered folder structure with metadata
const finalProducts = [];
const matchedMetadataSlugs = new Set();

discoveredMap.forEach((discovered) => {
  // Try to find matching metadata product
  const meta = productsMetadata.find(m => 
    m.slug === discovered.slug ||
    (typeof m.name === 'object' && m.name.en === discovered.name) ||
    m.name === discovered.name
  );

  if (meta) {
    matchedMetadataSlugs.add(meta.slug);
    finalProducts.push({
      ...discovered,
      ...meta,
      images: meta.images && meta.images.length > 0 ? meta.images : discovered.images,
      // If the subCategory from folder is set, we prefer the folder's subCategory (with Marathi characters)
      subCategory: discovered.subCategory || meta.subCategory,
      type: meta.type || 'Basic',
      status: meta.status || 'active'
    });
  } else {
    finalProducts.push({
      id: discovered.slug,
      sku: discovered.slug,
      slug: discovered.slug,
      name: {
        en: discovered.name,
        mr: discovered.name,
        hi: discovered.name
      },
      category: discovered.category,
      subCategory: discovered.subCategory,
      type: 'Basic',
      status: 'active',
      images: discovered.images,
      stock: 10,
      stockQuantity: 10,
      basePrice: null,
      price: null,
      description: '',
      material: '',
      finish: '',
      weight: ''
    });
  }
});

// Add metadata products that were not discovered via folders (e.g. they point to images outside the IMAGE OF COLLECTION directory)
productsMetadata.forEach((meta) => {
  if (!matchedMetadataSlugs.has(meta.slug)) {
    finalProducts.push({
      id: meta.id || meta.slug,
      sku: meta.sku || meta.slug,
      ...meta,
      type: meta.type || 'Premium',
      status: meta.status || 'active'
    });
  }
});

export const products = finalProducts;
