import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar" style={{ position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
        .navbar .logo {
          font-family: 'Pacifico', cursive;
          font-weight: 700;
          font-size: 2.2rem;
          letter-spacing: 2px;
          color: #b86b2a;
          text-shadow: 0 2px 8px #e2954722;
        }
        .navbar .nav-links li {
          font-family: 'Poppins', 'Segoe UI', 'Arial', sans-serif;
          font-size: 1.13rem;
          font-weight: 600;
          letter-spacing: 1px;
          color: #b8a074;
          transition: color 0.2s, transform 0.2s;
        }
        .navbar .nav-links li:hover {
          color: #7c5a36;
          transform: scale(1.08);
        }
        .navbar .nav-btn {
          font-family: 'Pacifico', cursive;
          font-weight: 700;
          font-size: 1.08rem;
          letter-spacing: 1px;
        }
      `}</style>
      <div className="logo-container" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <span className="logo-icon">🏡</span>
        <h1 className="logo">Romify</h1>
      </div>

      <ul className="nav-links">
        <li onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Decor
        </li>
        <li onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          Login
        </li>
        <li onClick={() => navigate("/items")} style={{ cursor: "pointer" }}>
          Product
        </li>
        <li onClick={() => navigate("/contact")} style={{ cursor: "pointer" }}>
          Contact
        </li>
      </ul>

      <button className="nav-btn" onClick={() => navigate("/items")}>Shop Now</button>
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        <CartIcon />
      </div>
    </nav>
  );
}

export default Navbar;
