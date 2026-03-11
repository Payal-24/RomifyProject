
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Chairs.css";

function Chairs() {
    const { dispatch } = useCart();
  const navigate = useNavigate();
  // Navbar handlers
  const handleContactClick = () => navigate("/contact");
  const handleHomeClick = () => navigate("/");
  const handleLoginClick = () => navigate("/login");
  const handleShopClick = () => navigate("/items");
  const [previewImg, setPreviewImg] = useState(null);
  const [selectedChair, setSelectedChair] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState({});
  const [selectedColor, setSelectedColor] = useState({});

  const chairs = [
    {
      name: "Classic Wooden Chair",
      image: "/assets/Classic Wooden Chair1.png",
      price: "₹2,499",
      model: "/3dmodelschair1/wooden_chair_model.glb",
      gallery: [
        "/assets/Classic Wooden Chair1.png",
        "/assets/Classic Wooden Chair2.png",
        "/assets/Classic Wooden Chair3.png",
      ],
      details: [
        { label: "Material", value: "Solid Wood" },
        { label: "Color", value: "Natural Brown" },
        { label: "Style", value: "Classic" },
        { label: "Dimensions", value: "45W x 45D x 90H cm" },
        { label: "Special Feature", value: "Ergonomic Design" },
      ],
    },
    {
      name: "Modern Black Chair",
      image: "/assets/Modern Black Chair1.png",
      price: "₹3,199",
      model: "/3dmodelschair2/modern_black_chair_model.glb",
      gallery: [
        "/assets/Modern Black Chair1.png",
        "/assets/Modern Black Chair2.png",
        "/assets/Modern Black Chair3.png",
      ],
      details: [
        { label: "Material", value: "Metal & Leather" },
        { label: "Color", value: "Black" },
        { label: "Style", value: "Modern" },
        { label: "Dimensions", value: "48W x 50D x 92H cm" },
        { label: "Special Feature", value: "Swivel Base" },
      ],
    },
    {
      name: "Minimalist White Chair",
      image: "/assets/white chairs1.png",
      price: "₹2,799",
      model: "/3dmodels_chairs/minimalist_white_chair.glb",
      gallery: [
        "/assets/white chairs1.png",
        "/assets/white chairs3.png",
        "/assets/white chairs2.png",
      ],
      details: [
        { label: "Material", value: "Steel" },
        { label: "Color", value: "White" },
        { label: "Style", value: "Minimalist" },
        { label: "Dimensions", value: "44W x 44D x 88H cm" },
        { label: "Special Feature", value: "Stackable" },
      ],
    },
    {
      name: "Royal Blue Accent Chair",
      image: "/assets/Royal Blue Accent Chair1.png",
      price: "₹3,499",
      model: "/3dmodels_chairs/royal_blue_chair.glb",
      gallery: [
        "/assets/Royal Blue Accent Chair1.png",
        "/assets/Royal Blue Accent Chair2.png",
        "/assets/Royal Blue Accent Chair3.png",
      ],
      details: [
        { label: "Material", value: "Velvet & Wood" },
        { label: "Color", value: "Royal Blue" },
        { label: "Style", value: "Accent" },
        { label: "Dimensions", value: "50W x 52D x 95H cm" },
        { label: "Special Feature", value: "Soft Cushion" },
      ],
    },
    {
      name: "Beige Lounge Chair",
      image: "/assets/Beige Lounge Chair1.png",
      price: "₹4,199",
      model: "/3dmodels_chairs/beige_lounge_chair.glb",
      gallery: [
        "/assets/Beige Lounge Chair1.png",
        "/assets/Beige Lounge Chair2.png",
        "/assets/Beige Lounge Chair3.png",
      ],
      details: [
        { label: "Material", value: "Oak Wood" },
        { label: "Color", value: "Beige" },
        { label: "Style", value: "Lounge" },
        { label: "Dimensions", value: "52W x 55D x 98H cm" },
        { label: "Special Feature", value: "Premium Finish" },
      ],
    },
    {
      name: "Grey Fabric Chair",
      image: "/assets/Grey Fabric Chair1.png",
      price: "₹2,999",
      model: "/3dmodels_chairs/grey_fabric_chair.glb",
      gallery: [
        "/assets/Grey Fabric Chair1.png",
        "/assets/Grey Fabric Chair2.png",
        "/assets/Grey Fabric Chair3.png",
      ],
      details: [
        { label: "Material", value: "Fabric & Steel" },
        { label: "Color", value: "Grey" },
        { label: "Style", value: "Modern" },
        { label: "Dimensions", value: "46W x 48D x 90H cm" },
        { label: "Special Feature", value: "Lightweight" },
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
      <section className="chairs-page">
      <button className="back-btn" onClick={() => navigate("/items")}>← Back</button>
      <h1 className="chairs-title">Chairs Collection</h1>
      <div>
        <div className="chairs-container">
          <div className="chairs-list-row">
            {chairs.slice(0, 3).map((chair, idx) => (
              <div key={idx} className="chair-card">
                <button onClick={() => handleFavorite(idx)} className={`fav-btn${favorite[idx] ? " fav" : ""}`} title="Add to Favorites">
                  {favorite[idx] ? "♥" : "♡"}
                </button>
                <img src={chair.image} alt={chair.name} />
                <h3>{chair.name}</h3>
                <p>{chair.price}</p>
                <button className="buy-btn" onClick={() => { setSelectedChair(chair); setQuantity(1); }}>Buy Now</button>
              </div>
            ))}
          </div>
          <div className="chairs-list-row">
            {chairs.slice(3, 6).map((chair, idx) => (
              <div key={idx + 3} className="chair-card">
                <button onClick={() => handleFavorite(idx + 3)} className={`fav-btn${favorite[idx + 3] ? " fav" : ""}`} title="Add to Favorites">
                  {favorite[idx + 3] ? "♥" : "♡"}
                </button>
                <img src={chair.image} alt={chair.name} />
                <h3>{chair.name}</h3>
                <p>{chair.price}</p>
                <button className="buy-btn" onClick={() => { setSelectedChair(chair); setQuantity(1); }}>Buy Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Chair Details Modal */}
      {selectedChair && (
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
              {selectedChair.gallery.map((imgSrc, i) => (
                <img
                  key={i}
                  src={imgSrc}
                  alt={`${selectedChair.name} ${i+1}`}
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
                <div style={{ position: 'relative', display: 'inline-block' }}>
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
                    style={{ top: 8, right: 8, position: 'absolute', zIndex: 9999 }}
                    onClick={() => setPreviewImg(null)}
                    title="Close Preview"
                  >&#10005;</span>
                </div>
              </div>
            )}
            <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#b86b2a', fontSize: '1.5rem', letterSpacing: 1}}>{selectedChair.name}</h2>
            <p style={{marginBottom: 12, fontWeight: 600, fontSize: "1.2rem", color: '#7c5a36'}}>MRP {selectedChair.price} <span style={{fontSize: '0.95rem', color: '#888'}}>(incl. tax)</span></p>
            <div style={{marginBottom: 18, color: '#555', fontSize: '1.05rem', textAlign: 'left', background: '#fff7e6', borderRadius: 12, padding: '18px 22px', boxShadow: '0 2px 8px #f7ede2'}}>
              <div style={{marginBottom: 8}}><strong style={{color:'#b86b2a'}}>Product details</strong></div>
              <ul style={{paddingLeft: 18, marginBottom: 10}}>
                {selectedChair.details.map((d, i) => (
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
                  boxShadow: '0 2px 8px #f7ede2',
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
                  dispatch({ type: 'ADD_TO_CART', payload: { product: selectedChair, quantity } });
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
                  background: '#ffb84d',
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
                  e.currentTarget.style.background = '#ffb84d';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => setShowAR(true)}
              >View in Your Room</button>
            </div>
            <span
              onClick={() => { setSelectedChair(null); setShow3D(false); }}
              style={{
                position: 'absolute',
                top: 18,
                right: 22,
                fontSize: 28,
                fontWeight: 700,
                color: '#b86b2a',
                cursor: 'pointer',
                zIndex: 1100,
                background: '#fff7e6',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #f7ede2'
              }}
              title="Close"
            >&#10005;</span>
            {/* 3D Model Viewer Modal */}
                        {/* AR Viewer Modal */}
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
                  <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem', textAlign: 'center'}}>Scan the QR code below or tap the button to view this chair in your room using Augmented Reality (AR) on your mobile device.</p>
                  <model-viewer
                    src={selectedChair?.model}
                    ar
                    ar-modes="scene-viewer quick-look"
                    camera-controls
                    style={{ width: '320px', height: '320px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px #4caf50aa' }}
                    ios-src={selectedChair?.model}
                  ></model-viewer>
                  <a
                    href={selectedChair?.model}
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
                <div
                  className="chairs-modal-3d"
                  style={{
                    background: '#fff7e6',
                    borderRadius: window.innerWidth <= 600 ? 10 : 32,
                    padding: window.innerWidth <= 600 ? '8px 2px' : '36px 48px 32px 48px',
                    boxShadow: '0 12px 48px #e29547cc',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    minWidth: window.innerWidth <= 600 ? 0 : 600,
                    maxWidth: window.innerWidth <= 600 ? '98vw' : '98vw',
                    maxHeight: window.innerWidth <= 600 ? '95vh' : '95vh',
                  }}
                >
                  <h2 style={{
                    marginBottom: window.innerWidth <= 600 ? 6 : 10,
                    fontFamily: "'Playfair Display', serif",
                    color: '#b86b2a',
                    fontSize: window.innerWidth <= 600 ? '1.2rem' : '2rem',
                    letterSpacing: 1
                  }}>3D/AR View: Chair</h2>
                  <p style={{
                    marginBottom: window.innerWidth <= 600 ? 6 : 18,
                    color: '#7c5a36',
                    fontWeight: 500,
                    fontSize: window.innerWidth <= 600 ? '0.95rem' : '1.1rem'
                  }}>Interact with the model below. Use your mouse or touch to rotate, zoom, or view in AR on supported devices.</p>
                  <model-viewer
                    src={selectedChair.model}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    auto-rotate
                    style={{
                      width: window.innerWidth <= 600 ? '90vw' : '520px',
                      height: window.innerWidth <= 600 ? '220px' : '520px',
                      background: '#fff',
                      borderRadius: window.innerWidth <= 600 ? 8 : 18,
                      boxShadow: '0 4px 24px #e29547aa'
                    }}
                  ></model-viewer>
                  <button
                    onClick={() => setShow3D(false)}
                    style={{
                      marginTop: window.innerWidth <= 600 ? 12 : 28,
                      padding: window.innerWidth <= 600 ? '8px 18px' : '12px 32px',
                      borderRadius: window.innerWidth <= 600 ? 8 : 10,
                      background: '#b86b2a',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: window.innerWidth <= 600 ? '0.95rem' : '1.1rem',
                      boxShadow: '0 2px 12px #f7ede2',
                      cursor: 'pointer',
                      transition: 'background 0.22s, transform 0.22s',
                    }}
                  >Close 3D View</button>
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

export default Chairs;
