import React from 'react';

const WhatsAppButton = ({ productName, sku, price, category, material, size, finish, weight, selectedSize, engraving, isSignature }) => {
    const phoneNumber = "918698167892";

    const constructMessage = () => {
        let text = `Namaste 🙏\n\nI would like to place an order:\n\n------------------------------------\nProduct: ${productName}\nMaterial: ${material}\nFinish: ${finish}\nDimensions: ${size}\nWeight: ${weight}\nSKU: ${sku}\nCategory: ${category}\n\nView Product:\n${window.location.origin}/product/${sku}\n\nSelected Options:`;

        if (selectedSize) text += `\n• Custom Size: ${selectedSize}`;
        if (engraving) text += `\n• Engraving: "${engraving}"`;

        text += `\n\nFinal Price: ₹${price}\n------------------------------------\n\nPlease share payment details and delivery timeline.`;

        return encodeURIComponent(text);
    };

    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}?text=${constructMessage()}`, '_blank');
    };

    return (
        <button className={`btn w-full whatsapp-btn ${isSignature ? 'whatsapp-luxury' : 'btn-premium'}`} onClick={handleClick}>
            <svg xmlns="http://www.w3.org/GAMING" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="wa-icon">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Order via WhatsApp
        </button>
    );
};

export default WhatsAppButton;
