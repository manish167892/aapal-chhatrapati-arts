import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import ProductCard from '../components/ui/ProductCard';
import SectionTitle from '../components/ui/SectionTitle';
import axios from 'axios';
import { motion } from 'framer-motion';

const Products = () => {
    const { t, lang } = useLanguage();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, history, devotion, heritage
    const [typeFilter, setTypeFilter] = useState('all'); // all, Premium, Basic
    const [searchQuery, setSearchQuery] = useState('');
    const [subCatFilter, setSubCatFilter] = useState('all');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Pointing to absolute server url for development since proxy might not be set
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => {
        if (filter !== 'all' && p.category !== filter) return false;
        if (typeFilter !== 'all' && p.type !== typeFilter) return false;
        if (filter === 'history' && subCatFilter !== 'all' && p.subCategory !== subCatFilter && p.subcategory !== subCatFilter) return false;
        
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const nameStr = typeof p.name === 'string' ? p.name : (p.name?.en || '');
            const skuStr = p.sku || '';
            if (!nameStr.toLowerCase().includes(query) && !skuStr.toLowerCase().includes(query)) {
                return false;
            }
        }
        return true;
    });

    return (
        <motion.div
            className="pt-24 pb-16 min-h-screen bg-neutral-900 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <SectionTitle
                    title={t('allProductsTitle')}
                    subtitle={t('allProductsDesc')}
                />

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search by name or SKU..."
                        className="bg-neutral-800 text-white border border-neutral-700 rounded px-4 py-2 outline-none w-full md:w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <select
                        className="bg-neutral-800 text-white border border-neutral-700 rounded px-4 py-2 outline-none"
                        value={filter}
                        onChange={(e) => { setFilter(e.target.value); setSubCatFilter('all'); }}
                    >
                        <option value="all">All Categories</option>
                        <option value="history">History</option>
                        <option value="devotion">Devotion</option>
                        <option value="heritage">Heritage</option>
                    </select>

                    {filter === 'history' && (
                        <select
                            className="bg-neutral-800 text-white border border-neutral-700 rounded px-4 py-2 outline-none"
                            value={subCatFilter}
                            onChange={(e) => setSubCatFilter(e.target.value)}
                        >
                            <option value="all">All History Subcategories</option>
                            <option value="shivaji-maharaj">{t('subCatShivaji') || 'Chhatrapati Shivaji Maharaj'}</option>
                            <option value="sambhaji-maharaj">{t('subCatSambhaji') || 'Chhatrapati Sambhaji Maharaj'}</option>
                            <option value="shahu-maharaj">{t('subCatShahu') || 'Rajarshi Chhatrapati Shahu Maharaj'}</option>
                            <option value="historical-artifacts">{t('subCatArtifacts') || 'Historical Artifacts'}</option>
                        </select>
                    )}

                    <select
                        className="bg-neutral-800 text-white border border-neutral-700 rounded px-4 py-2 outline-none"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="Premium">Premium</option>
                        <option value="Basic">Basic</option>
                    </select>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-xl text-brand-gold">Loading Collection...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id || product.sku} product={product} isApiData={true} />
                        ))}
                    </div>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-neutral-400">No products found matching your criteria.</div>
                )}
            </div>
        </motion.div>
    );
};

export default Products;
