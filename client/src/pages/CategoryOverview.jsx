import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import './CollectionStyles.css';

const historySubcategories = [
    { id: 'shivaji-maharaj', labelKey: 'subCatShivaji', img: '/images/shivaji maharaj rajmudra bronz/1.jpeg' },
    { id: 'sambhaji-maharaj', labelKey: 'subCatSambhaji', img: '/images/sambhaji maharaj/1.jpeg' },
    { id: 'shahu-maharaj', labelKey: 'subCatShahu', img: '/images/IMAGE OF COLLECTION/History Collection/HISTORY_COLLECTION.png' },
    { id: 'historical-artifacts', labelKey: 'subCatArtifacts', img: '/images/IMAGE OF COLLECTION/Heritage & Folk Art/Heritage & Folk Art.png' }
];

const devotionSubcategories = [
    { id: 'fiber-statues', label: 'Fiber Statues', img: '/images/IMAGE OF COLLECTION/Devotion Collection/Devotion_Collection.png' },
    { id: 'brass-statues', label: 'Brass Statues', img: '/images/IMAGE OF COLLECTION/Devotion Collection/Devotion_Collection.png' },
    { id: 'accessories', label: 'Accessories', img: '/images/IMAGE OF COLLECTION/Devotion Collection/Devotion_Collection.png' },
    { id: 'photo-frames', label: 'Photo Frames', img: '/images/IMAGE OF COLLECTION/Devotion Collection/Devotion_Collection.png' },
    { id: 'wooden-light-box', label: 'Wooden Light Box', img: '/images/IMAGE OF COLLECTION/Devotion Collection/Devotion_Collection.png' }
];

const CategoryOverview = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [subcategories, setSubcategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (category === 'history') {
            setSubcategories(historySubcategories);
            setTitle(t('historyTitle') || 'Historical Collection');
            setDescription(t('historyDesc') || 'A curated exhibition of our premium Maratha Empire heritage artifacts.');
        } else if (category === 'devotion') {
            setSubcategories(devotionSubcategories);
            setTitle(t('devotionTitle') || 'Devotion Collection');
            setDescription(t('devotionDesc') || 'Sacred idols and spiritual elements crafted with profound reverence.');
        } else {
            // Fallback or handle unknown category
            setSubcategories([]);
            setTitle('Collection');
            setDescription('Explore our collections.');
        }
    }, [category, t]);

    const handleCardClick = (subId) => {
        navigate(`/collection/${category}/${subId}`);
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
                    {subcategories.map((sub, index) => (
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
                                        {sub.labelKey ? t(sub.labelKey) : sub.label}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryOverview;
