import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { motion } from 'framer-motion';
import './Section.css';

const Devotion = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <motion.section
            id="devotion"
            className="category-block reverse"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
            <div className="container category-block-inner">
                <div className="category-image-wrapper">
                    <img src="/images/IMAGE OF COLLECTION/Devotion Collection/Devotion_Collection.png" alt="Devotion Collection" className="category-img" loading="lazy" />
                </div>
                <div className="category-content">
                    <h2 className="category-heading">{t('devotionTitle')}</h2>
                    <p className="category-desc">{t('devotionDesc')}</p>
                    <button
                        className="btn-view-collection"
                        onClick={() => navigate('/collection/devotion')}
                    >
                        {t('viewCollection')}
                    </button>
                </div>
            </div>
        </motion.section>
    );
};

export default Devotion;
