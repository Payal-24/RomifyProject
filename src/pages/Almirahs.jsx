import "./Almirahs.css";

// Import statements should remain at the top


import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// model-viewer is loaded via CDN in index.html


function Almirahs() {
  const navigate = useNavigate();
  // Navbar handlers
  const handleContactClick = () => navigate("/contact");
  const handleHomeClick = () => navigate("/");
  const handleLoginClick = () => navigate("/login");
  const handleShopClick = () => navigate("/items");
  const [previewImg, setPreviewImg] = useState(null);
  const [selectedAlmirah, setSelectedAlmirah] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  // Cart context
  const { dispatch } = useCart();

  const almirahs = [
    {
      name: "Classic Wooden Almirah",
      image: "/assets/almirahs1.jpg",
      price: "₹12,999",
      model: "/3dmodels1/almirah_model.glb",
      gallery: [
        "/assets/almirahs1.jpg",
        "/assets/almirah2.jpg",
        "/assets/almirahs3.jpg",
      ],
      details: [
        { label: "Brand", value: "Classic Home" },
        { label: "Material", value: "Solid Wood" },
        { label: "Color", value: "White" },
        { label: "Dimensions", value: "46D x 78W x 180H cm" },
        { label: "Special Feature", value: "Scratch Resistant" },
      ],
  
    },
    {
      name: "Rustic Oak Almirah",
      image: "/assets/Rustic Oak Almirah1.png",
      price: "₹15,499",
      model: "/3dmodels2/modern_almirah_model.glb",
      gallery: [
        "/assets/Rustic Oak Almirah1.png",
        "/assets/Rustic Oak Almirah2.png",
        "/assets/Rustic Oak Almirah3.png",
      ],
      details: [
        { label: "Brand", value: "A GLOBIA CREATIONS" },
        { label: "Material", value: "Engineered Wood" },
        { label: "Color", value: "Exotic Teak and Frosty White" },
        { label: "Dimensions", value: "46D x 78W x 180H cm" },
        { label: "Special Feature", value: "Scratch Resistant" },
      ],
    
    },
    {
      name: "Premium Teak Almirah",
      image: "/assets/Premium Teak Almirah1.png",
      price: "₹19,999",
      model: "/3dmodels3/premium_teak_almirah.glb",
      gallery: [
        "/assets/Premium Teak Almirah1.png",
        "/assets/Premium Teak Almirah2.png",
        "/assets/Premium Teak Almirah3.png",
      ],
      details: [
        { label: "Material", value: "Teak Wood" },
        { label: "Surface Finish", value: "Polished" },
        { label: "Usage/Application", value: "Home" },
        { label: "Color", value: "Brown" },
        { label: "Size", value: "5x4 Feet (LxW)" },
      ],
    
    },
    {
      name: "Urban Walnut Almirah",
      image: "/assets/Urban Walnut Almirah1.png",
      price: "₹14,499",
      model: "/3dmodels4/urban_walnut_almirah_detailed.glb",
      gallery: [
        "/assets/Urban Walnut Almirah1.png",
        "/assets/Urban Walnut Almirah2.png",
        "/assets/Urban Walnut Almirah3.png",
      ],
      details: [
        { label: "Brand", value: "Walnut Urban" },
        { label: "Material", value: "Engineered Wood" },
        { label: "Color", value: "Walnut" },
        { label: "Dimensions", value: "47D x 77W x 182H cm" },
        { label: "Special Feature", value: "Minimalist Design" },
      ],
   
    },
    {
      name: "Vintage Pine Almirah",
      image: "/assets/Vintage Pine Almirah1.png",
      price: "₹13,999",
      model: "/3dmodels5/vintage_turquoise_cabinet.glb",
      gallery: [
        "/assets/Vintage Pine Almirah1.png",
        "/assets/Vintage Pine Almirah2.png",
        "/assets/Vintage Pine Almirah3.png",
      ],
      details: [
        { label: "Brand", value: "Vintage Pine Collection" },
        { label: "Material", value: "Solid Pine Wood" },
        { label: "Color", value: "Turquoise Pine" },
        { label: "Dimensions", value: "48D x 80W x 185H cm" },
        { label: "Special Feature", value: "Antique Finish" },
      ],
      
    },
    {
      name: "Contemporary Maple Almirah",
      image: "/assets/Contemporary Maple Almirah1.png",
      price: "₹16,299",
      model: "/3dmodels6/contemporary_cane_almirah_detailed.glb",
      gallery: [
        "/assets/Contemporary Maple Almirah1.png",
        "/assets/Contemporary Maple Almirah2.png",
        "/assets/Contemporary Maple Almirah3.png",
      ],
      details: [
        { label: "Brand", value: "Maple Moderns" },
        { label: "Material", value: "Maple Wood" },
        { label: "Color", value: "Maple Brown" },
        { label: "Dimensions", value: "45D x 75W x 180H cm" },
        { label: "Special Feature", value: "Contemporary Design" },
      ],
    },
    {
      name: "Scandinavian Oak Almirah",
      image: "/assets/Scandinavian Oak Almirah1.png",
      price: "₹17,499",
      model: "/3dmodels7/dark_coffee_mustard_arch_almirah.glb",
      gallery: [
        "/assets/Scandinavian Oak Almirah1.png",
        "/assets/Scandinavian Oak Almirah2.png",
        "/assets/Scandinavian Oak Almirah3.png",
      ],
      details: [
        { label: "Brand", value: "Oak Scandinavia" },
        { label: "Material", value: "Engineered Oak Wood" },
        { label: "Color", value: "Light Oak" },
        { label: "Dimensions", value: "47D x 77W x 182H cm" },
        { label: "Special Feature", value: "Minimalist Nordic Design" },
      ],
     
    },
  ];

  const handleFavorite = (idx) => {
    setFavorite((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleColorSelect = (idx, color) => {
    setSelectedColor((prev) => ({ ...prev, [idx]: color }));
  };

  return (
    <>
      <Navbar
        onContactClick={handleContactClick}
        onHomeClick={handleHomeClick}
        onLoginClick={handleLoginClick}
        onShopClick={handleShopClick}
      />
      <section className="almirahs-page">
      <button className="back-btn" onClick={() => navigate("/items")}>← Back</button>
      <h1 className="almirahs-title">Almirahs Collection</h1>
      <div className="almirahs-container">
        <div className="almirahs-list-row">
          {almirahs.slice(0, 3).map((almirah, idx) => (
            <div key={idx} className="almirah-card">
              <button onClick={() => handleFavorite(idx)} className={`fav-btn${favorite[idx] ? " fav" : ""}`} title="Add to Favorites">
                {favorite[idx] ? "♥" : "♡"}
              </button>
              <img src={almirah.image} alt={almirah.name} />
              <h3>{almirah.name}</h3>
              <p>{almirah.price}</p>
              <button className="buy-btn" onClick={() => { setSelectedAlmirah(almirah); setQuantity(1); }}>Buy Now</button>
            </div>
          ))}
        </div>
        <div className="almirahs-list-row">
          {almirahs.slice(3, 6).map((almirah, idx) => (
            <div key={idx + 3} className="almirah-card">
              <button onClick={() => handleFavorite(idx + 3)} className={`fav-btn${favorite[idx + 3] ? " fav" : ""}`} title="Add to Favorites">
                {favorite[idx + 3] ? "♥" : "♡"}
              </button>
              <img src={almirah.image} alt={almirah.name} />
              <h3>{almirah.name}</h3>
              <p>{almirah.price}</p>
              <button className="buy-btn" onClick={() => { setSelectedAlmirah(almirah); setQuantity(1); }}>Buy Now</button>
            </div>
          ))}
        </div>
      </div>
      {/* Almirah Details Modal */}
      {selectedAlmirah && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#fff7e6",
            borderRadius: 24,
            padding: "36px 40px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            minWidth: 440,
            maxWidth: 620,
            height: 'auto',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
            border: "2px solid #e29547",
            position: 'relative'
          }}>
            <div style={{display: 'flex', gap: 18, marginBottom: 18}}>
              {selectedAlmirah.gallery.map((imgSrc, i) => (
                <img
                  key={i}
                  src={imgSrc}
                  alt={`${selectedAlmirah.name} ${i+1}`}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 16,
                    boxShadow: '0 4px 16px #e29547aa',
                    border: '2px solid #e29547',
                    cursor: 'pointer',
                    transition: 'transform 0.22s',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  onClick={() => setPreviewImg(imgSrc)}
                />
              ))}
            </div>
            {previewImg && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3000
              }}>
                <div style={{
                  position: 'relative',
                  display: 'inline-block',
                }}>
                  <img
                    src={previewImg}
                    alt="Preview"
                    style={{
                      maxWidth: '70vw',
                      maxHeight: '70vh',
                      borderRadius: 24,
                      boxShadow: '0 8px 32px #e29547aa',
                      border: '4px solid #fff7e6',
                      background: '#fff7e6',
                    }}
                  />
                  <span
                    className="modal-close-btn"
                    style={{
                      top: 8,
                      right: 8,
                      position: 'absolute',
                      zIndex: 9999
                    }}
                    onClick={() => setPreviewImg(null)}
                    title="Close Preview"
                  >&#10005;</span>
                </div>
              </div>
            )}
            <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#b86b2a', fontSize: '1.5rem', letterSpacing: 1}}>{selectedAlmirah.name}</h2>
            <p style={{marginBottom: 12, fontWeight: 600, fontSize: "1.2rem", color: '#7c5a36'}}>MRP {selectedAlmirah.price} <span style={{fontSize: '0.95rem', color: '#888'}}>(incl. tax)</span></p>
            <div style={{marginBottom: 18, color: '#555', fontSize: '1.05rem', textAlign: 'left', background: '#fff7e6', borderRadius: 12, padding: '18px 22px', boxShadow: '0 2px 8px #f7ede2'}}>
              <div style={{marginBottom: 8}}><strong style={{color:'#b86b2a'}}>Product details</strong></div>
              <ul style={{paddingLeft: 18, marginBottom: 10}}>
                {selectedAlmirah.details.map((d, i) => (
                  <li key={i}><strong>{d.label}:</strong> {d.value}</li>
                ))}
              </ul>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 24, marginBottom: 8, justifyContent: 'center'}}>
              <span style={{fontWeight: 600, color: '#b86b2a'}}>Quantity:</span>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{padding: '4px 12px', fontSize: 18, borderRadius: 6, border: '1px solid #e29547', background: '#fff', color: '#b86b2a', cursor: 'pointer', fontWeight: 700}}>-</button>
              <span style={{fontWeight: 600, fontSize: 18, minWidth: 24, textAlign: 'center'}}>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} style={{padding: '4px 12px', fontSize: 18, borderRadius: 6, border: '1px solid #e29547', background: '#fff', color: '#b86b2a', cursor: 'pointer', fontWeight: 700}}>+</button>
            </div>
            <div style={{display: 'flex', gap: 18, marginTop: 8, justifyContent: 'center'}}>
              <button
                style={{
                  padding: '10px 28px',
                  borderRadius: 8,
                  background: '#e29547',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 2px 8px #e2954744',
                  cursor: 'pointer',
                  transition: 'background 0.22s, transform 0.22s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#b86b2a';
                  e.currentTarget.style.transform = 'scale(1.07)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = '#e29547';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => {
                  dispatch({ type: 'ADD_TO_CART', payload: { product: selectedAlmirah, quantity } });
                }}
              >Add to Cart</button>
              <button
                style={{
                  padding: '10px 28px',
                  borderRadius: 8,
                  background: '#b86b2a',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 2px 8px #f7ede2',
                  cursor: 'pointer',
                  transition: 'background 0.22s, transform 0.22s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#e29547';
                  e.currentTarget.style.transform = 'scale(1.07)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = '#b86b2a';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => setShow3D(true)}
              >View in 3D Model</button>
              <button
                style={{
                  padding: '10px 28px',
                  borderRadius: 8,
                  background: '#ce9834',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 2px 8px #d09527',
                  cursor: 'pointer',
                  transition: 'background 0.22s, transform 0.22s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#d09527';
                  e.currentTarget.style.transform = 'scale(1.07)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = '#d09527';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => setShowAR(true)}
              >View in Your Room</button>
            </div>
            <span
              className="modal-close-btn"
              onClick={() => { setSelectedAlmirah(null); setShow3D(false); }}
              title="Close"
            >&#10005;</span>
            {/* 3D Model Viewer Modal */}
            {show3D && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 4000
              }}>
                <div style={{
                  background: '#fff7e6',
                  borderRadius: 32,
                  padding: '36px 48px 32px 48px',
                  boxShadow: '0 12px 48px #e29547cc',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  minWidth: 600,
                  maxWidth: '98vw',
                  maxHeight: '95vh',
                }}>
                  <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#b86b2a', fontSize: '2rem', letterSpacing: 1}}>3D/AR View: Almirah</h2>
                  <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem'}}>Interact with the model below. Use your mouse or touch to rotate, zoom, or view in AR on supported devices.</p>
                  <model-viewer
                    src={selectedAlmirah.model}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    auto-rotate
                    style={{ width: '520px', height: '520px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px #e29547aa' }}
                  ></model-viewer>
                  <button
                    onClick={() => setShow3D(false)}
                    style={{
                      marginTop: 28,
                      padding: '12px 32px',
                      borderRadius: 10,
                      background: '#b86b2a',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: '0 2px 12px #f7ede2',
                      cursor: 'pointer',
                      transition: 'background 0.22s, transform 0.22s',
                    }}
                  >Close 3D View</button>
                </div>
              </div>
            )}

            {/* AR Modal */}
            {showAR && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 4100
              }}>
                <div style={{
                  background: '#fff7e6',
                  borderRadius: 32,
                  padding: '36px 48px 32px 48px',
                  boxShadow: '0 12px 48px #4caf50cc',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  minWidth: 400,
                  maxWidth: '98vw',
                  maxHeight: '95vh',
                }}>
                  <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#357a38', fontSize: '2rem', letterSpacing: 1}}>View in Your Room (AR)</h2>
                  <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem', textAlign: 'center'}}>Scan the QR code below or tap the button to view this almirah in your room using Augmented Reality (AR) on your mobile device.</p>
                  <model-viewer
                    src={selectedAlmirah.model}
                    ar
                    ar-modes="scene-viewer quick-look"
                    camera-controls
                    style={{ width: '320px', height: '320px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px #4caf50aa' }}
                    ios-src={selectedAlmirah.model}
                  ></model-viewer>
                  <a
                    href={selectedAlmirah.model}
                    rel="noopener noreferrer"
                    style={{
                      marginTop: 18,
                      padding: '10px 24px',
                      borderRadius: 8,
                      background: '#4caf50',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px #4caf5044',
                      cursor: 'pointer',
                      transition: 'background 0.22s, transform 0.22s',
                    }}
                    target="_blank"
                  >Open in AR</a>
                  <button
                    onClick={() => setShowAR(false)}
                    style={{
                      marginTop: 18,
                      padding: '10px 28px',
                      borderRadius: 8,
                      background: '#357a38',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: '0 2px 8px #4caf5044',
                      cursor: 'pointer',
                      transition: 'background 0.22s, transform 0.22s',
                    }}
                  >Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </section>
    </>
  );
}

export default Almirahs;
