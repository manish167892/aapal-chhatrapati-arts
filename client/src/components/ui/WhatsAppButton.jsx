import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    // Company phone number
    const phoneNumber = "918698167892";
    const message = "Hello! I am interested in your collections.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-float-btn"
            aria-label="Contact us on WhatsApp"
        >
            <svg viewBox="0 0 32 32" className="whatsapp-icon" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.002 0c-8.835 0-16 7.165-16 16 0 2.923.784 5.666 2.164 8.04l-2.146 7.84 8.026-2.106c2.316 1.258 4.965 1.97 7.79 1.97 8.834 0 16-7.165 16-16s-7.166-16-16-16zm0 29.07c-2.43 0-4.708-.63-6.685-1.724l-.48-.264-4.8.125.132-4.68-.29-.46c-1.2-1.9-1.83-4.13-1.83-6.438 0-7.39 6.01-13.4 13.4-13.4s13.4 6.01 13.4 13.4-6.01 13.4-13.4 13.4zm7.362-9.825c-.404-.202-2.39-1.18-2.76-1.314-.37-.134-.64-.202-.91.202-.27.404-1.043 1.314-1.278 1.583-.235.27-.47.304-.874.102-1.94-.97-3.414-2.22-4.756-4.542-.236-.406.236-.376.626-1.15.135-.27.067-.506-.034-.708-.102-.202-.91-2.193-1.246-3.003-.327-.79-.66-.684-.91-.696-.235-.01-.505-.01-.775-.01-.27 0-.707.102-1.077.506s-1.414 1.382-1.414 3.37c0 1.99 1.448 3.91 1.65 4.18s2.816 4.464 6.945 6.136c2.61 1.056 3.65 1.134 5.038.957 1.62-.205 3.195-1.144 3.676-2.36.48-1.214.48-2.254.336-2.47-.135-.218-.506-.353-.91-.555z"/>
            </svg>
        </a>
    );
};

export default WhatsAppButton;
