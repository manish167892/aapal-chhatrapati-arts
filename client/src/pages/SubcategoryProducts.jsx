import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import ProductCard from '../components/ui/ProductCard';
import { products as localProducts } from '../data/products';
import axios from 'axios';
import './CollectionStyles.css';

// Used to map slugs to human readable titles for the header
const subcategoryLabels = {
    'shivaji-maharaj': 'subCatShivaji',
    'sambhaji-maharaj': 'subCatSambhaji',
    'shahu-maharaj': 'subCatShahu',
    'historical-artifacts': 'subCatArtifacts',
    'fiber-statues': 'Fiber Statues',
    'brass-statues': 'Brass Statues',
    'photo-frames': 'Photo Frames',
    'wooden-light-box': 'Wooden Light Box',
    'folk-art': 'Folk Art'
};

const SubcategoryProducts = () => {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const labelOrKey = subcategoryLabels[subcategory] || subcategory;
    const title = t(labelOrKey);
    const categoryTitle = category === 'history' ? t('historyTitle') || 'Historical Collection' : t('devotionTitle') || 'Devotion Collection';

    useEffect(() => {
        fetchProducts();
    }, [category, subcategory]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');

            if (Array.isArray(data) && data.length > 0) {
                // Filter backend data by both category and subcategory
                // If backend does not support subcategory yet, fallback to local data for this demo
                const filteredData = data.filter(p =>
                    (p.category || '').toLowerCase() === category &&
                    (p.subcategory || '').toLowerCase() === subcategory
                );

                if (filteredData.length > 0) {
                    setProducts(filteredData);
                } else {
                    setProducts(localProducts.filter(p => p.category === category && p.subcategory === subcategory));
                }
            } else {
                setProducts(localProducts.filter(p => p.category === category && p.subcategory === subcategory));
            }
        } catch (error) {
            console.error("Error fetching products, using local fallback", error);
            setProducts(localProducts.filter(p => p.category === category && p.subcategory === subcategory));
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
                                                <ProductCard product={product} isApiData={!!product._id} />
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
