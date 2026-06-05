import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProductGallery = ({ mainImage, images, title }) => {
    // Use provided images array or fallback to a single image array
    const thumbnails = images && images.length > 0 ? images : [mainImage];
    const [bgPos, setBgPos] = useState('50% 50%');
    const [isHovering, setIsHovering] = useState(false);
    const [activeImage, setActiveImage] = useState(mainImage);
    const containerRef = useRef(null);
    // Helper to safely encode URLs with spaces or special characters
    const encode = (url) => encodeURI(url);

    useEffect(() => {
        setActiveImage(mainImage);
    }, [mainImage]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();

        // Calculate cursor position as a percentage
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setBgPos(`${x}% ${y}%`);
    };

    return (
        <div className="product-gallery">
            {/* Mobile Swipeable Carousel */}
            <div className="mobile-carousel">
                {thumbnails.map((thumb, idx) => (
                    <div key={idx} className="carousel-image-container">
                        <img src={encode(thumb)} alt={`${title} view ${idx + 1}`} loading="lazy" />
                    </div>
                ))}            </div>

            {/* Desktop Gallery */}
            <div className="desktop-gallery">
                <motion.div
                    className="main-image-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                     <img
                         src={encode(activeImage)}
                         alt={title}
                         className={`main-image ${isHovering ? 'zoomed' : ''}`}
                         style={isHovering ? { transformOrigin: bgPos } : {}}
                         loading="lazy"
                     />
                </motion.div>

                {thumbnails.length > 1 && (
                    <div className="thumbnail-strip">
                        {thumbnails.map((thumb, idx) => (
                             <div 
                                 key={idx} 
                                 className={`thumbnail ${activeImage === thumb ? 'active' : ''}`}
                                 onClick={() => setActiveImage(thumb)}
                             >
                                 <img src={encode(thumb)} alt={`${title} view ${idx + 1}`} loading="lazy" />
                             </div>                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductGallery;
