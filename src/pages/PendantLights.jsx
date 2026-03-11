import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Mirrors.css";

const pendantLightOptions = [
  {
    name: "Cone Pendant Light",
    image: "/assets/Cone Pendant Light1.png",
    price: "₹3,499",
    gallery: [
      "/assets/Cone Pendant Light1.png",
      "/assets/Cone Pendant Light2.png",
      "/assets/Cone Pendant Light3.png"
    ],
    details: [
      { label: "Type", value: "Cone" },
      { label: "Material", value: "Metal" },
      { label: "Feature", value: "Focused Lighting" },
    ],
  },
  {
    name: "Dome Pendant Light",
    image: "/assets/Dome Pendant Light1.png",
    price: "₹3,999",
    gallery: [
      "/assets/Dome Pendant Light1.png",
      "/assets/Dome Pendant Light2.png",
      "/assets/Dome Pendant Light3.png"
    ],
    details: [
      { label: "Type", value: "Dome" },
      { label: "Material", value: "Metal" },
      { label: "Feature", value: "Wide Spread" },
    ],
  },
  {
    name: "Cylinder Pendant Light",
    image: "/assets/Cylinder Pendant Light1.png",
    price: "₹4,199",
    gallery: [
      "/assets/Cylinder Pendant Light1.png",
      "/assets/Cylinder Pendant Light2.png",
      "/assets/Cylinder Pendant Light3.png"
    ],
    details: [
      { label: "Type", value: "Cylinder" },
      { label: "Material", value: "Glass & Metal" },
      { label: "Feature", value: "Modern Look" },
    ],
  },
  {
    name: "Linear Pendant Light",
    image: "/assets/Linear Pendant Light1.png",
    price: "₹4,499",
    gallery: [
      "/assets/Linear Pendant Light1.png",
      "/assets/Linear Pendant Light2.png",
      "/assets/Linear Pendant Light3.png"
    ],
    details: [
      { label: "Type", value: "Linear" },
      { label: "Material", value: "Metal & Glass" },
      { label: "Feature", value: "Sleek Design" },
    ],
  },
];

function PendantLights() {
  const navigate = useNavigate();
  const [selectedLight, setSelectedLight] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [show3D, setShow3D] = useState(false);
  const [showAR, setShowAR] = useState(false);

  return (
    <>
      <Navbar
        onContactClick={() => navigate("/contact")}
        onHomeClick={() => navigate("/")}
        onLoginClick={() => navigate("/login")}
        onShopClick={() => navigate("/items")}
      />
      <section className="chairs-page">
        <button className="back-btn" onClick={() => navigate("/items")}>← Back</button>
        <h1 className="chairs-title">Pendant Lights Collection</h1>
        <div className="chairs-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', justifyContent: 'center' }}>
            {[0, 1].map(rowIdx => (
              <div key={rowIdx} style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
                {pendantLightOptions.slice(rowIdx * 2, rowIdx * 2 + 2).map((opt, idx) => (
                  <div
                    key={idx}
                    className="chair-card mirror-card-gradient"
                    style={{
                      width: 180,
                      minHeight: 260,
                      padding: '16px 10px',
                      borderRadius: 16,
                      boxShadow: '0 2px 10px #e2954722',
                      background: '#fff7e6',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      transition: 'background 0.3s, box-shadow 0.3s'
                    }}
                  >
                    <img
                      src={opt.image}
                      alt={opt.name}
                      style={{
                        width: 130,
                        height: 130,
                        borderRadius: 16,
                        objectFit: 'contain',
                        background: '#fff',
                        marginBottom: 12,
                        boxShadow: '0 2px 10px #e2954722',
                        padding: 8,
                        display: 'block'
                      }}
                    />
                    <h3 style={{ fontSize: '1.05rem', margin: '8px 0', color: '#b86b2a', fontWeight: 600 }}>{opt.name}</h3>
                    <button className="buy-btn" style={{ fontSize: '0.95rem', padding: '7px 18px', borderRadius: 8 }} onClick={() => { setSelectedLight(opt); setQuantity(1); }}>Buy Now</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Pendant Light Details Modal */}
        {selectedLight && (
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
                {selectedLight.gallery.map((imgSrc, i) => (
                  <img
                    key={i}
                    src={imgSrc}
                    alt={`${selectedLight.name} ${i+1}`}
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
              <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#b86b2a', fontSize: '1.5rem', letterSpacing: 1}}>{selectedLight.name}</h2>
              <p style={{marginBottom: 12, fontWeight: 600, fontSize: "1.2rem", color: '#7c5a36'}}>MRP {selectedLight.price} <span style={{fontSize: '0.95rem', color: '#888'}}>(incl. tax)</span></p>
              <div style={{marginBottom: 18, color: '#555', fontSize: '1.05rem', textAlign: 'left', background: '#fff7e6', borderRadius: 12, padding: '18px 22px', boxShadow: '0 2px 8px #f7ede2'}}>
                <div style={{marginBottom: 8}}><strong style={{color:'#b86b2a'}}>Product details</strong></div>
                <ul style={{paddingLeft: 18, marginBottom: 10}}>
                  {selectedLight.details.map((d, i) => (
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
                  onClick={() => setShowAR(true)}
                >View in Your Room</button>
              </div>
              {/* 3D Model Viewer Modal */}
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
                    <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem', textAlign: 'center'}}>Scan the QR code below or tap the button to view this pendant light in your room using Augmented Reality (AR) on your mobile device.</p>
                    <model-viewer
                      src={selectedLight?.model}
                      ar
                      ar-modes="scene-viewer quick-look"
                      camera-controls
                      style={{ width: '320px', height: '320px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px #4caf50aa' }}
                      ios-src={selectedLight?.model}
                    ></model-viewer>
                    <a
                      href={selectedLight?.model}
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
                    <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#b86b2a', fontSize: '2rem', letterSpacing: 1}}>3D/AR View: Pendant Light</h2>
                    <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem'}}>Interact with the model below. Use your mouse or touch to rotate, zoom, or view in AR on supported devices.</p>
                    <model-viewer
                      src={selectedLight.model || "/3dmodels_pendant/pendant_sample.glb"}
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
              <span
                onClick={() => { setSelectedLight(null); setPreviewImg(null); setShow3D(false); setShowAR(false); }}
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
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default PendantLights;
