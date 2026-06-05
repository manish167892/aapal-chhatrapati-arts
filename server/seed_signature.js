require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const seedSignatureProducts = async () => {
    try {
        await connectDB();

        // SKU list to delete
        const skusToDelete = [
            "SM-001", "AMB-001", "SH-001",
            "HA-001", "HA-002", "HA-003", "HA-004", "HA-005", "HA-006", "HA-007"
        ];
        await Product.deleteMany({ sku: { $in: skusToDelete } });

        const productsToSeed = [
            {
                sku: "SM-001",
                slug: "singhasanadhishwar-chhatrapati-sambhaji-maharaj",
                name: "Sinhasanadhishwar Chhatrapati Sambhaji Maharaj",
                category: "history",
                subCategory: "sambhaji-maharaj",
                type: "Premium",
                status: "active",
                isFeatured: true,
                basePrice: 8500,
                description: "A crown jewel of the Aapal Chhatrapati Arts collection. This exclusive, copyrighted design captures the commanding presence of Chhatrapati Sambhaji Maharaj.",
                material: "Marble Powder + Resin",
                finish: "Antique Gold",
                weight: 4.5,
                images: ["/images/sambhaji maharaj/1.jpeg"],
                trackInventory: true,
                stockQuantity: 12,
                variants: [
                    { sku: "SM-001-12", size: "12 Inch", finish: "Antique Gold", price: 4500, stockQuantity: 8 },
                    { sku: "SM-001-24", size: "24 Inch", finish: "Antique Gold", price: 8500, stockQuantity: 4 }
                ],
                translations: {
                    en: { name: "Sinhasanadhishwar Chhatrapati Sambhaji Maharaj" },
                    mr: { name: "सिंहासनाधीश्वर छत्रपती संभाजी महाराज" },
                    hi: { name: "सिंहासनाधीश्वर छत्रपति संभाजी महाराज" }
                }
            },
            {
                sku: "AMB-001",
                slug: "dr-babasaheb-ambेडकर-statue",
                name: "Dr. B. R. Ambedkar Statue",
                category: "Ambedkar",
                subCategory: "statues",
                type: "Premium",
                status: "active",
                isFeatured: true,
                basePrice: 12000,
                description: "Exquisite sculpture of Dr. Babasaheb Ambedkar, capturing his iconic posture with constitution in hand.",
                material: "Bronze powder coating",
                finish: "Bronze",
                weight: 6,
                images: ["/images/product_heritage.png"],
                trackInventory: true,
                stockQuantity: 10,
                variants: [
                    { sku: "AMB-001-12", size: "12 Inch", finish: "Bronze", price: 5000, stockQuantity: 5 },
                    { sku: "AMB-001-24", size: "24 Inch", finish: "Bronze", price: 12000, stockQuantity: 3 },
                    { sku: "AMB-001-36", size: "36 Inch", finish: "Bronze", price: 25000, stockQuantity: 2 }
                ],
                translations: {
                    en: { name: "Dr. B. R. Ambedkar Statue" },
                    mr: { name: "डॉ. बाबासाहेब आंबेडकर पुतळा" },
                    hi: { name: "डॉ. बाबासाहेब आंबेडकर प्रतिमा" }
                }
            },
            {
                sku: "SH-001",
                slug: "rajarshi-shahu-maharaj-statue",
                name: "Rajarshi Shahu Maharaj Statue",
                category: "Shahu Maharaj",
                subCategory: "statues",
                type: "Basic",
                status: "active",
                isFeatured: false,
                basePrice: 3500,
                description: "Beautifully carved statue of Rajarshi Shahu Maharaj, representing equality and progressive social reforms.",
                material: "Resin",
                finish: "Marble White",
                weight: 2,
                images: ["/images/product_history.png"],
                trackInventory: true,
                stockQuantity: 15,
                variants: [
                    { sku: "SH-001-9", size: "9 Inch", finish: "Marble White", price: 2000, stockQuantity: 10 },
                    { sku: "SH-001-15", size: "15 Inch", finish: "Marble White", price: 3500, stockQuantity: 5 }
                ],
                translations: {
                    en: { name: "Rajarshi Shahu Maharaj Statue" },
                    mr: { name: "राजर्षी शाहू महाराज पुतळा" },
                    hi: { name: "राजर्षी शाहू महाराज प्रतिमा" }
                }
            },
            // The 7 Historical Artifacts (ऐतिहासिक वस्तू)
            {
                sku: "HA-001",
                slug: "fiber-cannon",
                name: "Fiber Cannon",
                category: "history",
                subCategory: "historical-artifacts",
                type: "Basic",
                status: "active",
                isFeatured: true,
                basePrice: 3500,
                description: "Handcrafted exhibition-grade replica of the historic Maratha era cannon, finished in high-quality weather-resistant fiber.",
                material: "Fiberglass",
                finish: "Black & Gold",
                weight: 3.5,
                images: ["/images/IMAGE OF COLLECTION/History Collection/ऐतिहासिक वस्तू/fiber cannon.jpeg"],
                trackInventory: true,
                stockQuantity: 20,
                translations: {
                    en: { name: "Fiber Cannon" },
                    mr: { name: "फायबर तोफ" },
                    hi: { name: "फाइबर तोप" }
                }
            },
            {
                sku: "HA-002",
                slug: "metal-cannon-large",
                name: "Metal Cannon (Large)",
                category: "history",
                subCategory: "historical-artifacts",
                type: "Premium",
                status: "active",
                isFeatured: false,
                basePrice: 4500,
                description: "Solid heavy metal casting of the classical fort defense cannons, showcasing premium details and bronze finish.",
                material: "Metal",
                finish: "Brass Bronze",
                weight: 5.0,
                images: ["/images/IMAGE OF COLLECTION/History Collection/ऐतिहासिक वस्तू/Metal Cannon Large.jpeg"],
                trackInventory: true,
                stockQuantity: 12,
                translations: {
                    en: { name: "Metal Cannon (Large)" },
                    mr: { name: "मेटल तोफ (मोठी)" },
                    hi: { name: "धातु तोप (बड़ी)" }
                }
            },
            {
                sku: "HA-003",
                slug: "metal-cannon-medium",
                name: "Metal Cannon (Medium)",
                category: "history",
                subCategory: "historical-artifacts",
                type: "Basic",
                status: "active",
                isFeatured: false,
                basePrice: 3000,
                description: "Mid-sized historical metal cannon display piece, ideal for living rooms and office desks.",
                material: "Metal",
                finish: "Brass Bronze",
                weight: 3.2,
                images: ["/images/IMAGE OF COLLECTION/History Collection/ऐतिहासिक वस्तू/Metal Cannon medium.jpeg"],
                trackInventory: true,
                stockQuantity: 18,
                translations: {
                    en: { name: "Metal Cannon (Medium)" },
                    mr: { name: "मेटल तोफ (मध्यम)" },
                    hi: { name: "धातु तोप (मध्यम)" }
                }
            },
            {
                sku: "HA-004",
                slug: "metal-cannon-small",
                name: "Metal Cannon (Small)",
                category: "history",
                subCategory: "historical-artifacts",
                type: "Basic",
                status: "active",
                isFeatured: false,
                basePrice: 1500,
                description: "Miniature cast metal cannon artifact capturing the historic Maratha military heritage design.",
                material: "Metal",
                finish: "Brass Bronze",
                weight: 1.5,
                images: ["/images/IMAGE OF COLLECTION/History Collection/ऐतिहासिक वस्तू/Metal Cannon small.jpeg"],
                trackInventory: true,
                stockQuantity: 25,
                translations: {
                    en: { name: "Metal Cannon (Small)" },
                    mr: { name: "मेटल तोफ (लहान)" },
                    hi: { name: "धातु तोप (छोटी)" }
                }
            },
            {
                sku: "HA-005",
                slug: "sambhaji-maharaj-shambu-mudra",
                name: "Chhatrapati Sambhaji Maharaj Shambu Mudra",
                category: "history",
                subCategory: "historical-artifacts",
                type: "Premium",
                status: "active",
                isFeatured: true,
                basePrice: 12000,
                description: "Exquisite display frame of the royal seal (Rajmudra) of Chhatrapati Sambhaji Maharaj, detailing Sanskrit inscriptions.",
                material: "Cast Metal & Wooden Frame",
                finish: "Gold Plated",
                weight: 2.8,
                images: ["/images/IMAGE OF COLLECTION/History Collection/ऐतिहासिक वस्तू/शंभू मुद्रा.jpeg"],
                trackInventory: true,
                stockQuantity: 15,
                translations: {
                    en: { name: "Chhatrapati Sambhaji Maharaj Shambu Mudra" },
                    mr: { name: "छत्रपती संभाजी महाराज शंभू मुद्रा" },
                    hi: { name: "छत्रपति संभाजी महाराज शंभू मुद्रा" }
                }
            },
            {
                sku: "HA-006",
                slug: "shivaji-maharaj-shiv-mudra",
                name: "Chhatrapati Shivaji Maharaj Shiv Mudra",
                category: "history",
                subCategory: "historical-artifacts",
                type: "Premium",
                status: "active",
                isFeatured: true,
                basePrice: 12000,
                description: "Magnificent replica of the royal seal (Rajmudra) of Chhatrapati Shivaji Maharaj, symbolizing sovereignty and welfare.",
                material: "Cast Metal & Wooden Frame",
                finish: "Gold Plated",
                weight: 2.8,
                images: ["/images/IMAGE OF COLLECTION/History Collection/ऐतिहासिक वस्तू/शिव मुद्रा.jpeg"],
                trackInventory: true,
                stockQuantity: 15,
                translations: {
                    en: { name: "Chhatrapati Shivaji Maharaj Shiv Mudra" },
                    mr: { name: "छत्रपती शिवाजी महाराज शिव मुद्रा" },
                    hi: { name: "छत्रपति शिवाजी महाराज शिव मुद्रा" }
                }
            },
            {
                sku: "HA-007",
                slug: "shivrai-hon-coin",
                name: "Shivrai Hon",
                category: "history",
                subCategory: "historical-artifacts",
                type: "Basic",
                status: "active",
                isFeatured: false,
                basePrice: 800,
                description: "Authentic replicas of the copper currency coin minted during the coronation of Chhatrapati Shivaji Maharaj.",
                material: "Copper Alloy",
                finish: "Antique Patina",
                weight: 0.2,
                images: ["/images/IMAGE OF COLLECTION/History Collection/ऐतिहासिक वस्तू/शिवराई होण.jpeg"],
                trackInventory: true,
                stockQuantity: 100,
                translations: {
                    en: { name: "Shivrai Hon" },
                    mr: { name: "शिवराई होण" },
                    hi: { name: "शिवराई होण" }
                }
            }
        ];

        for (const prod of productsToSeed) {
            console.log(`Creating product: ${prod.sku} (${prod.name})`);
            await Product.create(prod);
        }

        console.log("Database seeded successfully with variants, custom categories, and 7 historical artifacts!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedSignatureProducts();
