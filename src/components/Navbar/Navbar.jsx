import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sun, Moon, Sparkles, Search, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

export const Navbar = ({ currentView, setView, searchQuery, setSearchQuery }) => {
  const { cartCount, openCart } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value && currentView !== 'shop') {
      setView('shop');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparentHome = currentView === 'home' && !isScrolled;

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''} ${isTransparentHome ? 'transparent-home' : 'theme-header'}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); setView('home'); }}>
          <Sparkles className="logo-icon" size={22} />
          <span>Vélure</span>
        </a>

        {/* Navigation Menu */}
        <nav>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-link btn-text ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => setView('home')}
                id="nav-home-btn"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={`nav-link btn-text ${currentView === 'shop' ? 'active' : ''}`}
                onClick={() => setView('shop')}
                id="nav-shop-btn"
              >
                Atelier Shop
              </button>
            </li>
            <li className="nav-dropdown-wrapper">
              <button 
                className={`nav-link btn-text ${currentView === 'shop' && window.location.hash.includes('category') ? 'active' : ''}`}
                id="nav-categories-btn"
              >
                Categories
              </button>
              <ul className="nav-dropdown">
                <li><button className="dropdown-item" onClick={() => setView('shop', null, 'Living Room')}>Living Room</button></li>
                <li><button className="dropdown-item" onClick={() => setView('shop', null, 'Dining')}>Dining Room</button></li>
                <li><button className="dropdown-item" onClick={() => setView('shop', null, 'Bedroom')}>Bedroom</button></li>
                <li><button className="dropdown-item" onClick={() => setView('shop', null, 'Office')}>Office</button></li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Actions (Search, Theme toggle, Cart) */}
        <div className="nav-actions">
          {/* Search Button & Input */}
          <div className={`nav-search-bar ${isSearchOpen ? 'expanded' : ''}`}>
            <button 
              className="nav-action-btn"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) {
                  setSearchQuery(''); // clear when closing
                }
              }}
              title="Search furniture"
              aria-label="Search furniture"
              id="nav-search-toggle-btn"
            >
              <Search size={20} />
            </button>
            {isSearchOpen && (
              <div className="nav-search-input-wrapper">
                <input 
                  type="text"
                  placeholder="Search designs..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="nav-search-input"
                  autoFocus
                  id="nav-search-input"
                />
                {searchQuery && (
                  <button className="nav-search-clear-btn" onClick={handleClearSearch} title="Clear search">
                    <X size={14} />
                  </button>
                )}
              </div>
            )}
          </div>

          <button 
            className="nav-action-btn" 
            onClick={toggleTheme} 
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
            id="theme-toggle-btn"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="nav-action-btn" 
            onClick={openCart} 
            title="Open Cart"
            aria-label="Open cart"
            id="cart-toggle-btn"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
