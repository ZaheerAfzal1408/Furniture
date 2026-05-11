import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './Shop.css';

export const Shop = ({ onViewDetails, initialCategory = 'All', searchQuery, setSearchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Categories extraction
  const categories = useMemo(() => {
    const list = new Set(products.map(p => p.category));
    return ['All', ...list];
  }, []);

  // Material extraction helpers
  const materials = ['All', 'Walnut', 'Oak', 'Velvet', 'Bouclé', 'Linen'];

  // Compound Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Live Search matching
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.tagline.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // 2. Category matching
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 3. Material matching (keyword search)
    if (selectedMaterial !== 'All') {
      const queryMat = selectedMaterial.toLowerCase();
      result = result.filter(p => 
        p.materials.some(mat => mat.toLowerCase().includes(queryMat))
      );
    }

    // 4. Sort Ordering
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedMaterial, sortBy]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="shop-wrapper container animate-scale-reveal" id="shop-page">
      
      {/* 1. Header Area */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '12px' }}>The Atelier Catalog</h1>
        <p style={{ color: 'var(--text-secondary)', maxW: '600px', margin: '0 auto' }}>
          Browse our bespoke library of contemporary seating, dining tables, and fine-finished timber.
        </p>
      </div>

      {/* 3. Output results counts */}
      <div className="shop-results-header">
        <span>Showing {filteredProducts.length} of {products.length} exclusive designs</span>
      </div>

      {/* 4. Products Grid */}
      {filteredProducts.length > 0 ? (
        <section className="shop-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="animate-scale-reveal">
              <ProductCard 
                product={product} 
                onViewDetails={onViewDetails} 
              />
            </div>
          ))}
        </section>
      ) : (
        <div className="shop-empty-state">
          <Search size={48} className="shop-empty-icon" />
          <h2>No creations found</h2>
          <p>We couldn't find any designs matching your exact criteria. Please reset your search phrase or try another material chip.</p>
          <button 
            className="btn btn-secondary" 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedMaterial('All'); setSortBy('featured'); }}
            id="reset-shop-filters-btn"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
export default Shop;
