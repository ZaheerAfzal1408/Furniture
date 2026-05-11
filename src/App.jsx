import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Footer from './components/Footer/Footer';
import WhatsAppFAB from './components/WhatsAppFAB/WhatsAppFAB';

// Pages
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Checkout from './pages/Checkout/Checkout';

function AppContent() {
  const [view, setView] = useState('home'); // home, shop, detail, checkout
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Hash-based custom navigation updater
  const navigateTo = (newView, productId = null, categoryName = null) => {
    if (newView === 'detail' && productId) {
      window.location.hash = `detail?id=${productId}`;
    } else if (newView === 'shop' && categoryName) {
      window.location.hash = `shop?category=${encodeURIComponent(categoryName)}`;
    } else {
      window.location.hash = newView;
    }
  };

  // Sync state to URL hash changes (back / forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (!hash || hash === 'home') {
        setView('home');
        setSelectedProductId(null);
        setSelectedCategory('All');
      } else if (hash === 'shop') {
        setView('shop');
        setSelectedProductId(null);
        setSelectedCategory('All');
      } else if (hash.startsWith('shop?category=')) {
        const cat = decodeURIComponent(hash.split('shop?category=')[1]);
        setSelectedCategory(cat || 'All');
        setView('shop');
        setSelectedProductId(null);
      } else if (hash === 'checkout') {
        setView('checkout');
        setSelectedProductId(null);
        setSelectedCategory('All');
      } else if (hash.startsWith('detail?id=')) {
        const id = hash.split('detail?id=')[1];
        if (id) {
          setSelectedProductId(id);
          setView('detail');
        } else {
          setView('shop');
          setSelectedProductId(null);
          setSelectedCategory('All');
        }
      } else {
        setView('home');
        setSelectedProductId(null);
        setSelectedCategory('All');
      }
    };

    // Parse initial hash on page mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top on every view switch for smooth page flows
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProductId]);

  const handleViewDetails = (id) => {
    navigateTo('detail', id);
  };

  const renderActivePage = () => {
    switch (view) {
      case 'home':
        return <Home setView={navigateTo} />;
      case 'shop':
        return (
          <Shop 
            onViewDetails={handleViewDetails} 
            initialCategory={selectedCategory} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case 'detail':
        return <ProductDetail productId={selectedProductId} setView={navigateTo} />;
      case 'checkout':
        return <Checkout setView={navigateTo} />;
      default:
        return <Home setView={navigateTo} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Menu */}
      <Navbar 
        currentView={view} 
        setView={navigateTo} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Sliding Shopping Cart */}
      <CartDrawer setView={navigateTo} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFAB />

      {/* Main Page Area */}
      <main style={{ flex: 1 }}>
        {renderActivePage()}
      </main>

      {/* Brand Footer */}
      <Footer setView={navigateTo} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
