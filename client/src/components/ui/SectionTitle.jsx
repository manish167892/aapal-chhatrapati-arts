import React from 'react';
import { motion } from 'framer-motion';
import './ui.css';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
    return (
        <motion.div
            className={`section-title align-${align}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
        >
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
            <div className="title-decorator"></div>
        </motion.div>
    );
};

export default SectionTitle;
