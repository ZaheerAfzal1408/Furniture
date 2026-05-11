import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Trash2, Sofa, Armchair, HelpCircle, Check, ArrowRight, Table, Layers, Bed, Laptop } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import './RoomPlanner.css';

// Pre-defined structural metrics for planner miniatures (width/height in grid scale units, 1 unit = 25px)
const libraryFurniture = [
  {
    id: "v-sofa-01",
    name: "Emilie Bouclé Sofa",
    price: 1850,
    width: 140, // pixels
    height: 70,
    icon: <Sofa size={24} />,
    color: "#e5dec9",
    category: "Living Room"
  },
  {
    id: "v-chair-02",
    name: "Aura Velvet Armchair",
    price: 680,
    width: 60,
    height: 60,
    icon: <Armchair size={22} />,
    color: "#556b2f",
    category: "Living Room"
  },
  {
    id: "v-table-03",
    name: "Walnut Dining Table",
    price: 1450,
    width: 120,
    height: 75,
    icon: <Table size={24} />,
    color: "#4d3a2e",
    category: "Dining"
  },
  {
    id: "v-credenza-04",
    name: "Vantage Oak Sideboard",
    price: 1150,
    width: 100,
    height: 40,
    icon: <Layers size={22} />,
    color: "#c89d7c",
    category: "Dining"
  },
  {
    id: "v-bed-05",
    name: "Linen Canopy Bed",
    price: 2100,
    width: 110,
    height: 120,
    icon: <Bed size={24} />,
    color: "#ebdcd0",
    category: "Bedroom"
  },
  {
    id: "v-desk-06",
    name: "Scribe Walnut Desk",
    price: 820,
    width: 90,
    height: 50,
    icon: <Laptop size={20} />,
    color: "#3e2723",
    category: "Office"
  }
];

export const RoomPlanner = () => {
  const { addToCart } = useCart();
  const [placedItems, setPlacedItems] = useState([
    // Starter layout for visual wow factor
    {
      uniqueId: "starter-sofa",
      id: "v-sofa-01",
      name: "Emilie Bouclé Sofa",
      price: 1850,
      width: 140,
      height: 70,
      x: 180,
      y: 150,
      rotation: 0,
      icon: <Sofa size={24} />,
      color: "#ebdcd0"
    },
    {
      uniqueId: "starter-chair",
      id: "v-chair-02",
      name: "Aura Velvet Armchair",
      price: 680,
      width: 60,
      height: 60,
      x: 360,
      y: 155,
      rotation: -45,
      icon: <Armchair size={22} />,
      color: "#556b2f"
    }
  ]);

  const [selectedId, setSelectedId] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [addedAllSuccess, setAddedAllSuccess] = useState(false);

  const canvasRef = useRef(null);

  // Deselect selected item on canvas clicks
  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current) {
      setSelectedId(null);
    }
  };

  // Add library item to canvas
  const handleAddFurniture = (item) => {
    const newItem = {
      uniqueId: `placed-${Date.now()}`,
      id: item.id,
      name: item.name,
      price: item.price,
      width: item.width,
      height: item.height,
      x: 150,
      y: 150,
      rotation: 0,
      icon: item.icon,
      color: item.color
    };
    setPlacedItems(prev => [...prev, newItem]);
    setSelectedId(newItem.uniqueId);
  };

  // Start dragging item on Canvas
  const handleItemMouseDown = (item, e) => {
    e.stopPropagation();
    setSelectedId(item.uniqueId);
    setDraggedId(item.uniqueId);
    
    // Calculate initial pointer offset within the item
    const bounds = e.currentTarget.getBoundingClientRect();
    const xOffset = e.clientX - bounds.left;
    const yOffset = e.clientY - bounds.top;
    setDragOffset({ x: xOffset, y: yOffset });
  };

  // Drag movement listener
  const handleMouseMove = (e) => {
    if (!draggedId || !canvasRef.current) return;

    const canvasBounds = canvasRef.current.getBoundingClientRect();
    
    // Relative position inside the canvas container
    let proposedX = e.clientX - canvasBounds.left - dragOffset.x;
    let proposedY = e.clientY - canvasBounds.top - dragOffset.y;

    setPlacedItems(prev => prev.map(item => {
      if (item.uniqueId === draggedId) {
        // Enforce boundary safety
        const maxX = canvasBounds.width - item.width;
        const maxY = canvasBounds.height - item.height;
        const safeX = Math.max(0, Math.min(proposedX, maxX));
        const safeY = Math.max(0, Math.min(proposedY, maxY));
        
        return { ...item, x: safeX, y: safeY };
      }
      return item;
    }));
  };

  // End drag gesture
  const handleMouseUp = () => {
    setDraggedId(null);
  };

  useEffect(() => {
    if (draggedId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedId, dragOffset]);

  // Rotates selected item by 15deg
  const handleRotate = (uniqueId, e) => {
    e.stopPropagation();
    setPlacedItems(prev => prev.map(item => {
      if (item.uniqueId === uniqueId) {
        return { ...item, rotation: (item.rotation + 45) % 360 };
      }
      return item;
    }));
  };

  // Removes item from canvas
  const handleDelete = (uniqueId, e) => {
    e.stopPropagation();
    setPlacedItems(prev => prev.filter(item => item.uniqueId !== uniqueId));
    if (selectedId === uniqueId) setSelectedId(null);
  };

  // Sum active elements prices
  const totalLayoutCost = placedItems.reduce((acc, item) => acc + item.price, 0);

  // Add all elements from layout to cart
  const handleAddAllToCart = () => {
    if (placedItems.length === 0) return;

    placedItems.forEach(item => {
      // Find original details from standard database to extract variant fields
      const originalProduct = products.find(p => p.id === item.id);
      if (originalProduct) {
        addToCart(originalProduct, 1, originalProduct.colors[0], originalProduct.materials[0]);
      }
    });

    setAddedAllSuccess(true);
    setTimeout(() => {
      setAddedAllSuccess(false);
    }, 3000);
  };

  return (
    <div className="planner-layout">
      
      {/* Draggable Library */}
      <aside className="planner-sidebar">
        <div>
          <h3 className="planner-section-title">Design Library</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Click an item to spawn it on your Lounge Draft canvas. Drag to position, click to rotate or delete.
          </p>
        </div>

        <div className="library-items-grid">
          {libraryFurniture.map(item => (
            <div 
              key={item.id} 
              className="library-item-card"
              onClick={() => handleAddFurniture(item)}
              title={`Add ${item.name}`}
              id={`spawn-${item.id}`}
            >
              <div className="library-item-preview">
                {item.icon}
              </div>
              <div className="library-item-details">
                <h4 className="library-item-name">{item.name}</h4>
                <span className="library-item-price">Rs. {item.price.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ticker pricing element */}
        <div className="premium-card planner-ticker-card">
          <div className="planner-ticker-header">
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Estimated Layout Cost</span>
              <div className="planner-ticker-price">Rs. {totalLayoutCost.toLocaleString()}</div>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {placedItems.length} {placedItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button 
            className="btn btn-primary planner-ticker-btn" 
            onClick={handleAddAllToCart}
            disabled={placedItems.length === 0}
            id="planner-add-all-btn"
          >
            {addedAllSuccess ? (
              <>
                <Check size={16} />
                <span>Added Placed Items!</span>
              </>
            ) : (
              <>
                <span>Import Draft to Cart</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Grid Canvas Panel */}
      <section className="planner-workspace-container">
        <div className="planner-workspace-header">
          <h3 className="planner-section-title" style={{ border: 'none', padding: 0 }}>Lounge Draft Visualizer</h3>
          <div className="canvas-instructions">
            <HelpCircle size={14} />
            <span>Grid scale: 1 Square = 1 foot</span>
          </div>
        </div>

        <div 
          className="planner-canvas" 
          ref={canvasRef}
          onClick={handleCanvasClick}
          id="planner-canvas-board"
        >
          {placedItems.map((item) => {
            const isSelected = item.uniqueId === selectedId;

            return (
              <div
                key={item.uniqueId}
                className={`placed-furniture ${isSelected ? 'selected' : ''}`}
                style={{
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  backgroundColor: isSelected ? 'var(--bg-secondary)' : item.color,
                  border: isSelected ? '2px solid var(--secondary)' : '1px solid var(--primary)',
                  transform: `rotate(${item.rotation}deg)`
                }}
                onMouseDown={(e) => handleItemMouseDown(item, e)}
                id={`placed-${item.uniqueId}`}
              >
                {/* Visual anchors */}
                {isSelected && (
                  <>
                    <button 
                      className="furniture-rotate-handle" 
                      onMouseDown={(e) => handleRotate(item.uniqueId, e)}
                      title="Rotate 45°"
                      aria-label="Rotate item"
                    >
                      <RotateCw size={12} />
                    </button>
                    <button 
                      className="furniture-delete-handle" 
                      onMouseDown={(e) => handleDelete(item.uniqueId, e)}
                      title="Remove furniture"
                      aria-label="Delete item"
                    >
                      <Trash2 size={12} />
                    </button>
                  </>
                )}

                <div className="furniture-icon-container" style={{ color: 'var(--primary)' }}>
                  {item.icon}
                  <span className="furniture-label" style={{ color: 'var(--primary-dark)' }}>{item.name}</span>
                </div>
              </div>
            );
          })}

          {placedItems.length === 0 && (
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: 'var(--text-muted)'
            }}>
              <Sofa size={36} style={{ marginBottom: '12px', opacity: 0.5 }} />
              <p>Your canvas is empty.</p>
              <p style={{ fontSize: '0.8rem' }}>Spawn items from the left side shelf to draft your room layout.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default RoomPlanner;
