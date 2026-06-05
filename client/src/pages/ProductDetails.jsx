import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import { motion } from 'framer-motion';
import './ProductDetails.css';

// Hook resolving product from local data
const useProduct = (slug) => {
    const [data, setData] = useState({ product: null, loading: true, error: null });

    useEffect(() => {
        const foundProduct = products.find(p => p.slug === slug || p.id === slug);
        if (foundProduct) {
            setData({ product: foundProduct, loading: false, error: null });
        } else {
            setData({ product: null, loading: false, error: "Product not found" });
        }
    }, [slug]);

    return data;
};

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { product, loading, error } = useProduct(slug);

    useEffect(() => {
        if (error) {
            navigate('/products');
        }
    }, [error, navigate]);

    if (loading) {
        return <div className="pdp-loading"><div className="spinner"></div></div>;
    }

    if (!product) return null;

    // Dynamically Generate JSON-LD SEO Schema
    const activeName = typeof product.name === 'object' ? product.name.en : product.name;
    const cleanPrice = product.price ? parseInt(product.price.toString().replace(/,/g, ''), 10) : 0;

    const jsonLdSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": activeName,
        "image": `${window.location.origin}${product.image}`,
        "description": "Premium exhibition-grade historical artifact, exclusively crafted.",
        "sku": product.id,
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "INR",
            "price": cleanPrice,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };

    return (
        <motion.div
            className="pdp-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Inject JSON-LD directly into the structural DOM */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLdSchema)}
            </script>
            <div className="pdp-wrapper animate-fade">
                {/* Left Side: Product Image Gallery */}
                <div className="pdp-gallery-section">
                    <ProductGallery
                        mainImage={product.image || (product.images && product.images[0]) || '/images/IMAGE OF COLLECTION/HISTORY_COLLECTION.png'}
                        images={product.images}
                        title={product.name?.en || product.name}
                    />
                </div>

                {/* Right Side: Product Info & Actions */}
                <div className="pdp-info-section">
                    <ProductInfo product={product} />
                </div>
            </div>

                </motion.div>
    );
};

export default ProductDetails;
