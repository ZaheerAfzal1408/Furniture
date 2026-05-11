import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, Check, ChevronDown } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

export const ProductDetail = ({ productId, setView }) => {
  const { addToCart } = useCart();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => setView('shop')} style={{ marginTop: '16px' }}>Back to Shop</button>
      </div>
    );
  }

  // Gallery and Variant selections states
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0]);
  const [quantity, setQuantity] = useState(1);
  const [openTab, setOpenTab] = useState('specs'); // specs, story, care

  // Reset states on product changes
  useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedColor(product.colors[0]);
    setSelectedMaterial(product.materials[0]);
    setQuantity(1);
  }, [productId, product]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedMaterial);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedMaterial);
    setView('checkout');
  };

  const toggleTab = (tabName) => {
    setOpenTab(prev => prev === tabName ? '' : tabName);
  };

  return (
    <div className="detail-wrapper container animate-slide-up" id="product-detail-page">
      
      {/* Back CTA */}
      <button 
        className="detail-back-btn" 
        onClick={() => setView('shop')}
        id="detail-back-to-shop-btn"
      >
        <ArrowLeft size={16} />
        <span>Return to Atelier Catalog</span>
      </button>

      {/* Grid */}
      <section className="detail-grid">
        
        {/* Left Column: Image Gallery */}
        <div className="gallery-container">
          <div className="gallery-main-wrapper" id="detail-main-image-frame">
            <img src={activeImage} alt={product.name} className="gallery-main-img" />
          </div>
          
          <div className="gallery-thumbnails-row">
            {product.images.map((img, index) => (
              <button 
                key={index} 
                className={`gallery-thumb-btn ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
                title={`View angle ${index + 1}`}
                id={`thumb-${product.id}-${index}`}
              >
                <img src={img} alt={`Angle ${index + 1}`} className="gallery-thumb-img" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Spec Specifications & Cart controls */}
        <div className="detail-content">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-tagline">{product.tagline}</p>

          {/* Pricing & Ratings */}
          <div className="detail-price-row">
            <span className="detail-price">Rs. {product.price.toLocaleString()}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(product.rating) ? "var(--accent-gold)" : "none"} 
                    stroke="var(--accent-gold)" 
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{product.rating}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>({product.reviews} reviews)</span>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.95rem' }}>
            {product.description}
          </p>

          {/* Color swatches */}
          <div className="selector-group">
            <span className="selector-label">Color Swatches</span>
            <div className="color-swatches">
              {product.colors.map(col => (
                <button 
                  key={col.name} 
                  className={`color-swatch-btn ${selectedColor.name === col.name ? 'active' : ''}`}
                  style={{ backgroundColor: col.hex }}
                  onClick={() => setSelectedColor(col)}
                  title={col.name}
                  aria-label={`Select color ${col.name}`}
                  id={`swatch-${product.id}-${col.name.toLowerCase().replace(' ', '-')}`}
                >
                  {selectedColor.name === col.name && (
                    <Check 
                      size={14} 
                      style={{ 
                        color: selectedColor.hex === '#f5f2eb' ? '#000' : '#fff',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                      }} 
                    />
                  )}
                </button>
              ))}
            </div>
            {/* Displaying selected color and material under the color swatches */}
            <div className="swatch-material-detail" style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Color: <strong style={{ color: 'var(--text-primary)' }}>{selectedColor.name}</strong>
              <span style={{ margin: '0 8px', color: 'var(--border-light)' }}>|</span>
              Material: <strong style={{ color: 'var(--text-primary)' }}>{selectedMaterial}</strong>
            </div>
          </div>

          {/* Materials selector */}
          <div className="selector-group">
            <span className="selector-label">Atelier Wood Finish</span>
            <div className="material-swatches">
              {product.materials.map(mat => (
                <button 
                  key={mat}
                  className={`material-swatch-btn ${selectedMaterial === mat ? 'active' : ''}`}
                  onClick={() => setSelectedMaterial(mat)}
                  id={`finish-${product.id}-${mat.toLowerCase().replace(' ', '-')}`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive AR Camera and ATC Trigger */}
          <div className="detail-action-row" style={{ marginBottom: '40px' }}>
            {/* Counter */}
            <div className="counter-container">
              <button 
                className="counter-btn" 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="counter-val">{quantity}</span>
              <button 
                className="counter-btn" 
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* ATC */}
            <button 
              className="btn btn-secondary atc-btn" 
              onClick={handleAddToCart}
              id="detail-add-to-cart-btn"
              style={{ padding: '16px' }}
            >
              Add to Cart
            </button>

            {/* Buy Now */}
            <button 
              className="btn btn-primary buy-now-btn" 
              onClick={handleBuyNow}
              id="detail-buy-now-btn"
              style={{ flex: 1, padding: '16px' }}
            >
              Buy Now
            </button>
          </div>

          {/* Accordions */}
          <div className="spec-accordion">
            {/* Dimensions tab */}
            <div className={`accordion-tab ${openTab === 'specs' ? 'open' : ''}`}>
              <button className="accordion-trigger" onClick={() => toggleTab('specs')} id="spec-accordion-tab">
                <span>Dimensions & Details</span>
                <ChevronDown size={18} style={{ transform: openTab === 'specs' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
              </button>
              <div className="accordion-content">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}><td style={{ padding: '8px 0', fontWeight: 600 }}>Dimensions</td><td style={{ padding: '8px 0' }}>{product.dimensions}</td></tr>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}><td style={{ padding: '8px 0', fontWeight: 600 }}>Item Weight</td><td style={{ padding: '8px 0' }}>{product.weight}</td></tr>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}><td style={{ padding: '8px 0', fontWeight: 600 }}>Timber Core</td><td style={{ padding: '8px 0' }}>Sustainably Grown Hardwood</td></tr>
                    <tr><td style={{ padding: '8px 0', fontWeight: 600 }}>Certifications</td><td style={{ padding: '8px 0' }}>FSC Certified wood, Organic Oeko-Tex fabrics</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Design Story */}
            <div className={`accordion-tab ${openTab === 'story' ? 'open' : ''}`}>
              <button className="accordion-trigger" onClick={() => toggleTab('story')} id="story-accordion-tab">
                <span>The Creation Story</span>
                <ChevronDown size={18} style={{ transform: openTab === 'story' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
              </button>
              <div className="accordion-content">
                <p style={{ lineHeight: '1.6' }}>{product.story}</p>
              </div>
            </div>

            {/* Care guidelines */}
            <div className={`accordion-tab ${openTab === 'care' ? 'open' : ''}`}>
              <button className="accordion-trigger" onClick={() => toggleTab('care')} id="care-accordion-tab">
                <span>Atelier Care Guide</span>
                <ChevronDown size={18} style={{ transform: openTab === 'care' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
              </button>
              <div className="accordion-content">
                <p style={{ lineHeight: '1.6' }}>{product.care}</p>
              </div>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
export default ProductDetail;
