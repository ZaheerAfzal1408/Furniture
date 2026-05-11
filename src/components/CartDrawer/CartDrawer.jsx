import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export const CartDrawer = ({ setView }) => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();

  const handleCheckoutClick = () => {
    closeCart();
    setView('checkout');
  };

  return (
    <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={closeCart} id="cart-drawer-overlay">
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close-btn" onClick={closeCart} title="Close Cart" id="close-cart-btn">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingCart size={48} className="cart-empty-icon" />
              <h3>Your cart is empty</h3>
              <p>Explore our Atelier shop and select from our exquisite hand-crafted collections.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.cartId} id={`cart-item-${item.cartId}`}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-meta">
                    <span>{item.selectedColor.name}</span>
                    <span>{item.selectedMaterial}</span>
                  </div>
                  
                  <div className="cart-item-bottom">
                    {/* Quantity Selector */}
                    <div className="cart-quantity-controls">
                      <button 
                        className="cart-qty-btn" 
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button 
                        className="cart-qty-btn" 
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="cart-item-price">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      <button 
                        className="cart-item-remove" 
                        onClick={() => removeFromCart(item.cartId)}
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className="cart-total-row">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="cart-total-row grand">
                <span>Total</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button 
              className="btn btn-primary cart-checkout-btn" 
              onClick={handleCheckoutClick}
              id="checkout-trigger-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
export default CartDrawer;
