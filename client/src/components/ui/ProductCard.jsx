import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import './ui.css';

const ProductCard = ({ product, isApiData = false }) => {
    const { lang, t } = useLanguage();
    const navigate = useNavigate();

    // Support both API structure and Mock Data structure
    const id = isApiData ? product.sku : product.id;
    const name = isApiData ? product.name : (product.name[lang] || product.name['en']);
    const material = isApiData ? product.material : (product.material[lang] || product.material['en']);
    const price = isApiData ? product.basePrice : product.price;
    const isPremium = isApiData ? (product.type === 'Premium') : product.isPremium;
    const image = isApiData ? (product.images?.[0] || '/images/IMAGE OF COLLECTION/HISTORY_COLLECTION.png') : product.image;
    const size = product.size;

    const handleOrderClick = () => {
        navigate(`/product/${product.slug || product.id}`);
    };

    return (
        <motion.div
            className={`product-card ${isPremium ? 'premium' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
        >
            {isPremium && <div className="premium-badge">Premium Collection</div>}
            <div className="product-image-container">
                <img src={image} alt={name} loading="lazy" />
            </div>
            <div className="product-info">
                <h3>{name}</h3>
                <p className="product-details">
                    <span>{size}</span> • <span>{material}</span>
                </p>
                <div className="product-price">₹{price}</div>
                <p className="product-code">Code: {id}</p>
                <div className="mt-4">
                    <Button variant={isPremium ? 'premium' : 'primary'} onClick={handleOrderClick} className="w-full">
                        View Details
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
