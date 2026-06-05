import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import WhatsAppButton from './WhatsAppButton';

const ProductInfo = ({ product }) => {
    const { lang } = useLanguage();
    
    // Check if variants exist
    const hasVariants = product.variants && product.variants.length > 0;
    const [selectedVariantSku, setSelectedVariantSku] = useState(hasVariants ? product.variants[0].sku : '');
    const [engraving, setEngraving] = useState('');

    const activeVariant = hasVariants ? (product.variants.find(v => v.sku === selectedVariantSku) || product.variants[0]) : null;

    // Extract localized text safely
    const name = typeof product.name === 'object' ? (product.name[lang] || product.name['en']) : product.name;
    const material = typeof product.material === 'object' ? (product.material[lang] || product.material['en']) : product.material;
    const finish = activeVariant ? (activeVariant.finish || 'Standard') : (typeof product.color === 'object' ? (product.color[lang] || product.color['en']) : (product.color || product.finish || 'Standard'));
    const weight = product.weight || 'Not Specified';
    const activeSku = activeVariant ? activeVariant.sku : (product.sku || product.id);
    const activeSize = activeVariant ? activeVariant.size : (product.size || 'Standard');

    // Parse base price
    const basePriceNum = activeVariant ? activeVariant.price : (product.basePrice !== undefined ? product.basePrice : parseInt((product.price || '0').toString().replace(/,/g, ''), 10));

    // Calculate final price with engraving premium
    let finalPrice = basePriceNum;
    if (engraving.length > 0) finalPrice += 500;

    const formattedPrice = new Intl.NumberFormat('en-IN').format(finalPrice);

    // Active stock
    const activeStock = activeVariant ? activeVariant.stockQuantity : (product.stockQuantity !== undefined ? product.stockQuantity : product.stock);
    const trackInventory = product.trackInventory !== false;

    return (
        <div className="product-info-panel">
            <div className="product-header">
                {product.isPremium && <span className="badge premium">Premium Collection</span>}
                <span className="badge category">{product.category}</span>
                <h1 className="product-title">{name}</h1>
                <p className="product-sku">SKU: {activeSku}</p>
            </div>

            <div className="product-specs">
                <div className="spec-item">
                    <span className="spec-label">Material</span>
                    <span className="spec-value">{material}</span>
                </div>
                <div className="spec-item">
                    <span className="spec-label">Finish</span>
                    <span className="spec-value">{finish}</span>
                </div>
                <div className="spec-item">
                    <span className="spec-label">Dimensions</span>
                    <span className="spec-value">{activeSize}</span>
                </div>
                <div className="spec-item">
                    <span className="spec-label">Weight</span>
                    <span className="spec-value">{weight}</span>
                </div>
                <div className="spec-item">
                    <span className="spec-label">Availability</span>
                    {!trackInventory ? (
                        <span className="spec-value stock-in">In Stock (Made to Order)</span>
                    ) : activeStock && activeStock <= 15 ? (
                        <span className="spec-value stock-limited" style={{
                            color: 'var(--color-accent)',
                            fontWeight: '600',
                            animation: 'pulse 3s infinite',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' }}></span>
                            Only {activeStock} pieces available
                        </span>
                    ) : activeStock > 15 ? (
                        <span className="spec-value stock-in">In Stock</span>
                    ) : (
                        <span className="spec-value stock-limited" style={{ color: '#ef4444' }}>Out of Stock</span>
                    )}
                </div>
            </div>

            <div className="customization-section">
                <h3>Customization Options</h3>
                {hasVariants ? (
                    <div className="custom-group">
                        <label>Select Size & Variant</label>
                        <select 
                            value={selectedVariantSku} 
                            onChange={(e) => setSelectedVariantSku(e.target.value)} 
                            className="custom-select"
                        >
                            {product.variants.map(v => (
                                <option key={v.sku} value={v.sku}>
                                    {v.size} {v.finish ? `(${v.finish})` : ''} - ₹{new Intl.NumberFormat('en-IN').format(v.price)}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className="custom-group">
                        <label>Select Size</label>
                        <select className="custom-select" disabled>
                            <option value="Standard">Standard Size</option>
                        </select>
                    </div>
                )}
                <div className="custom-group">
                    <label>Personalized Engraving (+₹500)</label>
                    <input
                        type="text"
                        maxLength="30"
                        placeholder="Enter name or short message..."
                        value={engraving}
                        onChange={(e) => setEngraving(e.target.value)}
                        className="custom-input"
                    />
                </div>
            </div>

            <div className="product-pricing">
                <div className="price-label">Final Price</div>
                <div className="price-value">₹{formattedPrice}</div>
                <p className="price-note">Inclusive of all taxes. Free shipping on premium items.</p>
            </div>

            <div className="product-actions">
                <WhatsAppButton
                    productName={name}
                    sku={activeSku}
                    price={formattedPrice}
                    category={product.category}
                    material={material}
                    size={activeSize}
                    finish={finish}
                    weight={weight}
                    selectedSize={activeSize}
                    engraving={engraving}
                    isSignature={product.isSignature}
                />
            </div>

            {product.isSignature ? (
                <div className="authenticity-section" style={{ marginTop: '20px', padding: '15px', background: 'rgba(201, 162, 39, 0.05)', borderLeft: '4px solid var(--color-accent)', borderRadius: '4px' }}>
                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg xmlns="http://www.w3.org/GAMING" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        Authenticity & Originality Guarantee
                    </h3>
                    <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        This is an original copyrighted design by Aaple Chhatrapati Arts.
                        Each piece is meticulously handcrafted with exhibition-grade quality and precision. Beware of unauthorized replicas.
                    </p>
                </div>
            ) : null}

            
        </div>
    );
};

export default ProductInfo;
