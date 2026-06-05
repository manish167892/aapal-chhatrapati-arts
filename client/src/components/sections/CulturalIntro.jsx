import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { motion } from 'framer-motion';
import { Shield, Crown, Castle } from 'lucide-react';
import './CulturalIntro.css';

const CulturalIntro = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: <Crown className="feature-icon" />,
            title: "Royal Heritage",
            desc: "Authentic artifacts honoring the legacy of Chhatrapati Shivaji Maharaj."
        },
        {
            icon: <Castle className="feature-icon" />,
            title: "Architectural Marvels",
            desc: "Miniature replicas of the glorious Maratha forts."
        },
        {
            icon: <Shield className="feature-icon" />,
            title: "Unmatched Craftsmanship",
            desc: "Handcrafted details preserving our golden history."
        }
    ];

    return (
        <section className="cultural-intro section">
            <div className="container">
                <div className="intro-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        Preserving the Maratha Legacy
                    </motion.h2>
                    <motion.div
                        className="title-decorator"
                        style={{ margin: '1rem auto' }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    />
                    <motion.p
                        className="intro-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        {t('culturalQuoteFull')}
                    </motion.p>
                </div>
                
                <div className="cultural-grid">
                    {features.map((feat, index) => (
                        <motion.div 
                            key={index} 
                            className="cultural-card"
                            whileHover={{ y: -10, scale: 1.02 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="icon-wrapper glow">
                                {feat.icon}
                            </div>
                            <h3>{feat.title}</h3>
                            <p>{feat.desc}</p>
                            <div className="card-border-gradient"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CulturalIntro;
