import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { products } from '../data/products';
import './CollectionStyles.css';

const CategoryOverview = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (category === 'history') {
            setTitle(t('historyTitle') || 'Historical Collection');
            setDescription(t('historyDesc') || 'A curated exhibition of our premium Maratha Empire heritage artifacts.');
        } else if (category === 'devotion') {
            setTitle(t('devotionTitle') || 'Devotion Collection');
            setDescription(t('devotionDesc') || 'Sacred idols and spiritual elements crafted with profound reverence.');
        } else {
            setTitle('Collection');
            setDescription('Explore our collections.');
        }
        
        fetchDynamicSubcategories();
    }, [category, t]);

    const fetchDynamicSubcategories = () => {
        setLoading(true);
        try {
            // Filter active products by the current category
            const categoryProducts = products.filter(p => 
                (p.category || '').toLowerCase() === category.toLowerCase() && p.status === 'active'
            );
            
            // Extract unique subcategories
            const subsMap = new Map();
            
            categoryProducts.forEach(product => {
                const subCat = product.subCategory || product.subcategory;
                if (subCat && !subsMap.has(subCat)) {
                    subsMap.set(subCat, {
                        id: subCat, // The raw folder name acts as the ID
                        label: subCat,
                        // Use the first image of the first product in this subcategory as the thumbnail
                        img: product.images && product.images.length > 0 
                            ? product.images[0] 
                            : '/images/IMAGE OF COLLECTION/HISTORY_COLLECTION.png'
                    });
                }
            });
            
            setSubcategories(Array.from(subsMap.values()));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (subId) => {
        // subId is the exact folder name, e.g. "श्री गणेश"
        navigate(`/collection/${category}/${encodeURIComponent(subId)}`);
    };

    return (
        <motion.div
            className="category-overview-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
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
                    <motion.p
                        className="co-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {description}
                    </motion.p>
                    <div className="title-decorator"></div>
                </div>

                {/* Subcategory Grid */}
                <div className="subcategory-grid mt-4">
                    {loading ? (
                        <div className="text-center py-10 w-full col-span-full">
                            <span className="loader"></span>
                            <p className="mt-4 text-brand-gold">Loading collections...</p>
                        </div>
                    ) : subcategories.length === 0 ? (
                        <div className="text-center py-10 w-full col-span-full text-neutral-400">
                            No collections found for this category.
                        </div>
                    ) : (
                        subcategories.map((sub, index) => (
                            <motion.div
                                key={sub.id}
                                className="subcategory-card-premium group cursor-pointer"
                                onClick={() => handleCardClick(sub.id)}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <div className="subcategory-img-wrapper">
                                    <img
                                        src={sub.img}
                                        alt={sub.label}
                                        className="subcategory-img"
                                        loading="lazy"
                                    />
                                    <div className="subcategory-overlay">
                                        <h3 className="subcategory-label">
                                            {sub.label}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryOverview;
