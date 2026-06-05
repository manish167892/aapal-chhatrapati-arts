import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import './Navbar.css';

const Navbar = () => {
    const { lang, setLang, t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const isHome = location.pathname === '/';

    return (
        <header className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHome && !isScrolled ? 'navbar--transparent' : ''}`} id="main-navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo" id="navbar-logo">
                    <img src="/brand-logo/png-logo-2.png" alt="Aaple Chhatrapati Arts" className="brand-logo-img" />
                </Link>

                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} id="nav-links">
                    <div className="nav-links-inner">
                        <Link to="/" onClick={closeMenu} className="nav-link">
                            {t('home')}
                        </Link>
                        <Link to="/collection/history" onClick={closeMenu} className="nav-link">
                            {t('historyTitle')}
                        </Link>
                        <Link to="/collection/devotion" onClick={closeMenu} className="nav-link">
                            {t('devotionTitle')}
                        </Link>
                        <Link to="/collection/heritage" onClick={closeMenu} className="nav-link">
                            {t('heritageTitle')}
                        </Link>
                    </div>
                    {/* Mobile-only contact */}
                    <div className="nav-mobile-footer">
                        <p className="nav-mobile-tagline">{t('heroTitle')}</p>
                        <a href="tel:+918698167892" className="nav-mobile-contact">
                            +91 86981 67892
                        </a>
                    </div>
                </nav>

                <div className="navbar-actions">
                    <div className="lang-switcher" id="lang-switcher">
                        <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Select Language">
                            <option value="en">EN</option>
                            <option value="mr">मराठी</option>
                            <option value="hi">हिंदी</option>
                            <option value="ta">Tamil</option>
                            <option value="te">Telugu</option>
                            <option value="kn">ಕನ್ನಡ</option>
                        </select>
                    </div>

                    <button
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                        id="hamburger-btn"
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
        </header>
    );
};

export default Navbar;
