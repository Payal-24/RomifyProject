import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Tables.css";
import { useNavigate } from "react-router-dom";

const vaseOptions = [
  {
    name: "Bud Vase",
    image: "/items/bud_vase.jpg",
    price: "₹499",
    gallery: [
      "/items/bud_vase.jpg",
      "/items/bud_vase2.jpg",
      "/items/bud_vase3.jpg"
    ],
    details: [
      { label: "Material", value: "Ceramic" },
      { label: "Height", value: "18 cm" },
      { label: "Finish", value: "Glossy" },
      { label: "Color", value: "White" },
      { label: "Feature", value: "Handcrafted" },
    ],
    model: "/3dmodels1/bud_vase.glb"
  },
  {
    name: "Cylinder Vase",
    image: "/items/cylinder_vase.jpg",
    price: "₹599",
    gallery: [
      "/items/cylinder_vase.jpg",
      "/items/cylinder_vase2.jpg",
      "/items/cylinder_vase3.jpg"
    ],
    details: [
      { label: "Material", value: "Ceramic" },
      { label: "Height", value: "25 cm" },
      { label: "Finish", value: "Matte" },
      { label: "Color", value: "Blue" },
      { label: "Feature", value: "Minimalist Design" },
    ],
    model: "/3dmodels1/cylinder_vase.glb"
  },
  {
    name: "Urn Vase",
    image: "/items/urn_vase.jpg",
    price: "₹699",
    gallery: [
      "/items/urn_vase.jpg",
      "/items/urn_vase2.jpg",
      "/items/urn_vase3.jpg"
    ],
    details: [
      { label: "Material", value: "Ceramic" },
      { label: "Height", value: "22 cm" },
      { label: "Finish", value: "Textured" },
      { label: "Color", value: "Green" },
      { label: "Feature", value: "Classic Shape" },
    ],
    model: "/3dmodels1/urn_vase.glb"
  },
  {
    name: "Goblet Vase",
    image: "/items/goblet_vase.jpg",
    price: "₹799",
    gallery: [
      "/items/goblet_vase.jpg",
      "/items/goblet_vase2.jpg",
      "/items/goblet_vase3.jpg"
    ],
    details: [
      { label: "Material", value: "Ceramic" },
      { label: "Height", value: "20 cm" },
      { label: "Finish", value: "Glossy" },
      { label: "Color", value: "Pink" },
      { label: "Feature", value: "Elegant Stem" },
    ],
    model: "/3dmodels1/goblet_vase.glb"
  },
];

function CeramicVases() {
    const { dispatch } = useCart();
  const [favorite, setFavorite] = useState({});
  const [selectedVase, setSelectedVase] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [show3D, setShow3D] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="tables-page">
      <button className="back-btn" onClick={() => navigate("/items")}>← Back</button>
      <div className="tables-container">
        <div className="tables-list-row">
          {vaseOptions.slice(0, 2).map((vase, idx) => (
            <div key={idx} className="table-card">
              <button onClick={() => setFavorite(f => ({ ...f, [idx]: !f[idx] }))} className={`fav-btn${favorite[idx] ? " fav" : ""}`} title="Add to Favorites">
                {favorite[idx] ? "♥" : "♡"}
              </button>
              <img src={vase.image} alt={vase.name} />
              <h3>{vase.name}</h3>
              <p>{vase.price}</p>
              <button className="buy-btn" onClick={() => { setSelectedVase(vase); setQuantity(1); }}>Buy Now</button>
            </div>
          ))}
        </div>
        <div className="tables-list-row">
          {vaseOptions.slice(2, 4).map((vase, idx) => (
            <div key={idx + 2} className="table-card">
              <button onClick={() => setFavorite(f => ({ ...f, [idx + 2]: !f[idx + 2] }))} className={`fav-btn${favorite[idx + 2] ? " fav" : ""}`} title="Add to Favorites">
                {favorite[idx + 2] ? "♥" : "♡"}
              </button>
              <img src={vase.image} alt={vase.name} />
              <h3>{vase.name}</h3>
              <p>{vase.price}</p>
              <button className="buy-btn" onClick={() => { setSelectedVase(vase); setQuantity(1); }}>Buy Now</button>
            </div>
          ))}
        </div>
      </div>
      {selectedVase && (
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
              {selectedVase.gallery.map((imgSrc, i) => (
                <img
                  key={i}
                  src={imgSrc}
                  alt={`${selectedVase.name} ${i+1}`}
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
                />
              ))}
            </div>
            <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#b86b2a', fontSize: '1.5rem', letterSpacing: 1}}>{selectedVase.name}</h2>
            <p style={{marginBottom: 12, fontWeight: 600, fontSize: "1.2rem", color: '#7c5a36'}}>MRP {selectedVase.price} <span style={{fontSize: '0.95rem', color: '#888'}}>(incl. tax)</span></p>
            <div style={{marginBottom: 18, color: '#555', fontSize: '1.05rem', textAlign: 'left', background: '#fff7e6', borderRadius: 12, padding: '18px 22px', boxShadow: '0 2px 8px #f7ede2'}}>
              <div style={{marginBottom: 8}}><strong style={{color:'#b86b2a'}}>Product details</strong></div>
              <ul style={{paddingLeft: 18, marginBottom: 10}}>
                {selectedVase.details.map((d, i) => (
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
                onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product: selectedVase, quantity } })}
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
              >3D View</button>
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
              >View in My Room</button>
            </div>
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
                onClick={() => { setSelectedVase(null); setQuantity(1); setShow3D(false); setShowAR(false); }}
                title="Close"
              >&#10005;</span>
            </div>
            {/* 3D Model Viewer Modal */}
            {show3D && selectedVase && (
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
                  <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#b86b2a', fontSize: '2rem', letterSpacing: 1}}>3D/AR View: Vase</h2>
                  <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem'}}>Interact with the model below. Use your mouse or touch to rotate, zoom, or view in AR on supported devices.</p>
                  <model-viewer
                    src={selectedVase.model}
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
            {showAR && selectedVase && (
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
                  <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem', textAlign: 'center'}}>Scan the QR code below or tap the button to view this vase in your room using Augmented Reality (AR) on your mobile device.</p>
                  <model-viewer
                    src={selectedVase.model}
                    ar
                    ar-modes="scene-viewer quick-look"
                    camera-controls
                    style={{ width: '320px', height: '320px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px #4caf50aa' }}
                    ios-src={selectedVase.model}
                  ></model-viewer>
                  <a
                    href={selectedVase.model}
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
  );
}

export default CeramicVases;
