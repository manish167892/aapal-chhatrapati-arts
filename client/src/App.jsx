import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CategoryOverview from './pages/CategoryOverview';
import SubcategoryProducts from './pages/SubcategoryProducts';
import SplashScreen from './components/ui/SplashScreen';
import WhatsAppButton from './components/ui/WhatsAppButton';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show splash screen for 1.8 seconds on initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen key="splash" />
        ) : (
          <React.Fragment key="app-content">
            <Navbar />
            <main>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/collection/:category" element={<CategoryOverview />} />
                  <Route path="/collection/:category/:subcategory" element={<SubcategoryProducts />} />
                  <Route path="/product/:slug" element={<ProductDetails />} />
                </Routes>
              </AnimatePresence>
            </main>
            <WhatsAppButton />
            <Footer />
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
