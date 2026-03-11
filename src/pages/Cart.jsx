import React from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const total = cart.items.reduce((sum, item) => {
    const price = parseInt(item.product.price.replace(/[^0-9]/g, ""), 10) || 0;
    return sum + price * item.quantity;
  }, 0);
  // Dotted pattern background
  return (
    <>
      <Navbar />
      {/* Dotted pattern background */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        background: "#fff7e6",
        backgroundImage: `radial-gradient(circle, #e29547 1.5px, transparent 1.5px), radial-gradient(circle, #b86b2a 1.5px, transparent 1.5px)`,
        backgroundSize: "28px 28px",
        backgroundPosition: "0 0, 14px 14px"
      }} />
      <section style={{ minHeight: "100vh", padding: "0 0 64px 0", position: "relative" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ textAlign: "center", padding: "48px 0 24px 0" }}>
            <h1 style={{ color: "#b86b2a", fontSize: 42, fontWeight: 900, marginBottom: 8, fontFamily: 'Playfair Display,serif', letterSpacing: 1 }}>Your Shopping Cart</h1>
            <p style={{ color: "#7c5a36", fontSize: 20, fontWeight: 500, marginBottom: 0, letterSpacing: 0.5 }}>Review your picks and checkout with a smile!</p>
            <div style={{ marginTop: 18, fontSize: 18, color: '#e29547', fontWeight: 700, fontStyle: 'italic', letterSpacing: 0.5 }}>
              "A beautiful home starts with a happy cart!"
            </div>
          </div>
          {cart.items.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <div style={{
                width: 180,
                height: 180,
                margin: "0 auto 18px auto",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#ffe0b2 60%,#e29547 100%)",
                boxShadow: "0 8px 32px #e29547aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 64,
                color: "#b86b2a",
                opacity: 0.8
              }}>🛒</div>
              <h2 style={{ color: "#b86b2a", fontWeight: 700, fontSize: 26, marginBottom: 8 }}>Your cart is empty!</h2>
              <p style={{ color: "#888", fontSize: 17, marginBottom: 18 }}>Add some beautiful items to make your home shine.</p>
              <button
                style={{ padding: "14px 36px", background: "linear-gradient(135deg,#e29547 60%,#b86b2a 100%)", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 19, border: "none", boxShadow: "0 2px 12px #e29547aa", transition: "background 0.22s", letterSpacing: 0.5, cursor: "pointer" }}
                onClick={() => navigate('/items')}
              >Shop Now</button>
            </div>
          ) : (
            <>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 32 }}>
                {cart.items.map((item, idx) => (
                  <li key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                    background: "rgba(255,255,255,0.7)",
                    borderRadius: 22,
                    boxShadow: "0 8px 32px #e29547aa",
                    padding: "32px 24px",
                    border: "2.5px solid #e29547",
                    position: "relative",
                    transition: "box-shadow 0.22s, transform 0.22s",
                    backdropFilter: "blur(8px)",
                    cursor: "pointer"
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 12px 40px #e29547cc';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px #e29547aa';
                  }}
                  >
                    <img src={item.product.image} alt={item.product.name} className="cart-item-img" style={{ width: 90, height: 90, borderRadius: 18, objectFit: "cover", border: "2.5px solid #e29547", boxShadow: "0 2px 12px #e29547aa" }} />
                    <div style={{ flex: 1 }}>
                      <div className="cart-item-title" style={{ fontWeight: 900, fontSize: 24, color: "#b86b2a", marginBottom: 6, letterSpacing: 0.5 }}>{item.product.name}</div>
                      <div className="cart-item-quantity" style={{ color: "#b86b2a", fontSize: 17, marginBottom: 4 }}>Qty: {item.quantity}</div>
                      <div style={{ color: "#7c5a36", fontWeight: 800, fontSize: 19, marginBottom: 4 }}>Price: {item.product.price}</div>
                      {item.product.details && (
                        <ul style={{ fontSize: 14, color: "#555", margin: "10px 0 0 0", paddingLeft: 18 }}>
                          {item.product.details.map((d, i) => (
                            <li key={i}><strong>{d.label}:</strong> {d.value}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button
                      className="cart-buy-btn"
                      style={{
                        padding: "14px 32px",
                        borderRadius: 12,
                        background: "linear-gradient(135deg,#e29547 60%,#b86b2a 100%)",
                        color: "#fff",
                        border: "none",
                        fontWeight: 900,
                        fontSize: "1.15rem",
                        boxShadow: "0 2px 12px #f7ede2",
                        cursor: "pointer",
                        transition: "background 0.22s, transform 0.22s",
                        letterSpacing: 0.5
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.background = '#b86b2a';
                        e.currentTarget.style.transform = 'scale(1.07)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg,#e29547 60%,#b86b2a 100%)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onClick={() => {
                        window.alert(`Buying ${item.product.name} for ${item.product.price}`);
                      }}
                    >Buy Now</button>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 56, textAlign: "center", background: "rgba(255,247,230,0.85)", borderRadius: 20, boxShadow: "0 2px 16px #e29547aa", padding: "40px 0", border: "2.5px solid #e29547", backdropFilter: "blur(6px)" }}>
                <h2 style={{ color: "#b86b2a", fontWeight: 900, fontSize: 32, marginBottom: 12, letterSpacing: 1 }}>Cart Total</h2>
                <div style={{ color: "#7c5a36", fontWeight: 900, fontSize: 26, marginBottom: 22 }}>₹{total}</div>
                <button style={{ padding: "16px 44px", borderRadius: 14, background: "linear-gradient(135deg,#b86b2a 60%,#e29547 100%)", color: "#fff", border: "none", fontWeight: 900, fontSize: "1.25rem", boxShadow: "0 2px 16px #f7ede2", cursor: "pointer", transition: "background 0.22s, transform 0.22s", letterSpacing: 0.5 }} onMouseOver={e => { e.currentTarget.style.background = '#e29547'; e.currentTarget.style.transform = 'scale(1.07)'; }} onMouseOut={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#b86b2a 60%,#e29547 100%)'; e.currentTarget.style.transform = 'scale(1)'; }}>Checkout</button>
              </div>
            </>
          )}
        </div>
      </section>
      {/* Add keyframes for animation in a style tag */}
      <style>{`
        @keyframes bgMove {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(30deg); }
        }
      `}</style>
    </>
  );
}
