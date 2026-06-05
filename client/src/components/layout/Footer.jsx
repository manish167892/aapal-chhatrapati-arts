import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import './Footer.css';

/* ── Inline SVG Icons (no external dependency) ── */
const IconInstagram = () => (
    <svg viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
);

const IconFacebook = () => (
    <svg viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const IconYoutube = () => (
    <svg viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.35 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
);

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="aca-footer" id="footer">

            {/* ── Main Grid ── */}
            <div className="aca-footer__inner">

                {/* Column 1 — Brand */}
                <div className="aca-footer__brand">
                    <img
                        src="/brand-logo/png-logo-1.png"
                        alt="Aaple Chhatrapati Arts"
                        className="aca-footer__logo"
                        loading="lazy"
                    />
                    <h3 className="aca-footer__name">Aaple Chhatrapati Arts</h3>
                    <p className="aca-footer__tagline">{t('heroTitle')}</p>
                    <p className="aca-footer__desc">
                        Preserving the artistic and historical legacy of the Maratha Empire
                        through museum-grade artifacts and sculptures.
                    </p>
                </div>

                {/* Column 2 — Collections */}
                <div className="aca-footer__col">
                    <h3 className="aca-footer__heading">Collections</h3>
                    <ul className="aca-footer__list">
                        <li><Link to="/collection/history">{t('historyTitle') || 'History Collection'}</Link></li>
                        <li><Link to="/collection/devotion">{t('devotionTitle') || 'Devotion Collection'}</Link></li>
                        <li><Link to="/collection/heritage">{t('heritageTitle') || 'Heritage & Folk Art'}</Link></li>
                        <li><Link to="/products">{t('allProductsTitle') || 'All Products'}</Link></li>
                    </ul>
                </div>

                {/* Column 3 — Contact & Social */}
                <div className="aca-footer__col">
                    <h3 className="aca-footer__heading">Contact</h3>
                    <ul className="aca-footer__list">
                        <li>
                            <p className="aca-footer__contact-item">
                                <a href="tel:+918698167892">+91 86981 67892</a>
                            </p>
                        </li>
                        <li>
                            <p className="aca-footer__contact-item">
                                <a href="https://wa.me/918698167892" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                            </p>
                        </li>
                        <li>
                            <p className="aca-footer__contact-item">
                                <a href="mailto:info@aapalchhatrapatiarts.com">info@aapalchhatrapatiarts.com</a>
                            </p>
                        </li>
                    </ul>

                    {/* Social Icons */}
                    <div className="aca-footer__socials">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="aca-footer__social-link">
                            <IconInstagram />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="aca-footer__social-link">
                            <IconFacebook />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="aca-footer__social-link">
                            <IconYoutube />
                        </a>
                    </div>
                </div>

            </div>

            {/* ── Bottom Bar ── */}
            <div className="aca-footer__bottom">
                <p className="aca-footer__copy">&copy; {new Date().getFullYear()} Aaple Chhatrapati Arts. All Rights Reserved.</p>
            </div>

        </footer>
    );
};

export default Footer;
