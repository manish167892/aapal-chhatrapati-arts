import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { motion } from 'framer-motion';
import ExplorePopup from '../ui/ExplorePopup';
import './Hero.css';

const FORT_IMAGES = [
    '/images/forts/raigad-fort.png',
    '/images/forts/pratapgad-fort.png',
    '/images/forts/shivneri-fort.png',
    '/images/forts/rajgad-fort.png',
    '/images/forts/sindhu-durga-fort.png',
    '/images/forts/lohagad-fort.png',
    '/images/forts/panhala-fort.png',
    '/images/forts/vijaydurga-fort.png',
    '/images/forts/Salher Fort.png',
    '/images/forts/gingee-fort.png',
    '/images/forts/khanderi-fort.png',
    '/images/forts/suvarnadurga-fort.png',
];

const FORT_NAMES = [
    'Raigad Fort', 'Pratapgad Fort', 'Shivneri Fort', 'Rajgad Fort',
    'Sindhudurg Fort', 'Lohagad Fort', 'Panhala Fort', 'Vijaydurg Fort',
    'Salher Fort', 'Gingee Fort', 'Khanderi Fort', 'Suvarnadurg Fort',
];

const Hero = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState(-1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setPrevSlide(currentSlide);
            setCurrentSlide((prev) => (prev + 1) % FORT_IMAGES.length);
        }, 7000); // Increased to 7s for smoother, majestic pacing
        return () => clearInterval(timer);
    }, [currentSlide]);

    const goToSlide = useCallback((index) => {
        if (index === currentSlide) return;
        setPrevSlide(currentSlide);
        setCurrentSlide(index);
    }, [currentSlide]);

    const handleExploreClick = (e) => {
        e.preventDefault();
        setIsPopupOpen(true);
    };

    const handlePopupContinue = () => {
        setIsPopupOpen(false);
        navigate('/products');
    };

    const handleScrollDown = () => {
        const historySection = document.getElementById('history');
        if (historySection) {
            historySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero-cinematic">
            {/* Fort Background Slides */}
            {FORT_IMAGES.map((src, index) => {
                let slideClass = '';
                if (index === currentSlide) slideClass = 'active';
                else if (index === prevSlide) slideClass = 'prev';

                return (
                    <div
                        key={index}
                        className={`hero-slide ${slideClass} hero-slide--${index % 4}`}
                        style={{ backgroundImage: `url(${src})` }}
                    ></div>
                );
            })}

            {/* Cinematic Overlay */}
            <div className="hero-overlay-cinematic"></div>



            {/* Content */}
            <div className="container hero-content-cinematic">
                <motion.div
                    className="hero-text-group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                >
                    <h1 className="hero-heading hero-heading--quote">
                        {t('culturalQuote')}
                    </h1>

                    <p className="hero-subheading hero-subheading--concept">
                        {t('culturalConcept')}
                    </p>

                    <div className="hero-decorative-line"></div>

                    <img
                        src="/brand-logo/logo.png"
                        alt="Aapal Chhatrapati Arts Logo"
                        className="hero-logo"
                    />

                    <div className="hero-cta-wrapper">
                        <button className="btn btn-hero-explore" onClick={handleExploreClick} id="hero-explore-btn">
                            {t('exploreBtn')}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Fort Name Indicator */}
            <div className="hero-fort-name">
                <span className="hero-fort-label">{FORT_NAMES[currentSlide]}</span>
            </div>

            {/* Slide Indicators */}
            <div className="hero-indicators">
                {FORT_IMAGES.map((_, index) => (
                    <button
                        key={index}
                        className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Down Indicator */}
            <button className="hero-scroll-indicator" onClick={handleScrollDown} aria-label="Scroll down">
                <span className="scroll-text">Scroll</span>
                <span className="scroll-line"></span>
            </button>

            <ExplorePopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onContinue={handlePopupContinue}
            />
        </section>
    );
};

export default Hero;
