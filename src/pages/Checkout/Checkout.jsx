import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, ArrowLeft, Check, Sparkles, Loader2, Clipboard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

export const Checkout = ({ setView }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment, 3 = Success

  // Form Fields State
  const [shippingData, setShippingData] = useState({
    firstName: '', lastName: '', address: '', city: '', zip: '', phone: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNum: '', cardName: '', cardExpiry: '', cardCvc: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'advance'
  const [copiedField, setCopiedField] = useState('');

  const handleCopyText = (text, fieldLabel) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldLabel);
    setTimeout(() => setCopiedField(''), 2000);
  };

  // Coupons State
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState('');

  // Processing indicators
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState('');
  const [orderId, setOrderId] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponApplied('WELCOME10');
      setCouponError('');
    } else {
      setCouponError('Invalid atelier coupon code.');
    }
  };

  // Quick helper to fill test details
  const handleAutoFill = () => {
    setShippingData({
      firstName: 'Ayesha',
      lastName: 'Khan',
      address: '24-C, Ghalib Road, Gulberg III',
      city: 'Lahore',
      zip: '54000',
      phone: '+92 (300) 843-2100'
    });
    setPaymentData({
      cardNum: '4111 2222 3333 4444',
      cardName: 'Ayesha Khan',
      cardExpiry: '12/28',
      cardCvc: '112'
    });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingMsg(paymentMethod === 'cod' 
      ? 'Registering your Cash on Delivery order...' 
      : 'Authenticating advance booking transfer details...'
    );
    
    // Simulate high-fidelity network ticks
    setTimeout(() => {
      setProcessingMsg('Verifying architectural materials allocation...');
      
      setTimeout(() => {
        setProcessingMsg('Assembling final luxury dispatch manifest...');
        
        setTimeout(() => {
          setIsProcessing(false);
          const generatedOrderId = `FUR-${Math.floor(100000 + Math.random() * 900000)}`;
          setOrderId(generatedOrderId);
          setStep(3);
          clearCart();
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const discountAmount = (cartTotal * discountPercent) / 100;
  const grandTotal = cartTotal - discountAmount;

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p>Return to our catalog to select designs before finalizing your bespoke order.</p>
        <button className="btn btn-primary" onClick={() => setView('shop')} style={{ marginTop: '16px' }}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="checkout-wrapper container animate-slide-up" id="checkout-page">
      
      {/* 1. Header Steps Bar */}
      {step < 3 && (
        <div className="checkout-steps">
          <div className={`checkout-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
            <div className="checkout-step-num">{step > 1 ? <Check size={14} /> : "1"}</div>
            <span className="checkout-step-label">Shipping</span>
          </div>
          <div className={`checkout-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
            <div className="checkout-step-num">2</div>
            <span className="checkout-step-label">Payment</span>
          </div>
          <div className={`checkout-step ${step >= 3 ? 'active' : ''}`}>
            <div className="checkout-step-num">3</div>
            <span className="checkout-step-label">Complete</span>
          </div>
        </div>
      )}

      {/* 2. Main Funnel Interface */}
      {isProcessing ? (
        <div className="premium-card processing-container" id="payment-loading-state">
          <div className="processing-spinner"></div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>Securing Your Order</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{processingMsg}</p>
        </div>
      ) : step === 3 ? (
        /* Order complete Receipt Success State */
        <div className="success-container animate-scale-reveal" id="order-completed-receipt">
          <div className="success-badge">
            <Check size={32} />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Thank You For Designing With Us</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginTop: '8px' }}>Your Bespoke Order is Locked</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            A copy of your materials certificate and delivery routing tracker has been dispatched to your email address.
          </p>

          <div className="receipt-details">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', textTransform: 'uppercase', marginBottom: '12px' }}>Official Receipt</h3>
            <div className="receipt-row"><span>Order Reference</span><span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{orderId}</span></div>
            <div className="receipt-row"><span>Destination</span><span>{shippingData.address}, {shippingData.city}</span></div>
            <div className="receipt-row"><span>Logistics Routing</span><span>Complimentary White-Glove Courier</span></div>
            <div className="receipt-row"><span>Total Charges</span><span>Rs. {grandTotal.toLocaleString()}</span></div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setView('home')} id="success-home-btn">Return to Lounge</button>
            <button className="btn btn-secondary" onClick={() => window.print()} id="success-print-btn">Print Receipt</button>
          </div>
        </div>
      ) : (
        /* Funnel Steps */
        <div className="checkout-grid">
          
          {/* Left: Interactive Form Panels */}
          <div>
            {step === 1 ? (
              <form className="checkout-card" onSubmit={handleShippingSubmit} id="shipping-form">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 className="checkout-form-title" style={{ margin: 0 }}>White Glove Delivery Coordinates</h2>
                  <button type="button" className="btn-text" onClick={handleAutoFill} style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--secondary)' }} id="autofill-billing-btn">
                    Demo Autofill
                  </button>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input 
                      type="text" required className="form-input" 
                      value={shippingData.firstName}
                      onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                      id="shipping-first-name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input 
                      type="text" required className="form-input" 
                      value={shippingData.lastName}
                      onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                      id="shipping-last-name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Delivery Street Address</label>
                  <input 
                    type="text" required className="form-input" 
                    value={shippingData.address}
                    onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                    id="shipping-address"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input 
                      type="text" required className="form-input" 
                      value={shippingData.city}
                      onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                      id="shipping-city"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal / Zip Code</label>
                    <input 
                      type="text" required className="form-input" 
                      value={shippingData.zip}
                      onChange={(e) => setShippingData({...shippingData, zip: e.target.value})}
                      id="shipping-zip"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Contact Number</label>
                  <input 
                    type="tel" required className="form-input" 
                    placeholder="+1 (555) 000-0000"
                    value={shippingData.phone}
                    onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                    id="shipping-phone"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', marginTop: '16px' }} id="shipping-submit-btn">
                  Continue to Secure Payment
                </button>
              </form>
            ) : (
              /* Payment step */
              <form className="checkout-card" onSubmit={handlePaymentSubmit} id="payment-form">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <button type="button" className="btn-text" onClick={() => setStep(1)} style={{ color: 'var(--text-muted)' }} id="back-to-shipping-btn">
                    <ArrowLeft size={16} />
                  </button>
                  <h2 className="checkout-form-title" style={{ margin: 0 }}>Secure Settlement Vault</h2>
                </div>

                {/* Option Toggles */}
                <div className="payment-options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                  <div 
                    className={`payment-option-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                    style={{
                      border: paymentMethod === 'cod' ? '2px solid var(--secondary)' : '1px solid var(--border-light)',
                      backgroundColor: paymentMethod === 'cod' ? 'var(--bg-secondary)' : 'transparent',
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'var(--transition-snappy)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <input 
                        type="radio" 
                        name="payMethod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')} 
                        id="pay-method-cod"
                        style={{ accentColor: 'var(--secondary)' }}
                      />
                      <strong style={{ fontSize: '0.95rem' }}>Cash on Delivery</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      Settle balance at your doorstep in cash or card.
                    </p>
                  </div>

                  <div 
                    className={`payment-option-card ${paymentMethod === 'advance' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('advance')}
                    style={{
                      border: paymentMethod === 'advance' ? '2px solid var(--secondary)' : '1px solid var(--border-light)',
                      backgroundColor: paymentMethod === 'advance' ? 'var(--bg-secondary)' : 'transparent',
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'var(--transition-snappy)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <input 
                        type="radio" 
                        name="payMethod" 
                        checked={paymentMethod === 'advance'} 
                        onChange={() => setPaymentMethod('advance')} 
                        id="pay-method-advance"
                        style={{ accentColor: 'var(--secondary)' }}
                      />
                      <strong style={{ fontSize: '0.95rem' }}>Advance Payment</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      Direct bank wire, JazzCash, or EasyPaisa transfer.
                    </p>
                  </div>
                </div>

                {paymentMethod === 'cod' ? (
                  <div className="cod-info-box" style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <Truck size={20} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '0.95rem', fontFamily: 'var(--font-display)' }}>Step-by-Step Delivery Policy</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                          Our premium white-glove logistics team will coordinate dispatch directly to <strong>{shippingData.city}</strong>. We will place and assemble your furniture inside your home. Cash or Credit Card payment will be collected on assembly.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="advance-payment-details" style={{ marginBottom: '24px' }}>
                    
                    {/* Bank Transfer Details Box */}
                    <div className="details-card" style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', position: 'relative' }}>
                      <h4 style={{ margin: '0 0 16px 0', fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                        Direct Bank Transfer (Wire)
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Bank Name</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Bank Alfalah Premium</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Account Title</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Furniture Atelier (Pvt) Ltd</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-primary)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>IBAN / Account Number</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace' }}>PK72ALFA00241008432100</span>
                          </div>
                          <button 
                            type="button" 
                            className="btn-text" 
                            onClick={() => handleCopyText('PK72ALFA00241008432100', 'iban')}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--secondary)' }}
                            title="Copy IBAN"
                          >
                            <Clipboard size={14} />
                            <span>{copiedField === 'iban' ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Mobile Wallet Accounts Row */}
                      <h4 style={{ margin: '24px 0 16px 0', fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                        Mobile Wallet Accounts (EasyPaisa / JazzCash)
                      </h4>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {/* JazzCash */}
                        <div style={{ backgroundColor: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                          <span style={{ fontSize: '0.75rem', color: '#e67e22', display: 'block', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>JazzCash</span>
                          <span style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'monospace', display: 'block', marginBottom: '8px' }}>0300-8432100</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Title: Furniture Atelier</span>
                          <button 
                            type="button" 
                            className="btn-text" 
                            onClick={() => handleCopyText('03008432100', 'jazzcash')}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--secondary)', marginTop: '8px', padding: 0 }}
                          >
                            <Clipboard size={12} />
                            <span>{copiedField === 'jazzcash' ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* EasyPaisa */}
                        <div style={{ backgroundColor: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                          <span style={{ fontSize: '0.75rem', color: '#2ecc71', display: 'block', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>EasyPaisa</span>
                          <span style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'monospace', display: 'block', marginBottom: '8px' }}>0300-8432100</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Title: Furniture Atelier</span>
                          <button 
                            type="button" 
                            className="btn-text" 
                            onClick={() => handleCopyText('03008432100', 'easypaisa')}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--secondary)', marginTop: '8px', padding: 0 }}
                          >
                            <Clipboard size={12} />
                            <span>{copiedField === 'easypaisa' ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Payment Instructions */}
                      <p style={{ margin: '16px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', fontStyle: 'italic' }}>
                        * Sourcing and carpentry schedules will begin immediately upon receipt of a 50% partial booking transfer of <strong>Rs. {(grandTotal / 2).toLocaleString()}</strong>. Please preserve your transfer transaction ID or screenshot for validation.
                      </p>
                    </div>

                  </div>
                )}

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', marginTop: '16px', gap: '8px' }} id="payment-submit-btn">
                  <ShieldCheck size={18} />
                  <span>
                    {paymentMethod === 'cod' 
                      ? `Confirm Cash on Delivery Order` 
                      : `Confirm Order with Advance Transfer`
                    }
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Order Summary items, totals and coupons */}
          <aside className="premium-card summary-box">
            <h3 className="summary-title">Order Manifest</h3>

            <div className="summary-items">
              {cartItems.map(item => (
                <div className="summary-item" key={item.cartId}>
                  <img src={item.image} alt={item.name} className="summary-item-img" />
                  <div className="summary-item-details">
                    <h4 className="summary-item-name">{item.name}</h4>
                    <span className="summary-item-qty">{item.quantity} x {item.selectedColor.name}</span>
                  </div>
                  <span className="summary-item-price">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Coupons Promo Input */}
            <form className="coupon-row" onSubmit={handleApplyCoupon} id="coupon-form">
              <input 
                type="text" 
                className="form-input" 
                placeholder="PROMO CODE (e.g. WELCOME10)" 
                style={{ flex: 1, padding: '10px 14px', fontSize: '0.8rem' }}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                id="promo-code-input"
              />
              <button type="submit" className="btn btn-secondary" style={{ padding: '0 16px', textTransform: 'uppercase', fontSize: '0.75rem' }} id="apply-promo-btn">
                Apply
              </button>
            </form>
            {couponApplied && (
              <p style={{ fontSize: '0.8rem', color: 'var(--success)', marginBottom: '16px', fontWeight: 600 }}>
                ✓ Coupon WELCOME10 Applied: 10% Off
              </p>
            )}
            {couponError && (
              <p style={{ fontSize: '0.8rem', color: 'var(--error)', marginBottom: '16px', fontWeight: 600 }}>
                ✕ {couponError}
              </p>
            )}

            {/* Total breakdown rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--success)', fontWeight: 600 }}>
                  <span>Promo Discount (-{discountPercent}%)</span>
                  <span>-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>White-Glove Delivery</span>
                <span>Complimentary</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: '4px' }}>
                <span>Total Charges</span>
                <span>Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

          </aside>

        </div>
      )}

    </div>
  );
};
export default Checkout;
