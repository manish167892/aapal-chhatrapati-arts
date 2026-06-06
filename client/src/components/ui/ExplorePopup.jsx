import React from 'react';
import './ExplorePopup.css';

const ExplorePopup = ({ isOpen, onClose, onContinue }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay animate-fade-in" onClick={onClose}>
            <div className="popup-content animate-slide-up" onClick={e => e.stopPropagation()}>
                <button className="popup-close" onClick={onClose} aria-label="Close popup">&times;</button>
                <div className="popup-body">
                    <img src="/brand-logo/png-logo-1.png" alt="Logo" className="popup-logo" />
                    <h3 className="popup-message">
                        Explore our premium range of<br />Shivaji Maharaj sculptures.
                    </h3>
                    <div className="popup-actions">
                        <button className="btn-continue" onClick={onContinue}>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorePopup;
