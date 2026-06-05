export const productsMetadata = [
   
    {
        id: "AMB-001",
        sku: "AMB-001",
        slug: "dr-babasaheb-ambेडकर-statue",
        name: {
            en: "Dr. B. R. Ambedkar Statue",
            mr: "डॉ. बाबासाहेब आंबेडकर पुतळा",
            hi: "डॉ. बाबासाहेब आंबेडकर प्रतिमा"
        },
        category: "devotion",
        subCategory: "accessories",
        type: "Premium",
        status: "active",
        isFeatured: true,
        basePrice: 12000,
        price: "12,000",
        description: "Exquisite sculpture of Dr. Babasaheb Ambedkar, capturing his iconic posture with constitution in hand.",
        material: {
            en: "Bronze powder coating",
            mr: "कांस्य पावडर कोटिंग",
            hi: "कांस्य पाउडर कोटिंग"
        },
        finish: "Bronze",
        weight: "6 KG",
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
        id: "SH-001",
        sku: "SH-001",
        slug: "rajarshi-shahu-maharaj-statue",
        name: {
            en: "Rajarshi Shahu Maharaj Statue",
            mr: "राजर्षी शाहू महाराज पुतळा",
            hi: "राजर्षी शाहू महाराज प्रतिमा"
        },
        category: "history",
        subCategory: "राजर्षी छत्रपती शाहू महाराज",
        type: "Basic",
        status: "active",
        isFeatured: false,
        basePrice: 3500,
        price: "3,500",
        description: "Beautifully carved statue of Rajarshi Shahu Maharaj, representing equality and progressive social reforms.",
        material: {
            en: "Resin",
            mr: "रेझिन",
            hi: "राल"
        },
        finish: "Marble White",
        weight: "2 KG",
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
    {
        id: "HA-001",
        sku: "HA-001",
        slug: "fiber-cannon",
        name: {
            en: "Fiber Cannon",
            mr: "फायबर तोफ",
            hi: "फाइबर तोप"
        },
        category: "history",
        subCategory: "ऐतिहासिक वस्तू",
        type: "Basic",
        status: "active",
        isFeatured: true,
        basePrice: 3500,
        price: "3,500",
        description: "Handcrafted exhibition-grade replica of the historic Maratha era cannon, finished in high-quality weather-resistant fiber.",
        material: {
            en: "Fiberglass",
            mr: "फायबरग्लास",
            hi: "फाइबरग्लास"
        },
        finish: "Black & Gold",
        weight: "3.5 KG",
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
        id: "HA-002",
        sku: "HA-002",
        slug: "metal-cannon-large",
        name: {
            en: "Metal Cannon (Large)",
            mr: "मेटल तोफ (मोठी)",
            hi: "धातु तोप (बड़ी)"
        },
        category: "history",
        subCategory: "ऐतिहासिक वस्तू",
        type: "Premium",
        status: "active",
        isFeatured: false,
        basePrice: 4500,
        price: "4,500",
        description: "Solid heavy metal casting of the classical fort defense cannons, showcasing premium details and bronze finish.",
        material: {
            en: "Metal",
            mr: "मेटल",
            hi: "धातु"
        },
        finish: "Brass Bronze",
        weight: "5.0 KG",
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
        id: "HA-003",
        sku: "HA-003",
        slug: "metal-cannon-medium",
        name: {
            en: "Metal Cannon (Medium)",
            mr: "मेटल तोफ (मध्यम)",
            hi: "धातु तोप (मध्यम)"
        },
        category: "history",
        subCategory: "ऐतिहासिक वस्तू",
        type: "Basic",
        status: "active",
        isFeatured: false,
        basePrice: 3000,
        price: "3,000",
        description: "Mid-sized historical metal cannon display piece, ideal for living rooms and office desks.",
        material: {
            en: "Metal",
            mr: "मेटल",
            hi: "धातु"
        },
        finish: "Brass Bronze",
        weight: "3.2 KG",
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
        id: "HA-004",
        sku: "HA-004",
        slug: "metal-cannon-small",
        name: {
            en: "Metal Cannon (Small)",
            mr: "मेटल तोफ (लहान)",
            hi: "धातु तोप (छोटी)"
        },
        category: "history",
        subCategory: "ऐतिहासिक वस्तू",
        type: "Basic",
        status: "active",
        isFeatured: false,
        basePrice: 1500,
        price: "1,500",
        description: "Miniature cast metal cannon artifact capturing the historic Maratha military heritage design.",
        material: {
            en: "Metal",
            mr: "मेटल",
            hi: "धातु"
        },
        finish: "Brass Bronze",
        weight: "1.5 KG",
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
        id: "HA-005",
        sku: "HA-005",
        slug: "sambhaji-maharaj-shambu-mudra",
        name: {
            en: "Chhatrapati Sambhaji Maharaj Shambu Mudra",
            mr: "छत्रपती संभाजी महाराज शंभू मुद्रा",
            hi: "छत्रपति संभाजी महाराज शंभू मुद्रा"
        },
        category: "history",
        subCategory: "ऐतिहासिक वस्तू",
        type: "Premium",
        status: "active",
        isFeatured: true,
        basePrice: 12000,
        price: "12,000",
        description: "Exquisite display frame of the royal seal (Rajmudra) of Chhatrapati Sambhaji Maharaj, detailing Sanskrit inscriptions.",
        material: {
            en: "Cast Metal & Wooden Frame",
            mr: "कास्ट मेटल आणि लाकडी फ्रेम",
            hi: "कास्ट मेटल और लकड़ी का फ्रेम"
        },
        finish: "Gold Plated",
        weight: "2.8 KG",
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
        id: "HA-006",
        sku: "HA-006",
        slug: "shivaji-maharaj-shiv-mudra",
        name: {
            en: "Chhatrapati Shivaji Maharaj Shiv Mudra",
            mr: "छत्रपती शिवाजी महाराज शिव मुद्रा",
            hi: "छत्रपति शिवाजी महाराज शिव मुद्रा"
        },
        category: "history",
        subCategory: "ऐतिहासिक वस्तू",
        type: "Premium",
        status: "active",
        isFeatured: true,
        basePrice: 12000,
        price: "12,000",
        description: "Magnificent replica of the royal seal (Rajmudra) of Chhatrapati Shivaji Maharaj, symbolizing sovereignty and welfare.",
        material: {
            en: "Cast Metal & Wooden Frame",
            mr: "कास्ट मेटल आणि लाकडी फ्रेम",
            hi: "कास्ट मेटल और लकड़ी का फ्रेम"
        },
        finish: "Gold Plated",
        weight: "2.8 KG",
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
        id: "HA-007",
        sku: "HA-007",
        slug: "shivrai-hon-coin",
        name: {
            en: "Shivrai Hon",
            mr: "शिवराई होण",
            hi: "शिवराई होण"
        },
        category: "history",
        subCategory: "ऐतिहासिक वस्तू",
        type: "Basic",
        status: "active",
        isFeatured: false,
        basePrice: 800,
        price: "800",
        description: "Authentic replicas of the copper currency coin minted during the coronation of Chhatrapati Shivaji Maharaj.",
        material: {
            en: "Copper Alloy",
            mr: "तांबे मिश्र धातु",
            hi: "तांबा मिश्र धातु"
        },
        finish: "Antique Patina",
        weight: "0.2 KG",
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
