// Debug script to simulate what Vite import.meta.glob discovers
// and compare with URL parameter values
import { readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const BASE = 'public/images/IMAGE OF COLLECTION';
const CATEGORY_MAP = {
  'History Collection': 'history',
  'Devotion Collection': 'devotion',
  'Heritage & Folk Art': 'heritage'
};

function toHex(str) {
  return Array.from(str).map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ');
}

function walkDir(dir, results = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, results);
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

// Discover all images
const allImages = walkDir(BASE);
console.log(`\n=== Total images discovered: ${allImages.length} ===\n`);

// Parse into products like the Vite loader does
const discoveredMap = new Map();

for (const imgPath of allImages) {
  const relPath = relative(BASE, imgPath).replace(/\\/g, '/');
  const parts = relPath.split('/');
  
  let categoryFolder = null, subCategoryFolder = null, productFolder = null, fileName = null;
  
  if (parts.length === 1) {
    fileName = parts[0];
    categoryFolder = 'Uncategorized';
  } else if (parts.length === 2) {
    categoryFolder = parts[0];
    fileName = parts[1];
    if (fileName.match(/(HISTORY_COLLECTION|Devotion_Collection|Heritage & Folk Art)\.png$/i)) continue;
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
  
  const category = CATEGORY_MAP[categoryFolder] || categoryFolder?.toLowerCase().replace(/\s+/g, '-');
  const subCategory = subCategoryFolder || undefined;
  
  let productName, mapKey;
  if (productFolder) {
    productName = productFolder;
    mapKey = `${category}_${subCategory}_${productFolder}`;
  } else {
    productName = fileName.replace(/\.[^/.]+$/, '');
    mapKey = `${category}_${subCategory}_${fileName}`;
  }
  
  if (!discoveredMap.has(mapKey)) {
    discoveredMap.set(mapKey, { name: productName, category, subCategory, images: [relPath] });
  } else {
    discoveredMap.get(mapKey).images.push(relPath);
  }
}

// Summarize
const products = Array.from(discoveredMap.values());
console.log(`Total product entries: ${products.length}\n`);

// All unique subCategories
const allSubCats = [...new Set(products.map(p => p.subCategory || 'NONE'))];
console.log('=== All unique subCategory values ===');
allSubCats.forEach(sc => {
  console.log(`  "${sc}" (length: ${sc.length}, hex: ${toHex(sc)})`);
});

// History subcategories specifically
const historyProducts = products.filter(p => p.category === 'history');
console.log(`\n=== History products: ${historyProducts.length} ===`);
const historySubCats = [...new Set(historyProducts.map(p => p.subCategory || 'NONE'))];
console.log('History subCategories:');
historySubCats.forEach(sc => {
  const count = historyProducts.filter(p => (p.subCategory || 'NONE') === sc).length;
  console.log(`  "${sc}" (${count} products, length: ${sc.length}, hex: ${toHex(sc)})`);
});

// Now simulate the URL parameter comparison
const urlParam = 'छत्रपती शिवाजी महाराज';
console.log(`\n=== URL Parameter Comparison ===`);
console.log(`URL param: "${urlParam}"`);
console.log(`URL param hex: ${toHex(urlParam)}`);
console.log(`URL param length: ${urlParam.length}`);

// Check NFC normalization
const nfcParam = urlParam.normalize('NFC');
const nfdParam = urlParam.normalize('NFD');
console.log(`NFC normalized: "${nfcParam}" (same? ${nfcParam === urlParam})`);
console.log(`NFD normalized: "${nfdParam}" (same? ${nfdParam === urlParam})`);

historySubCats.forEach(sc => {
  if (sc === 'NONE') return;
  const exact = sc === urlParam;
  const nfcMatch = sc.normalize('NFC') === nfcParam;
  const trimMatch = sc.trim() === urlParam.trim();
  console.log(`\n  Comparing with folder subCategory: "${sc}"`);
  console.log(`    Exact match: ${exact}`);
  console.log(`    NFC match: ${nfcMatch}`);
  console.log(`    Trim match: ${trimMatch}`);
  console.log(`    Folder hex: ${toHex(sc)}`);
  console.log(`    Param hex:  ${toHex(urlParam)}`);
  
  // Character-by-character comparison
  if (!exact) {
    const maxLen = Math.max(sc.length, urlParam.length);
    for (let i = 0; i < maxLen; i++) {
      const c1 = sc[i];
      const c2 = urlParam[i];
      if (c1 !== c2) {
        console.log(`    DIFF at index ${i}: folder=${c1 ? 'U+' + c1.codePointAt(0).toString(16).toUpperCase() : 'MISSING'} vs param=${c2 ? 'U+' + c2.codePointAt(0).toString(16).toUpperCase() : 'MISSING'} ("${c1 || ''}" vs "${c2 || ''}")`);
      }
    }
  }
});
