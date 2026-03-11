import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartIcon() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const totalQty = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="navbar-carticon">
      <button className="carticon-btn" onClick={() => navigate("/cart")} title="View Cart">
        <span className="carticon-icon">🛒</span>
        {totalQty > 0 && (
          <span className="carticon-badge">{totalQty}</span>
        )}
      </button>
    </div>
  );
}
