import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <section className="about-section section">
            <div className="container">
                <motion.div 
                    className="about-minimal-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="about-minimal-title">Crafting History</h2>
                    <div className="title-decorator-minimal"></div>
                    <p className="about-minimal-text">
                        At Aapal Chhatrapati Arts, we are devoted to preserving the magnificent legacy of the Maratha Empire. Every sculpture, every miniature fort, and every Rajmudra is meticulously crafted by artisans who understand the profound historical significance of these artifacts.
                    </p>
                    <p className="about-minimal-text">
                        We don't just sell art; we deliver a piece of our glorious history into the hands of those who revere it.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
