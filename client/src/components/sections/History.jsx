import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { motion } from 'framer-motion';
import './History.css';

const History = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const collections = [
        {
            id: 'history',
            title: t('historyTitle') || 'History Collection',
            desc: t('historyDesc') || 'Explore our premium range of Chhatrapati Shivaji Maharaj statues and miniatures.',
            image: '/images/IMAGE OF COLLECTION/History Collection/HISTORY_COLLECTION.png',
            category: 'history'
        },
        {
            id: 'devotion',
            title: t('devotionTitle') || 'Devotion Collection',
            desc: t('devotionDesc') || 'Experience spiritual tranquility through our premium devotion series.',
            image: '/images/IMAGE OF COLLECTION/Devotion Collection/Devotion_Collection.png',
            category: 'devotion'
        },
        {
            id: 'heritage',
            title: t('heritageTitle') || 'Heritage & Folk Art',
            desc: t('heritageDesc') || 'Authentic folk art bringing rich cultural stories and traditions to life.',
            image: '/images/IMAGE OF COLLECTION/Heritage & Folk Art/Heritage & Folk Art.png',
            category: 'heritage'
        }
    ];

    return (
        <section id="collections" className="collections-section">
            <div className="container" style={{ width: '100%', maxWidth: '1400px', padding: '0 12px', margin: '0 auto' }}>
                <div className="collections-header">
                    <h2>Our Collections</h2>
                    <p>Discover museum-grade artifacts crafted with historical precision and profound reverence.</p>
                </div>
                
                <div className="collections-grid">
                    {collections.map((col, index) => (
                        <motion.div 
                            key={col.id}
                            className="collection-card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            onClick={() => navigate(`/collection/${col.category}`)}
                        >
                            <div className="collection-image-wrapper">
                                <img src={col.image} alt={col.title} loading="lazy" />
                                <div className="collection-overlay"></div>
                                <div className="collection-cta">
                                    <span>Explore Collection</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                            
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default History;
