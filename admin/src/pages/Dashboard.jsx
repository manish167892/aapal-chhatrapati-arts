import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const getHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
});

const Overview = () => {
    const [stats, setStats] = useState({ totalProducts: 0, categories: [], lowStockCount: 0 });
    const [bulkCategory, setBulkCategory] = useState('all');
    const [bulkType, setBulkType] = useState('all');
    const [adjustmentType, setAdjustmentType] = useState('percentage');
    const [adjustmentValue, setAdjustmentValue] = useState(0);
    const [target, setTarget] = useState('both');
    const [message, setMessage] = useState('');
    const [loadingStats, setLoadingStats] = useState(true);

    const fetchStats = async () => {
        try {
            setLoadingStats(true);
            const { data } = await axios.get(`${API_BASE}/products`);
            const totalProducts = data.length;
            const categoriesSet = new Set(data.map(p => p.category));
            const lowStockCount = data.filter(p => {
                const mainLow = p.trackInventory && p.stockQuantity <= p.lowStockAlertLevel;
                const variantLow = p.variants && p.variants.some(v => v.stockQuantity <= (p.lowStockAlertLevel || 5));
                return mainLow || variantLow;
            }).length;

            setStats({
                totalProducts,
                categories: Array.from(categoriesSet),
                lowStockCount
            });
        } catch (error) {
            console.error("Error fetching overview stats:", error);
        } finally {
            setLoadingStats(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleBulkUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await axios.put(`${API_BASE}/products/bulk-update-prices`, {
                category: bulkCategory,
                type: bulkType,
                adjustmentType,
                adjustmentValue: Number(adjustmentValue),
                target
            }, getHeaders());
            setMessage({ type: 'success', text: res.data.message });
            fetchStats();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Error executing bulk update' });
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Catalog Overview</h2>
            
            {loadingStats ? (
                <div className="text-gray-600">Loading catalog statistics...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-150">
                        <div className="text-sm text-gray-500 font-semibold uppercase">Total Products</div>
                        <div className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-150">
                        <div className="text-sm text-gray-500 font-semibold uppercase">Categories</div>
                        <div className="text-3xl font-bold text-gray-800 mt-2">{stats.categories.length}</div>
                        <div className="text-xs text-gray-400 mt-1">{stats.categories.join(', ')}</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-150">
                        <div className="text-sm text-gray-500 font-semibold uppercase">Low Stock Alerts</div>
                        <div className="text-3xl font-bold text-red-600 mt-2">{stats.lowStockCount}</div>
                    </div>
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-150">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Bulk Price Updates</h3>
                <form onSubmit={handleBulkUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 bg-gray-50 border focus:outline-none"
                                value={bulkCategory}
                                onChange={(e) => setBulkCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {stats.categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Collection Type</label>
                            <select
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 bg-gray-50 border focus:outline-none"
                                value={bulkType}
                                onChange={(e) => setBulkType(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="Premium">Premium Collection</option>
                                <option value="Basic">Basic Collection</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Update Target</label>
                            <select
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 bg-gray-50 border focus:outline-none"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                            >
                                <option value="both">Base Price & Variants</option>
                                <option value="basePrice">Base Price Only</option>
                                <option value="variants">Variants Price Only</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Adjustment Type</label>
                            <select
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 bg-gray-50 border focus:outline-none"
                                value={adjustmentType}
                                onChange={(e) => setAdjustmentType(e.target.value)}
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Adjustment Value (Use negative for discounts)</label>
                            <input
                                type="number"
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 bg-gray-50 border focus:outline-none"
                                value={adjustmentValue}
                                onChange={(e) => setAdjustmentValue(e.target.value)}
                            />
                        </div>
                    </div>

                    {message && (
                        <div className={`p-3 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded shadow-sm transition-colors"
                    >
                        Apply Bulk Updates
                    </button>
                </form>
            </div>
        </div>
    );
};

const ProductsManage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form states
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [type, setType] = useState('Basic');
    const [basePrice, setBasePrice] = useState(0);
    const [description, setDescription] = useState('');
    const [material, setMaterial] = useState('');
    const [finish, setFinish] = useState('');
    const [stockQuantity, setStockQuantity] = useState(0);
    const [lowStockAlertLevel, setLowStockAlertLevel] = useState(5);
    const [images, setImages] = useState('');
    const [variants, setVariants] = useState([]);

    // Temporary Variant Fields
    const [vSku, setVSku] = useState('');
    const [vSize, setVSize] = useState('');
    const [vFinish, setVFinish] = useState('');
    const [vPrice, setVPrice] = useState(0);
    const [vStock, setVStock] = useState(0);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${API_BASE}/products`);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const openCreateModal = () => {
        setEditingProduct(null);
        setName('');
        setSku('');
        setSlug('');
        setCategory('');
        setSubCategory('');
        setType('Basic');
        setBasePrice(0);
        setDescription('');
        setMaterial('');
        setFinish('');
        setStockQuantity(0);
        setLowStockAlertLevel(5);
        setImages('');
        setVariants([]);
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setName(product.name);
        setSku(product.sku);
        setSlug(product.slug);
        setCategory(product.category);
        setSubCategory(product.subCategory || '');
        setType(product.type);
        setBasePrice(product.basePrice);
        setDescription(product.description);
        setMaterial(product.material || '');
        setFinish(product.finish || '');
        setStockQuantity(product.stockQuantity);
        setLowStockAlertLevel(product.lowStockAlertLevel || 5);
        setImages(product.images ? product.images.join(', ') : '');
        setVariants(product.variants || []);
        setShowModal(true);
    };

    const addVariant = () => {
        if (!vSku || !vSize || !vPrice) {
            alert('SKU, Size, and Price are required for a variant.');
            return;
        }
        setVariants([...variants, {
            sku: vSku,
            size: vSize,
            finish: vFinish,
            price: Number(vPrice),
            stockQuantity: Number(vStock)
        }]);
        setVSku('');
        setVSize('');
        setVFinish('');
        setVPrice(0);
        setVStock(0);
    };

    const removeVariant = (index) => {
        setVariants(variants.filter((_, idx) => idx !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            sku,
            slug,
            category,
            subCategory,
            type,
            basePrice: Number(basePrice),
            description,
            material,
            finish,
            stockQuantity: Number(stockQuantity),
            lowStockAlertLevel: Number(lowStockAlertLevel),
            images: images ? images.split(',').map(s => s.trim()) : [],
            variants,
            status: 'active'
        };

        try {
            if (editingProduct) {
                await axios.put(`${API_BASE}/products/${editingProduct._id}`, payload, getHeaders());
            } else {
                await axios.post(`${API_BASE}/products`, payload, getHeaders());
            }
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            alert(error.response?.data?.message || 'Error saving product');
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await axios.delete(`${API_BASE}/products/${id}`, getHeaders());
            fetchProducts();
        } catch (error) {
            alert('Error deleting product');
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow-sm"
                >
                    Add New Product
                </button>
            </div>

            {loading ? (
                <div className="text-gray-600">Loading catalog...</div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-150">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">SKU</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Base Price</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Variants</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-150">
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {product.images?.[0] && (
                                                <img src={product.images[0]} alt="" className="w-10 h-10 object-cover rounded mr-3" />
                                            )}
                                            <div>
                                                <div className="font-semibold text-gray-850">{product.name}</div>
                                                <div className="text-xs text-gray-400">{product.type}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.sku}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <span className="capitalize">{product.category}</span>
                                        {product.subCategory && <span className="text-xs text-gray-400 block">{product.subCategory}</span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">₹{product.basePrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.variants?.length ? `${product.variants.length} Variants` : 'None'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <button onClick={() => openEditModal(product)} className="text-blue-650 hover:text-blue-800">Edit</button>
                                        <button onClick={() => deleteProduct(product._id)} className="text-red-600 hover:text-red-800">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full p-6 shadow-xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold text-gray-850 mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={name} onChange={e => { setName(e.target.value); if(!editingProduct) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')) }} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">SKU</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={sku} onChange={e => setSku(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Slug (SEO URL Key)</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={slug} onChange={e => setSlug(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Ambedkar, history, devotion" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sub-Category</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={subCategory} onChange={e => setSubCategory(e.target.value)} placeholder="e.g. shivaji-maharaj" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Collection Type</label>
                                    <select className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none bg-white" value={type} onChange={e => setType(e.target.value)}>
                                        <option value="Basic">Basic</option>
                                        <option value="Premium">Premium</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Base Price (₹)</label>
                                    <input type="number" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={basePrice} onChange={e => setBasePrice(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Main Stock Quantity</label>
                                    <input type="number" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Low Stock Alert Threshold</label>
                                    <input type="number" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={lowStockAlertLevel} onChange={e => setLowStockAlertLevel(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Material</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={material} onChange={e => setMaterial(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Finish</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={finish} onChange={e => setFinish(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image URLs (comma separated)</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none" value={images} onChange={e => setImages(e.target.value)} placeholder="e.g. /images/1.jpg, /images/2.jpg" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea className="mt-1 block w-full rounded border-gray-300 p-2 border focus:outline-none h-20" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                            </div>

                            {/* Variants Management */}
                            <div className="border-t pt-4">
                                <h4 className="font-bold text-gray-800 mb-2">Variant Price Fields (Manage Sizes & Custom Prices)</h4>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3 items-end">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600">Variant SKU</label>
                                        <input type="text" className="block w-full text-xs rounded border-gray-300 p-1.5 border focus:outline-none" value={vSku} onChange={e => setVSku(e.target.value)} placeholder="SM-001-12" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600">Size</label>
                                        <input type="text" className="block w-full text-xs rounded border-gray-300 p-1.5 border focus:outline-none" value={vSize} onChange={e => setVSize(e.target.value)} placeholder="12 Inch" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600">Finish</label>
                                        <input type="text" className="block w-full text-xs rounded border-gray-300 p-1.5 border focus:outline-none" value={vFinish} onChange={e => setVFinish(e.target.value)} placeholder="Bronze" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600">Price (₹)</label>
                                        <input type="number" className="block w-full text-xs rounded border-gray-300 p-1.5 border focus:outline-none" value={vPrice} onChange={e => setVPrice(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600">Stock</label>
                                        <input type="number" className="block w-full text-xs rounded border-gray-300 p-1.5 border focus:outline-none" value={vStock} onChange={e => setVStock(e.target.value)} />
                                    </div>
                                </div>
                                <button type="button" onClick={addVariant} className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded hover:bg-gray-700">Add Variant Option</button>

                                <div className="mt-3 space-y-1.5 max-h-32 overflow-y-auto">
                                    {variants.map((v, index) => (
                                        <div key={index} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded border border-gray-150">
                                            <span><strong>{v.size}</strong> ({v.finish || 'Any finish'}) - SKU: {v.sku} - Price: ₹{v.price} - Stock: {v.stockQuantity}</span>
                                            <button type="button" onClick={() => removeVariant(index)} className="text-red-500 hover:text-red-700">Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 border-t pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const InventoryControl = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingSku, setUpdatingSku] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${API_BASE}/products`);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching inventory", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const adjustStock = async (productId, quantity, operation, variantSku = null) => {
        const key = variantSku ? `${productId}-${variantSku}` : productId;
        setUpdatingSku(key);
        try {
            await axios.patch(`${API_BASE}/products/${productId}/stock`, {
                quantity,
                operation,
                variantSku
            }, getHeaders());
            await fetchProducts();
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating stock');
        } finally {
            setUpdatingSku(null);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Inventory Management</h2>

            {loading ? (
                <div className="text-gray-600">Loading catalog inventory...</div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-150">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Product / Variant</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">SKU</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stock Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Level</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Quick Adjust</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-150">
                            {products.map(product => {
                                const list = [];
                                // Add main product row if there are no variants or if we want to track it separately
                                list.push({
                                    id: product._id,
                                    name: product.name,
                                    sku: product.sku,
                                    isVariant: false,
                                    stockQuantity: product.stockQuantity,
                                    lowStockAlertLevel: product.lowStockAlertLevel || 5,
                                    variantSku: null
                                });

                                // Add variant rows
                                if (product.variants && product.variants.length > 0) {
                                    product.variants.forEach(v => {
                                        list.push({
                                            id: product._id,
                                            name: `└─ Size: ${v.size} ${v.finish ? `(${v.finish})` : ''}`,
                                            sku: v.sku,
                                            isVariant: true,
                                            stockQuantity: v.stockQuantity,
                                            lowStockAlertLevel: product.lowStockAlertLevel || 5,
                                            variantSku: v.sku
                                        });
                                    });
                                }

                                return list.map((item, idx) => {
                                    const isLow = item.stockQuantity <= item.lowStockAlertLevel;
                                    const updatingKey = item.variantSku ? `${item.id}-${item.variantSku}` : item.id;
                                    const isUpdating = updatingSku === updatingKey;

                                    return (
                                        <tr key={`${product._id}-${idx}`} className={item.isVariant ? 'bg-gray-50/50' : 'bg-white'}>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className={`text-sm ${item.isVariant ? 'text-gray-500 italic pl-4' : 'font-semibold text-gray-800'}`}>{item.name}</div>
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-650">{item.sku}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                {isLow ? (
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Low Stock</span>
                                                ) : (
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Good</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">{item.stockQuantity}</td>
                                            <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                <button
                                                    onClick={() => adjustStock(item.id, 1, 'add', item.variantSku)}
                                                    disabled={isUpdating}
                                                    className="bg-gray-250 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded text-xs"
                                                >
                                                    +1
                                                </button>
                                                <button
                                                    onClick={() => adjustStock(item.id, 1, 'subtract', item.variantSku)}
                                                    disabled={isUpdating || item.stockQuantity === 0}
                                                    className="bg-gray-250 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded text-xs disabled:opacity-50"
                                                >
                                                    -1
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const newVal = prompt("Set exact stock quantity:", item.stockQuantity);
                                                        if (newVal !== null && !isNaN(Number(newVal))) {
                                                            adjustStock(item.id, Number(newVal), 'set', item.variantSku);
                                                        }
                                                    }}
                                                    disabled={isUpdating}
                                                    className="bg-gray-800 hover:bg-gray-900 text-white px-2 py-1 rounded text-xs"
                                                >
                                                    Set
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                });
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        navigate('/login');
    };

    return (
        <div className="dashboard-layout flex h-screen bg-gray-50">
            <Sidebar onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-150">
                    <h1 className="text-xl font-bold text-gray-850">Aaple Chhatrapati Dashboard</h1>
                    <button onClick={handleLogout} className="text-sm text-red-650 hover:text-red-800 font-medium">
                        Logout
                    </button>
                </header>
                <div className="dashboard-content">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/products" element={<ProductsManage />} />
                        <Route path="/inventory" element={<InventoryControl />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
