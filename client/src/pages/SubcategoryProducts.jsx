import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import ProductCard from '../components/ui/ProductCard';
import { products as localProducts } from '../data/products';
import './CollectionStyles.css';

const SubcategoryProducts = () => {
    // subcategory here will be the folder name (e.g. "श्री गणेश") decoded by react-router
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const title = subcategory; 
    const categoryTitle = category === 'history' ? t('historyTitle') || 'Historical Collection' : t('devotionTitle') || 'Devotion Collection';

    useEffect(() => {
        fetchProducts();
    }, [category, subcategory]);

    const fetchProducts = () => {
        setLoading(true);
        try {
            // === DEBUG START ===
            const toHex = (str) => Array.from(str).map(c => c.codePointAt(0).toString(16).padStart(4, '0')).join(' ');
            console.group('[SubcategoryProducts] DEBUG');
            console.log('useParams category:', JSON.stringify(category));
            console.log('useParams subcategory:', JSON.stringify(subcategory));
            console.log('subcategory hex:', toHex(subcategory || ''));
            console.log('subcategory length:', (subcategory || '').length);
            
            // Log all unique subCategory values from local products
            const allSubCats = [...new Set(localProducts.map(p => p.subCategory || p.subcategory || ''))];
            console.log('All discovered subCategory values:', allSubCats);
            allSubCats.forEach(sc => {
                console.log(`  subCat "${sc}" hex: ${toHex(sc)}, length: ${sc.length}, match: ${sc === subcategory}`);
            });

            // Log category-filtered products
            const catFiltered = localProducts.filter(p =>
                (p.category || '').toLowerCase() === category.toLowerCase()
            );
            console.log('Products matching category:', catFiltered.length);

            // Filter local products by exact category and subCategory (folder name)
            const filteredData = localProducts.filter(p =>
                (p.category || '').toLowerCase() === category.toLowerCase() &&
                (p.subCategory || p.subcategory || '') === subcategory &&
                p.status === 'active'
            );

            console.log('Products matching category + subcategory + active:', filteredData.length);
            if (filteredData.length === 0 && catFiltered.length > 0) {
                console.warn('NO MATCH — showing first 3 category products for comparison:');
                catFiltered.slice(0, 3).forEach(p => {
                    const pSub = p.subCategory || p.subcategory || '';
                    console.log(`  product "${p.name?.en || p.name}" subCategory: "${pSub}" (hex: ${toHex(pSub)}) status: ${p.status}`);
                });
            }
            console.groupEnd();
            // === DEBUG END ===

            setProducts(filteredData);
        } catch (error) {
            console.error("Error filtering products", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="category-overview-page">
            <div className="container">

                {/* Breadcrumbs / Back navigation */}
                <div style={{ marginBottom: "2rem" }}>
                    <button
                        onClick={() => navigate(`/collection/${category}`)}
                        className="btn btn-outline"
                        style={{ padding: "0.5rem 1rem", minHeight: "auto" }}
                    >
                        <span>&larr;</span> Back to {categoryTitle}
                    </button>
                </div>

                {/* Header Section */}
                <div className="co-header section-title align-center">
                    <motion.h1
                        className="co-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {title}
                    </motion.h1>
                    <div className="title-decorator"></div>
                </div>

                {/* Products Grid */}
                <div>
                    {loading ? (
                        <div className="co-header" style={{ padding: "4rem 0" }}>
                            <span className="loader" style={{ marginBottom: "1rem" }}></span>
                            <div style={{ color: "var(--color-primary)", fontSize: "1.2rem" }}>Loading {title}...</div>
                        </div>
                    ) : (
                        <>
                            {products.length === 0 ? (
                                <motion.div
                                    className="co-header"
                                    style={{ padding: "4rem 2rem", border: "1px solid rgba(147, 135, 117, 0.2)", borderRadius: "var(--radius-lg)", background: "rgba(55, 54, 52, 0.05)" }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <p className="co-title" style={{ fontSize: "1.5rem" }}>No artifacts found in this collection.</p>
                                    <p className="co-description" style={{ marginBottom: "2rem" }}>We are continually curating new pieces. Please check back later.</p>
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => navigate(`/collection/${category}`)}
                                    >
                                        Explore Other Categories
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="clean-products-grid"
                                    layout
                                >
                                    <AnimatePresence>
                                        {products.map((product, idx) => (
                                            <motion.div
                                                key={product.id || product._id || product.sku}
                                                layout
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            >
                                                <ProductCard product={product} isApiData={true} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SubcategoryProducts;
