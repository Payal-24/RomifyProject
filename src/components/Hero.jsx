import "./Hero.css";

import { useState } from "react";

function Hero() {
  const [showModal, setShowModal] = useState(false);
  const handleReadMore = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <section className="hero">
        <img src="/assets/outerimage.png" alt="Modern living room" className="hero-image" />
      </section>

      <section className="hero-content">
        <div className="content-container">
          <style>{`
            @keyframes float {
              0% { transform: translateY(0); }
              50% { transform: translateY(-12px); }
              100% { transform: translateY(0); }
            }
          `}</style>
          <h1 style={{
            fontFamily: "'Playfair Display', 'Montserrat', serif",
            fontWeight: 700,
            fontSize: "2.7rem",
            color: "#b86b2a",
            letterSpacing: "1.5px",
            marginBottom: "10px",
            textShadow: "0 2px 8px #e2954722",
            fontStyle: "italic",
            animation: "float 2.2s ease-in-out infinite"
          }}>Home Design & Decorating</h1>
          <p style={{
            fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
            fontSize: "1.18rem",
            color: "#7c5a36",
            fontWeight: 400,
            letterSpacing: "0.7px",
            lineHeight: "1.7",
            marginBottom: "8px",
            fontStyle: "italic"
          }}>
            From decorating the kitchen to DIYing a firepit, our design inspiration and expert tips to home design and decorating can help you make your best home.
          </p>
        </div>
      </section>

      <section className="featured-content">
        <div className="featured-container">
          <div className="featured-image">
            <img src="/assets/innerpic.png" alt="Featured design" />
          </div>
          <div className="featured-text">
            <span className="featured-category">OUTDOOR ROOMS</span>
            <h2>45 Outdoor Living Rooms That Don't Skimp on Style</h2>
            <p>
              Transform your outdoor space into a stunning retreat with stunning design ideas and inspiration.
            </p>
            <button className="read-more-btn" onClick={handleReadMore}>Read More →</button>
          </div>
        </div>
      </section>


      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.35)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "fadeIn 0.5s"
        }}>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 8px 32px #e29547aa",
            padding: 32,
            maxWidth: 420,
            width: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative"
          }}>
            <button onClick={closeModal} style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              fontSize: 26,
              color: "#b86b2a",
              cursor: "pointer",
              fontWeight: 900
            }} aria-label="Close">×</button>
            <img src="/assets/arview.png" alt="Astronaut AR Model" style={{ width: 120, height: 80, borderRadius: 12, objectFit: "cover", marginBottom: 18 }} />
            <h2 style={{
              color: "#b86b2a",
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 10,
              textAlign: "center",
              fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
              letterSpacing: "1.2px",
              textTransform: "uppercase"
            }}>AR View Model</h2>
            <p style={{
              color: "#7c5a36",
              fontSize: 16,
              marginBottom: 10,
              textAlign: "center",
              fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
              letterSpacing: "0.7px",
              fontWeight: 500
            }}>
              See your favorite furniture in your own room using <span style={{fontWeight:700, color:'#b86b2a'}}>AR (Augmented Reality)</span>!<br />
              Tap <span style={{fontWeight:700, color:'#b86b2a'}}>&quot;View in AR&quot;</span> to preview the product live before you buy.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
