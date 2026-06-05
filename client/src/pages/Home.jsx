import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import History from '../components/sections/History';
import CulturalIntro from '../components/sections/CulturalIntro';

import About from '../components/sections/About';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <Hero />
            <History />
            <CulturalIntro />
            <About />
        </motion.div>
    );
};

export default Home;
