import React from 'react';
import { ArrowRight, Star, Award, ShieldCheck, Leaf } from 'lucide-react';
import { products } from '../../data/products';
import './Home.css';

export const Home = ({ setView }) => {
  const categories = [
    { name: "Living Room", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400" },
    { name: "Dining", img: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=400" },
    { name: "Bedroom", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=400" },
    { name: "Office", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400" }
  ];

  const featuredProduct = products[0]; // Chinar Bouclé Sofa (Rs. 245,000)

  return (
    <div className="home-wrapper-parent animate-slide-up">
      
      {/* 1. Hero Cover */}
      <section className="hero-wrapper" id="home-hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-tag">Aura Of Luxury</span>
            <h1 className="hero-title">Timeless Integrity, Bespoke Living.</h1>
            <p className="hero-desc">
              At Furniture, we craft pieces that transcend trends. Rooted in Mid-Century aesthetics and Scandinavian simplicity, each piece is engineered for generational comfort.
            </p>
            <div className="hero-btns">
              <button 
                className="btn btn-primary" 
                onClick={() => setView('shop')}
                id="hero-shop-cta"
              >
                <span>Explore Atelier</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  const el = document.getElementById('collections-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                id="hero-planner-cta"
              >
                <span>Browse Categories</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Categories Segment */}
      <section className="home-section" id="collections-grid">
        <div className="container">
          
          <div className="section-header">
            <span className="section-tag">Explore Atelier</span>
            <h2>Shop by Categories</h2>
            <p className="section-desc">
              Explore premium timber, luxury fabrics, and precision architecture tailored for your comfort.
            </p>
          </div>

          <div className="category-row">
            {categories.map(cat => (
              <div 
                key={cat.name} 
                className="category-card"
                onClick={() => setView('shop', null, cat.name)}
                title={`Shop ${cat.name}`}
                id={`cat-${cat.name.toLowerCase().replace(' ', '-')}`}
              >
                <img src={cat.img} alt={cat.name} className="category-img" loading="lazy" />
                <div className="category-overlay">
                  <h3 className="category-title">{cat.name}</h3>
                  <span className="category-link">
                    <span>Enter Atelier</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Craftsmanship Spotlight */}
      <section className="home-section" style={{ backgroundColor: 'var(--bg-secondary)' }} id="craftsmanship-details">
        <div className="container">
          
          <div className="feature-row">
            
            {/* Left Column Overlapping Images */}
            <div className="feature-image-panel">
              <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800" 
                alt="Premium Bedding" 
                className="feature-img-main"
                loading="lazy"
              />
              <img 
                src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400" 
                alt="Upholstery Craft" 
                className="feature-img-sub"
                loading="lazy"
              />
            </div>

            {/* Right Column Content */}
            <div className="feature-details">
              <span className="section-tag">The Atelier Standards</span>
              <h2>Bespoke Heritage In Every Grain</h2>
              <p className="section-desc">
                We design with circular life cycles. Every product is handcrafted by multi-generational carpenters who shape walnut and linen into physical expressions of home.
              </p>

              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-bullet"><Leaf size={14} /></div>
                  <div>
                    <h4 className="feature-item-title">Sustainably Cultivated Timber</h4>
                    <p className="feature-item-desc">We use certified Swat Diyar and seasoned Chiniot Sheesham from strictly controlled, carbon-positive reserves.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-bullet"><Award size={14} /></div>
                  <div>
                    <h4 className="feature-item-title">True Organic Fibers</h4>
                    <p className="feature-item-desc">Our cotton velvet and boucle yarns are weave-processed without synthetic bleaching agents, retaining raw textures.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-bullet"><ShieldCheck size={14} /></div>
                  <div>
                    <h4 className="feature-item-title">The Generational Seal</h4>
                    <p className="feature-item-desc">Double mortise structural joints with premium matte oil sealers, carrying our active 10-year design warranty.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Featured Collections & Bottom Highlight Product */}
      <section className="home-section" id="featured-collections" style={{ borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          
          <div className="section-header">
            <span className="section-tag">Bespoke Curations</span>
            <h2>Featured Collections</h2>
            <p className="section-desc">
              Carefully assembled luxury suites combining Swat Diyar cedar wood and Chiniot Sheesham.
            </p>
          </div>

          {/* Collection Grid */}
          <div className="featured-collections-row">
            <div className="collection-banner-card" onClick={() => setView('shop', null, 'Living Room')}>
              <img src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=600" alt="The Bouclé Lounge Suite" />
              <div className="collection-banner-content">
                <h3>The Bouclé Lounge Suite</h3>
                <p>Sophisticated minimalist curves upholstered in thick woven bouclé.</p>
              </div>
            </div>

            <div className="collection-banner-card" onClick={() => setView('shop', null, 'Dining')}>
              <img src="https://images.unsplash.com/photo-1530018607912-eff2df114f12?auto=format&fit=crop&q=80&w=600" alt="The Royal Rosewood Banquets" />
              <div className="collection-banner-content">
                <h3>The Royal Sheesham Suite</h3>
                <p>Solid heavy slabs of natural-edge rosewood paired with warm brass structures.</p>
              </div>
            </div>
          </div>

          {/* Single Featured Product Highlight at the Bottom */}
          {featuredProduct && (
            <div className="featured-single-product-container">
              <span className="featured-single-label">Collection Spotlight Piece</span>
              
              <div 
                className="featured-single-card" 
                onClick={() => setView(`detail?id=${featuredProduct.id}`)}
                id={`featured-highlight-${featuredProduct.id}`}
              >
                <div className="featured-single-img-wrapper">
                  <img src={featuredProduct.image} alt={featuredProduct.name} />
                </div>
                
                <div className="featured-single-info">
                  <span className="featured-single-tag">{featuredProduct.category}</span>
                  <h3 className="featured-single-title">{featuredProduct.name}</h3>
                  <p className="featured-single-desc">{featuredProduct.tagline}</p>
                  
                  <div className="featured-single-price-row">
                    <span className="featured-single-price">Rs. {featuredProduct.price.toLocaleString()}</span>
                    <button 
                      className="btn btn-primary" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setView(`detail?id=${featuredProduct.id}`); 
                      }}
                      id={`featured-highlight-cta-${featuredProduct.id}`}
                    >
                      <span>Experience Design</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. Luxury Quote Banner */}
      <section className="quote-banner" id="brand-editorial-quote">
        <div className="container">
          <div className="quote-content">
            <span className="quote-author">Editorial Philosophy</span>
            <blockquote className="quote-text">
              "Luxury is not about filling a home; it is about choosing elements that are silent companions of your quiet evenings, speaking through wood, grain, and touch."
            </blockquote>
            <span style={{ fontSize: '0.9rem', opacity: 0.8, color: 'var(--accent-gold)' }}>Lars Klint, Chief Design Officer</span>
          </div>
        </div>
      </section>

    </div>
  );
};
export default Home;
