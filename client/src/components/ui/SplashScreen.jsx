import React from 'react';
import { motion } from 'framer-motion';
import './SplashScreen.css';

const SplashScreen = () => {
    return (
        <motion.div
            className="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <motion.div
                className="splash-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <img
                    src="/brand-logo/logo.png"
                    alt="Aapal Chhatrapati Arts"
                    className="splash-logo"
                />
                <div className="splash-progress">
                    <div className="splash-progress-bar"></div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SplashScreen;
