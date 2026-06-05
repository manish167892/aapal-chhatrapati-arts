import React from 'react';
import { motion } from 'framer-motion';
import './ui.css';

const Button = ({ children, variant = 'primary', onClick, href, className = '', ...props }) => {
    const baseClass = `btn btn-${variant} ${className}`;

    if (href) {
        return (
            <motion.a href={href} className={baseClass} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} {...props}>
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button className={baseClass} onClick={onClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} {...props}>
            {children}
        </motion.button>
    );
};

export default Button;
