import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppFAB.css';

export const WhatsAppFAB = () => {
  // Premium WhatsApp API path with local Pakistani cultural greeting Assalam-o-Alaikum
  const whatsappNumber = "923001234567"; // Standard Pakistani premium helpline template
  const customMessage = "Assalam-o-Alaikum Furniture Atelier, I am interested in your premium handcrafted furniture collection. Could you please share more details or assist me with a custom order?";
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customMessage)}`;

  return (
    <div className="whatsapp-fab-container">
      {/* Editorial Help Tooltip */}
      <span className="whatsapp-fab-tooltip">Chat with Atelier Designer</span>
      
      {/* Pulsing Green Circle */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-fab-btn"
        title="Contact Furniture on WhatsApp"
        aria-label="Chat with us on WhatsApp"
        id="whatsapp-fab-trigger"
      >
        <MessageCircle size={24} fill="#fff" />
      </a>
    </div>
  );
};
export default WhatsAppFAB;
