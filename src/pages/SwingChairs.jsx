import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function SwingChairs() {
  const navigate = useNavigate();
  const handleContactClick = () => navigate("/contact");
  const handleHomeClick = () => navigate("/");
  const handleLoginClick = () => navigate("/login");
  const handleShopClick = () => navigate("/items");
  const [favorite, setFavorite] = useState({});
  const [selectedChair, setSelectedChair] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [previewImg, setPreviewImg] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const swingChairs = [
    {
      name: "Rattan Swing Chair",
      image: "/assets/Rattan Swing Chair1.png",
      price: "₹3200",
      model: "/3dmodels7/rattan_swing_chair.glb",
      gallery: [
        "/assets/Rattan Swing Chair1.png",
        "/assets/Rattan Swing Chair2.png",
        "/assets/Rattan Swing Chair3.png"
      ],
      details: [
        { label: "Material", value: "Rattan" },
        { label: "Capacity", value: "1 Seater" },
        { label: "Finish", value: "Natural" },
        { label: "Dimensions", value: "100L x 70W x 120H cm" },
        { label: "Special Feature", value: "Weather Resistant" },
      ],
    },
    {
      name: "Hanging Swing Chair",
      image: "/assets/Hanging Swing Chair1.png",
      price: "₹4100",
      model: "/3dmodels6/hanging_swing_chair.glb",
      gallery: [
        "/assets/Hanging Swing Chair1.png",
        "/assets/Hanging Swing Chair2.png",
        "/assets/Hanging Swing Chair3.png"
      ],
      details: [
        { label: "Material", value: "Wicker" },
        { label: "Capacity", value: "2 Seater" },
        { label: "Finish", value: "Brown" },
        { label: "Dimensions", value: "120L x 80W x 130H cm" },
        { label: "Special Feature", value: "Cushioned Seat" },
      ],
    },
    {
      name: "Outdoor Swing Chair",
      image: "/assets/Outdoor Swing Chair1.png",
      price: "₹3800",
      model: "/3dmodels5/outdoor_swing_chair.glb",
      gallery: [
        "/assets/Outdoor Swing Chair1.png",
        "/assets/Outdoor Swing Chair2.png",
        "/assets/Outdoor Swing Chair3.png"
      ],
      details: [
        { label: "Material", value: "Metal" },
        { label: "Capacity", value: "1 Seater" },
        { label: "Finish", value: "Powder Coated" },
        { label: "Dimensions", value: "110L x 75W x 125H cm" },
        { label: "Special Feature", value: "Rust Proof" },
      ],
    },
    {
      name: "Indoor Swing Chair",
      image: "/assets/Indoor Swing Chair1.png",
      price: "₹3500",
      model: "/3dmodels4/indoor_swing_chair.glb",
      gallery: [
        "/assets/Indoor Swing Chair1.png",
        "/assets/Indoor Swing Chair2.png",
        "/assets/Indoor Swing Chair3.png"
      ],
      details: [
        { label: "Material", value: "Cotton Rope" },
        { label: "Capacity", value: "1 Seater" },
        { label: "Finish", value: "White" },
        { label: "Dimensions", value: "90L x 60W x 110H cm" },
        { label: "Special Feature", value: "Handmade" },
      ],
    },
  ];
  return (
    <>
      <Navbar
        onContactClick={handleContactClick}
        onHomeClick={handleHomeClick}
        onLoginClick={handleLoginClick}
        onShopClick={handleShopClick}
      />
      <section className="tables-page">
      <button className="back-btn" onClick={() => navigate("/items")}>
        ← Back
      </button>
      <h1 className="tables-title">Swing Chairs Collection</h1>
      {(!swingChairs || swingChairs.length === 0) && (
        <div style={{color: 'red', fontWeight: 700, fontSize: 22, margin: 40}}>No swing chairs found. Please check your data.</div>
      )}
      <div className="tables-container">
        <div className="tables-list-row">
          {swingChairs.slice(0, 3).map((chair, idx) => (
            <div key={idx} className="table-card">
              <button onClick={() => setFavorite(f => ({ ...f, [idx]: !f[idx] }))} className={`fav-btn${favorite[idx] ? " fav" : ""}`} title="Add to Favorites">
                {favorite[idx] ? "♥" : "♡"}
              </button>
              <img
                src={chair.image}
                alt={chair.name}
                style={{ objectFit: "contain", width: "160px", height: "160px", background: "#fff" }}
              />
              <h3>{chair.name}</h3>
              <p>{chair.price}</p>
              <button className="buy-btn" onClick={() => { setSelectedChair(chair); setQuantity(1); }}>Buy Now</button>
            </div>
          ))}
        </div>
        {swingChairs.length > 3 && (
          <div className="tables-list-row">
            {swingChairs.slice(3, 6).map((chair, idx) => (
              <div key={idx + 3} className="table-card">
                <button onClick={() => setFavorite(f => ({ ...f, [idx + 3]: !f[idx + 3] }))} className={`fav-btn${favorite[idx + 3] ? " fav" : ""}`} title="Add to Favorites">
                  {favorite[idx + 3] ? "♥" : "♡"}
                </button>
                <img
                  src={chair.image}
                  alt={chair.name}
                  style={{ objectFit: "contain", width: "160px", height: "160px", background: "#fff" }}
                />
                <h3>{chair.name}</h3>
                <p>{chair.price}</p>
                <button className="buy-btn" onClick={() => { setSelectedChair(chair); setQuantity(1); }}>Buy Now</button>
              </div>
            ))}
          </div>
        )}
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
                <button
                  onClick={() => setPreviewImg(null)}
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 36,
                    zIndex: 3100,
                    background: '#fff7e6',
                    border: '2px solid #b86b2a',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#b86b2a',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #f7ede2'
                  }}
                  title="Close Preview"
                >&#10005;</button>
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
              onClick={() => { setSelectedChair(null); setPreviewImg(null); setShow3D(false); }}
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
                  <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem', textAlign: 'center'}}>Scan the QR code below or tap the button to view this swing chair in your room using Augmented Reality (AR) on your mobile device.</p>
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
                  <div className="tables-3d-modal" style={{
                    background: '#fff7e6',
                    borderRadius: 32,
                    padding: '36px 48px 32px 48px',
                    boxShadow: '0 12px 48px #e29547cc',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    maxWidth: '98vw',
                    maxHeight: '95vh',
                  }}>
                  <h2 className="tables-3d-modal-title">3D/AR View: Swing Chair</h2>
                  <p className="tables-3d-modal-desc">Interact with the model below. Use your mouse or touch to rotate, zoom, or view in AR on supported devices.</p>
                  <model-viewer
                    src={selectedChair.model || "/3dmodels3/swingchair_sample.glb"}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    auto-rotate
                    className="tables-3d-modal-viewer"
                  ></model-viewer>
                  <button
                    onClick={() => setShow3D(false)}
                    className="tables-3d-modal-btn"
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

export default SwingChairs;
