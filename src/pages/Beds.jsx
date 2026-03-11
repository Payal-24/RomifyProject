
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Beds() {
    const { dispatch } = useCart();
  const navigate = useNavigate();
  // Navbar handlers
  const handleContactClick = () => navigate("/contact");
  const handleHomeClick = () => navigate("/");
  const handleLoginClick = () => navigate("/login");
  const handleShopClick = () => navigate("/items");
  const [favorite, setFavorite] = useState({});
  const [selectedBed, setSelectedBed] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [previewImg, setPreviewImg] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const beds = [
    {
      name: "King Size Bed",
      image: "/assets/King Size Bed1.png",
      price: "₹15,000",
      gallery: [
        "/assets/King Size Bed1.png",
        "/assets/King Size Bed2.png",
        "/assets/King Size Bed3.png"
      ],
      details: [
        { label: "Material", value: "Sheesham Wood" },
        { label: "Size", value: "King" },
        { label: "Finish", value: "Walnut" },
        { label: "Dimensions", value: "200L x 180W x 90H cm" },
        { label: "Special Feature", value: "Storage Drawers" },
      ],
    },
    {
      name: "Queen Size Bed",
      image: "/assets/Queen Size Bed1.png",
      price: "₹12,000",
      gallery: [
        "/assets/Queen Size Bed1.png",
        "/assets/Queen Size Bed2.png",
        "/assets/Queen Size Bed3.png"
      ],
      details: [
        { label: "Material", value: "Engineered Wood" },
        { label: "Size", value: "Queen" },
        { label: "Finish", value: "Teak" },
        { label: "Dimensions", value: "190L x 160W x 85H cm" },
        { label: "Special Feature", value: "Hydraulic Storage" },
      ],
    },
    {
      name: "Single Bed",
      image: "/assets/Single Bed1.png",
      price: "₹7,500",
      gallery: [
        "/assets/Single Bed1.png",
        "/assets/Single Bed2.png",
        "/assets/Single Bed3.png"
      ],
      details: [
        { label: "Material", value: "MDF" },
        { label: "Size", value: "Single" },
        { label: "Finish", value: "White" },
        { label: "Dimensions", value: "190L x 90W x 80H cm" },
        { label: "Special Feature", value: "Compact Design" },
      ],
    },
    {
      name: "Double Bed",
      image: "/assets/Double Bed1.png",
      price: "₹10,000",
      gallery: [
        "/assets/Double Bed1.png",
        "/assets/Double Bed2.png",
        "/assets/Double Bed3.png"
      ],
      details: [
        { label: "Material", value: "Solid Wood" },
        { label: "Size", value: "Double" },
        { label: "Finish", value: "Natural" },
        { label: "Dimensions", value: "195L x 140W x 85H cm" },
        { label: "Special Feature", value: "Headboard Storage" },
      ],
    },
    {
      name: "Kids Bed",
      image: "/assets/Kid Bed1.png",
      price: "₹6,000",
      gallery: [
        "/assets/Kid Bed1.png",
        "/assets/Kid Bed2.png",
        "/assets/Kid Bed3.png"
      ],
      details: [
        { label: "Material", value: "Engineered Wood" },
        { label: "Size", value: "Kids" },
        { label: "Finish", value: "Colorful" },
        { label: "Dimensions", value: "160L x 80W x 70H cm" },
        { label: "Special Feature", value: "Safety Rails" },
      ],
    },
    {
      name: "Sofa Cum Bed",
      image: "/assets/Sofa Cum Bed1.png",
      price: "₹13,000",
      gallery: [
        "/assets/Sofa Cum Bed1.png",
        "/assets/Sofa Cum Bed2.png",
        "/assets/Sofa Cum Bed3.png"
      ],
      details: [
        { label: "Material", value: "Fabric & Wood" },
        { label: "Size", value: "Queen" },
        { label: "Finish", value: "Grey" },
        { label: "Dimensions", value: "190L x 160W x 85H cm" },
        { label: "Special Feature", value: "Convertible" },
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
      <section className="beds-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1 className="tables-title">Beds Collection</h1>
      <div className="tables-container">
        <div className="tables-list-row">
          {beds.slice(0, 3).map((bed, idx) => (
            <div key={idx} className="table-card">
              <button onClick={() => setFavorite(f => ({ ...f, [idx]: !f[idx] }))} className={`fav-btn${favorite[idx] ? " fav" : ""}`} title="Add to Favorites">
                {favorite[idx] ? "♥" : "♡"}
              </button>
              <img
                src={bed.image}
                alt={bed.name}
                style={
                  bed.name === "Single Bed"
                    ? { objectFit: "contain", width: "160px", height: "160px", background: "#fff" }
                    : {}
                }
              />
              <h3>{bed.name}</h3>
              <p>{bed.price}</p>
              <button className="buy-btn" onClick={() => { setSelectedBed(bed); setQuantity(1); }}>Buy Now</button>
            </div>
          ))}
        </div>
        <div className="tables-list-row">
          {beds.slice(3, 6).map((bed, idx) => (
            <div key={idx + 3} className="table-card">
              <button onClick={() => setFavorite(f => ({ ...f, [idx + 3]: !f[idx + 3] }))} className={`fav-btn${favorite[idx + 3] ? " fav" : ""}`} title="Add to Favorites">
                {favorite[idx + 3] ? "♥" : "♡"}
              </button>
              <img
                src={bed.image}
                alt={bed.name}
                style={
                  bed.name === "Single Bed"
                    ? { objectFit: "contain", width: "160px", height: "160px", background: "#fff" }
                    : {}
                }
              />
              <h3>{bed.name}</h3>
              <p>{bed.price}</p>
              <button className="buy-btn" onClick={() => { setSelectedBed(bed); setQuantity(1); }}>Buy Now</button>
            </div>
          ))}
        </div>
      </div>
      {/* Bed Details Modal */}
      {selectedBed && (
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
              {selectedBed.gallery.map((imgSrc, i) => (
                <img
                  key={i}
                  src={imgSrc}
                  alt={`${selectedBed.name} ${i+1}`}
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
            <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#b86b2a', fontSize: '1.5rem', letterSpacing: 1}}>{selectedBed.name}</h2>
            <p style={{marginBottom: 12, fontWeight: 600, fontSize: "1.2rem", color: '#7c5a36'}}>MRP {selectedBed.price} <span style={{fontSize: '0.95rem', color: '#888'}}>(incl. tax)</span></p>
            <div style={{marginBottom: 18, color: '#555', fontSize: '1.05rem', textAlign: 'left', background: '#fff7e6', borderRadius: 12, padding: '18px 22px', boxShadow: '0 2px 8px #f7ede2'}}>
              <div style={{marginBottom: 8}}><strong style={{color:'#b86b2a'}}>Product details</strong></div>
              <ul style={{paddingLeft: 18, marginBottom: 10}}>
                {selectedBed.details.map((d, i) => (
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
                  dispatch({ type: 'ADD_TO_CART', payload: { product: selectedBed, quantity } });
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
              onClick={() => { setSelectedBed(null); setPreviewImg(null); setShow3D(false); }}
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
                  <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem', textAlign: 'center'}}>Scan the QR code below or tap the button to view this bed in your room using Augmented Reality (AR) on your mobile device.</p>
                  <model-viewer
                    src={selectedBed?.model}
                    ar
                    ar-modes="scene-viewer quick-look"
                    camera-controls
                    style={{ width: '320px', height: '320px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px #4caf50aa' }}
                    ios-src={selectedBed?.model}
                  ></model-viewer>
                  <a
                    href={selectedBed?.model}
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
                              <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#b86b2a', fontSize: '2rem', letterSpacing: 1}}>View in Your Room (AR)</h2>
                              <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem'}}>Scan the QR code below with your phone to view this bed in your room using AR.</p>
                              <div style={{ width: '320px', height: '320px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px #e29547aa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#b86b2a', fontWeight: 600, marginBottom: 18 }}>
                                {/* Replace with actual QR code or AR link */}
                                AR QR coming soon!
                              </div>
                              <button
                                onClick={() => setShowAR(false)}
                                style={{
                                  marginTop: 18,
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
                              >Close AR View</button>
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
                  <h2 className="tables-3d-modal-title">3D/AR View: Bed</h2>
                  <p className="tables-3d-modal-desc">Interact with the model below. Use your mouse or touch to rotate, zoom, or view in AR on supported devices.</p>
                  <model-viewer
                    src={selectedBed.model || "/3dmodels1/bed_sample.glb"}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    auto-rotate
                    className="tables-3d-modal-viewer"
                  ></model-viewer>
                  <button
                    onClick={() => setShow3D(false)}
                    className="tables-3d-modal-btn"
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
          </div>
        </div>
      )}
      </section>
    </>
  );
}

export default Beds;
