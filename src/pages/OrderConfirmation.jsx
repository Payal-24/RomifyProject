import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./OrderConfirmation.css";

const paymentMethodLabel = (method) => {
  if (method === "upi") return "UPI";
  if (method === "card") return "Card";
  return "Cash On Delivery";
};

function formatAddress(address = {}) {
  return [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.pincode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;
  const mailSent = location.state?.mailSent;
  const mailMessage = location.state?.mailMessage;

  if (!order) {
    return (
      <>
        <Navbar />
        <section className="order-confirm-page">
          <div className="order-confirm-wrap">
            <h1>Order Confirmation</h1>
            <p>No recent order found.</p>
            <button className="confirm-btn" onClick={() => navigate("/items")}>Go to Shop</button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="order-confirm-page">
        <div className="order-confirm-wrap">
          <header className="confirm-hero">
            <div className="confirm-icon">✓</div>
            <h1>Order Placed Successfully</h1>
            <p>Thanks, {order.customerName}. Your order is confirmed.</p>
          </header>

          <div className={`mail-status ${mailSent ? "success" : "warn"}`}>
            <strong>{mailSent ? "Email Sent:" : "Email Update:"}</strong>
            <span>
              {mailSent
                ? `Confirmation email has been sent to ${order.customerEmail}.`
                : mailMessage || "Email could not be sent right now."}
            </span>
          </div>

          <div className="confirm-grid">
            <div className="confirm-card">
              <h2>Order Details</h2>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Expected Delivery:</strong> {new Date(order.expectedDeliveryDate).toDateString()}</p>
              <p><strong>Total Amount:</strong> Rs {Number(order.totalAmount).toLocaleString("en-IN")}</p>
            </div>

            <div className="confirm-card">
              <h2>Payment Details</h2>
              <p><strong>Method:</strong> {paymentMethodLabel(order.paymentDetails?.method)}</p>
              <p><strong>Status:</strong> {order.paymentDetails?.status || "Pending"}</p>
              {order.paymentDetails?.upiId && <p><strong>UPI:</strong> {order.paymentDetails.upiId}</p>}
              {order.paymentDetails?.cardLast4 && <p><strong>Card:</strong> **** **** **** {order.paymentDetails.cardLast4}</p>}
            </div>

            <div className="confirm-card full">
              <h2>Shipping Details</h2>
              <p><strong>Name:</strong> {order.customerName}</p>
              <p><strong>Email:</strong> {order.customerEmail}</p>
              <p><strong>Phone:</strong> {order.customerPhone}</p>
              <p><strong>Address:</strong> {formatAddress(order.shippingAddress)}</p>
            </div>
          </div>

          <div className="confirm-card full">
            <h2>Items</h2>
            <ul className="item-list">
              {order.items.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <span>{item.name} x {item.quantity}</span>
                  <strong>Rs {(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString("en-IN")}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="confirm-actions">
            <button className="confirm-btn" onClick={() => navigate("/items")}>Continue Shopping</button>
            <button className="confirm-btn secondary" onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      </section>
    </>
  );
}
