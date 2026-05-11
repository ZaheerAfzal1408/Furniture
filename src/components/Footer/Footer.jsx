import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import './Footer.css';

export const Footer = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        
        {/* Main Grid */}
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-brand-col">
            <a href="#home" className="footer-logo" onClick={(e) => { e.preventDefault(); setView('home'); }}>
              <Sparkles size={24} style={{ color: 'var(--secondary-light)' }} />
              <span>Vélure</span>
            </a>
            <p className="footer-desc">
              Crafting premium, bespoke living assets that merge mid-century aesthetics with durable scandinavian longevity. Each piece carries our legacy of wooden integrity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Collections</h4>
            <ul className="footer-links">
              <li><button className="footer-link btn-text" onClick={() => setView('shop', null, 'Living Room')}>Living Room</button></li>
              <li><button className="footer-link btn-text" onClick={() => setView('shop', null, 'Dining')}>Dining Room</button></li>
              <li><button className="footer-link btn-text" onClick={() => setView('shop', null, 'Bedroom')}>Bedroom Suite</button></li>
              <li><button className="footer-link btn-text" onClick={() => setView('shop', null, 'Office')}>Office Studio</button></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="footer-title">Craft Atelier</h4>
            <ul className="footer-links">
              <li><button className="footer-link btn-text" onClick={() => setView('shop')}>Explore Atelier</button></li>
              <li><button className="footer-link btn-text" onClick={() => setView('home')}>Our Philosophy</button></li>
              <li><button className="footer-link btn-text" onClick={() => setView('home')}>Materials Guide</button></li>
              <li><button className="footer-link btn-text" onClick={() => setView('home')}>Sustainability</button></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-news-col">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-news-desc">
              Subscribe to unlock seasonal lookbooks and private atelier exhibition events.
            </p>
            <form className="footer-news-form" onSubmit={handleSubscribe} id="footer-news-form">
              <input 
                type="email" 
                className="footer-news-input" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
                id="footer-email-input"
              />
              <button 
                type="submit" 
                className="footer-news-btn"
                title="Subscribe"
                aria-label="Subscribe"
                id="footer-subscribe-btn"
              >
                {isSubscribed ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </form>
            {isSubscribed && (
              <p style={{ fontSize: '0.8rem', color: 'var(--secondary-light)', marginTop: '8px' }}>
                Welcome to the Vélure Circle. Invitation sent.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Vélure Inc. All rights reserved. Made for premium design lovers.</span>
          <div className="footer-social-links" style={{ display: 'flex', gap: '20px', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            <a href="#instagram" className="footer-social-icon" aria-label="Instagram" style={{ textTransform: 'uppercase' }}>Instagram</a>
            <a href="#facebook" className="footer-social-icon" aria-label="Facebook" style={{ textTransform: 'uppercase' }}>Facebook</a>
            <a href="#twitter" className="footer-social-icon" aria-label="Twitter" style={{ textTransform: 'uppercase' }}>Twitter</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
