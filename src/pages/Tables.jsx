import React, { useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Tables.css";

function Tables() {
      const [error, setError] = useState(null);
    const { dispatch } = useCart();
  const navigate = useNavigate();
  // Navbar handlers
  const handleContactClick = () => navigate("/contact");
  const handleHomeClick = () => navigate("/");
  const handleLoginClick = () => navigate("/login");
  const handleShopClick = () => navigate("/items");
  const [favorite, setFavorite] = useState({});
  const [selectedTable, setSelectedTable] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [previewImg, setPreviewImg] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const tables = [
    {
      name: "Dining Table",
      image: "/assets/Dining Table1.png",
      price: "₹3500",
      model: "/3dmodels2/table_sample.glb",
      gallery: [
        "/assets/Dining Table1.png",
        "/assets/Dining Table2.png",
        "/assets/Dining Table3.png"
      ],
      details: [
        { label: "Material", value: "Sheesham Wood" },
        { label: "Seating", value: "6 Seater" },
        { label: "Finish", value: "Walnut" },
        { label: "Dimensions", value: "180L x 90W x 75H cm" },
        { label: "Special Feature", value: "Scratch Resistant" },
      ],
    },
    {
      name: "Coffee Table",
      image: "/assets/coffee table1.png",
      price: "₹2200",
      model: "/3dmodels2/table_sample.glb",
      gallery: [
        "/assets/coffee table1.png",
        "/assets/coffee table2.png",
        "/assets/coffee table3.png"
      ],
      details: [
        { label: "Material", value: "Engineered Wood" },
        { label: "Shape", value: "Rectangular" },
        { label: "Finish", value: "Matte" },
        { label: "Dimensions", value: "100L x 50W x 40H cm" },
        { label: "Special Feature", value: "Storage Shelf" },
      ],
    },
    {
      name: "Study Table",
      image: "/assets/Study Table1.png",
      price: "₹2800",
      model: "/3dmodels/table_sample.glb",
      gallery: [
        "/assets/Study Table1.png",
        "/assets/Study Table2.png",
        "/assets/Study Table3.png"
      ],
      details: [
        { label: "Material", value: "Solid Wood" },
        { label: "Drawers", value: "2" },
        { label: "Finish", value: "Natural" },
        { label: "Dimensions", value: "120L x 60W x 75H cm" },
        { label: "Special Feature", value: "Cable Management" },
      ],
    },
    {
      name: "Bedside Table",
      image: "/assets/Bedside Table1.png",
      price: "₹1500",
      model: "/3dmodels2/table_sample.glb",
      gallery: [
        "/assets/Bedside Table1.png",
        "/assets/Bedside Table2.png",
        "/assets/Bedside Table3.png"
      ],
      details: [
        { label: "Material", value: "MDF" },
        { label: "Drawers", value: "1" },
        { label: "Finish", value: "White" },
        { label: "Dimensions", value: "45L x 40W x 50H cm" },
        { label: "Special Feature", value: "Compact Design" },
      ],
    },
    {
      name: "Office Table",
      image: "/assets/Office Table1.png",
      price: "₹4000",
      model: "/3dmodels2/table_sample.glb",
      gallery: [
        "/assets/Office Table1.png",
        "/assets/Office Table2.png",
        "/assets/Office Table3.png"
      ],
      details: [
        { label: "Material", value: "Engineered Wood" },
        { label: "Drawers", value: "3" },
        { label: "Finish", value: "Teak" },
        { label: "Dimensions", value: "150L x 70W x 75H cm" },
        { label: "Special Feature", value: "Spacious Top" },
      ],
    },
    {
      name: "Console Table",
      image: "/assets/Console Table1.png",
      price: "₹3200",
      model: "/3dmodels2/table_sample.glb",
      gallery: [
        "/assets/Console Table1.png",
        "/assets/Console Table2.png",
        "/assets/Console Table3.png"
      ],
      details: [
        { label: "Material", value: "Sheesham Wood" },
        { label: "Finish", value: "Mahogany" },
        { label: "Dimensions", value: "110L x 35W x 80H cm" },
        { label: "Special Feature", value: "Slim Profile" },
      ],
    },
  ];

  return (
    <ErrorBoundary>
    <>
      {error && (
        <div style={{color: 'red', background: '#fff7e6', padding: 24, borderRadius: 12, margin: 24, textAlign: 'center'}}>
          <h2>Something went wrong</h2>
          <div>{error.toString()}</div>
        </div>
      )}
      <Navbar
        onContactClick={handleContactClick}
        onHomeClick={handleHomeClick}
        onLoginClick={handleLoginClick}
        onShopClick={handleShopClick}
      />
      <section className="tables-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1 className="tables-title">Tables Collection</h1>
      <div className="tables-container">
        <div className="tables-list-row">
          {tables.slice(0, 3).map((table, idx) => (
            <div key={idx} className="table-card">
              <button onClick={() => setFavorite(f => ({ ...f, [idx]: !f[idx] }))} className={`fav-btn${favorite[idx] ? " fav" : ""}`} title="Add to Favorites">
                {favorite[idx] ? "♥" : "♡"}
              </button>
              <img
                src={table.image}
                alt={table.name}
                style={
                  table.name === "Study Table"
                    ? { objectFit: "contain", width: "160px", height: "160px", background: "#fff" }
                    : {}
                }
              />
              <h3>{table.name}</h3>
              <p>{table.price}</p>
              <button className="buy-btn" onClick={() => { setSelectedTable(table); setQuantity(1); }}>Buy Now</button>
            </div>
          ))}
        </div>
        <div className="tables-list-row">
          {tables.slice(3, 6).map((table, idx) => (
            <div key={idx + 3} className="table-card">
              <button onClick={() => setFavorite(f => ({ ...f, [idx + 3]: !f[idx + 3] }))} className={`fav-btn${favorite[idx + 3] ? " fav" : ""}`} title="Add to Favorites">
                {favorite[idx + 3] ? "♥" : "♡"}
              </button>
              <img src={table.image} alt={table.name} />
              <h3>{table.name}</h3>
              <p>{table.price}</p>
              <button className="buy-btn" onClick={() => {
                if (table) {
                  setSelectedTable(table);
                  setQuantity(1);
                }
              }}>Buy Now</button>
            </div>
          ))}
        </div>
      </div>
      {/* Table Details Modal */}
      {selectedTable && (
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
              {(() => {
                try {
                  if (!selectedTable.gallery || !Array.isArray(selectedTable.gallery)) {
                    throw new Error("Gallery images missing or not an array.");
                  }
                  return selectedTable.gallery.map((imgSrc, i) => (
                    <img
                      key={i}
                      src={imgSrc}
                      alt={`${selectedTable.name} ${i+1}`}
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
                  ));
                } catch (err) {
                  return (
                    <div style={{color: 'red', margin: 24, fontWeight: 600}}>
                      Error loading images: {err.message || err.toString()}
                    </div>
                  );
                }
              })()}
            </div>
            {error && (
              <div style={{color: 'red', margin: 24, fontWeight: 600}}>
                Error: {error.message || error.toString()}
              </div>
            )}
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
            <h2 style={{marginBottom: 10, fontFamily: "'Playfair Display', serif", color: '#b86b2a', fontSize: '1.5rem', letterSpacing: 1}}>{selectedTable.name}</h2>
            <p style={{marginBottom: 12, fontWeight: 600, fontSize: "1.2rem", color: '#7c5a36'}}>MRP {selectedTable.price} <span style={{fontSize: '0.95rem', color: '#888'}}>(incl. tax)</span></p>
            <div style={{marginBottom: 18, color: '#555', fontSize: '1.05rem', textAlign: 'left', background: '#fff7e6', borderRadius: 12, padding: '18px 22px', boxShadow: '0 2px 8px #f7ede2'}}>
              <div style={{marginBottom: 8}}><strong style={{color:'#b86b2a'}}>Product details</strong></div>
              <ul style={{paddingLeft: 18, marginBottom: 10}}>
                {selectedTable.details.map((d, i) => (
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
                  dispatch({ type: 'ADD_TO_CART', payload: { product: selectedTable, quantity } });
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
              onClick={() => { setSelectedTable(null); setPreviewImg(null); setShow3D(false); }}
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
                  <p style={{marginBottom: 18, color: '#7c5a36', fontWeight: 500, fontSize: '1.1rem', textAlign: 'center'}}>Scan the QR code below or tap the button to view this table in your room using Augmented Reality (AR) on your mobile device.</p>
                  <model-viewer
                    src={selectedTable?.model || "/3dmodels2/table_sample.glb"}
                    ar
                    ar-modes="scene-viewer quick-look"
                    camera-controls
                    style={{ width: '320px', height: '320px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px #4caf50aa' }}
                    ios-src={selectedTable?.model || "/3dmodels2/table_sample.glb"}
                  ></model-viewer>
                  <a
                    href={selectedTable?.model || "/3dmodels2/table_sample.glb"}
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
                  <h2 className="tables-3d-modal-title">3D/AR View: Table</h2>
                  <p className="tables-3d-modal-desc">Interact with the model below. Use your mouse or touch to rotate, zoom, or view in AR on supported devices.</p>
                  <model-viewer
                    src={selectedTable.model || "/3dmodels2/table_sample.glb"}
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
    </ErrorBoundary>
  );
}

export default Tables;
