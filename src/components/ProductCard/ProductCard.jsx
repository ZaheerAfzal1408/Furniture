import React from 'react';
import { Plus, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.stopPropagation(); // Avoid triggering full details navigation
    addToCart(product, 1, product.colors[0], product.materials[0]);
  };

  return (
    <article 
      className="product-card" 
      onClick={() => onViewDetails(product.id)}
      id={`product-card-${product.id}`}
    >
      {/* Image Block */}
      <div className="product-card-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-card-image" 
          loading="lazy"
        />
        <span className="product-card-badge">{product.category}</span>
        
        <button 
          className="product-card-quick-add" 
          onClick={handleQuickAdd}
          title="Add to Cart"
          aria-label={`Add ${product.name} to cart`}
          id={`quick-add-${product.id}`}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Detail Block */}
      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-tagline">{product.tagline}</p>
        
        <div className="product-card-footer">
          <span className="product-card-price">Rs. {product.price.toLocaleString()}</span>
          <div className="product-card-rating">
            <Star size={14} className="product-card-star" />
            <span>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({product.reviews})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
export default ProductCard;
