import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { calculateTotal, createOrder } from "../utils/orderUtils";
import { sendOrderConfirmationEmail } from "../utils/emailService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";
import "./Checkout.css";

const steps = ["Personal Info", "Address", "Payment"];

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { token } = useAuth();
  const { cart, dispatch } = useCart();

  const checkoutItems = useMemo(() => {
    const stateItems = location.state?.items;
    if (Array.isArray(stateItems) && stateItems.length > 0) return stateItems;
    if (cart.items.length > 0) return cart.items;
    return [];
  }, [location.state, cart.items]);

  const source = location.state?.source || "cart";

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [personal, setPersonal] = useState({
    name: location.state?.customer?.name || user?.name || "",
    phone: "",
    email: location.state?.customer?.email || user?.email || "",
  });

  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [payment, setPayment] = useState({
    method: "cod",
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const total = calculateTotal(checkoutItems);

  if (checkoutItems.length === 0) {
    return (
      <>
        <Navbar />
        <section className="checkout-page">
          <div className="checkout-wrap">
            <h1 className="checkout-title">Checkout</h1>
            <p className="checkout-empty">Your checkout is empty. Add products first.</p>
            <button className="checkout-btn primary" onClick={() => navigate("/items")}>Shop Items</button>
          </div>
        </section>
      </>
    );
  }

  const validateStep = () => {
    setError("");

    if (step === 1) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email.trim());
      const phoneOk = /^\d{10}$/.test(personal.phone.trim());
      if (!personal.name.trim()) return setError("Name is required"), false;
      if (!emailOk) return setError("Enter a valid email"), false;
      if (!phoneOk) return setError("Phone number must be 10 digits"), false;
    }

    if (step === 2) {
      if (!address.line1.trim()) return setError("Address line is required"), false;
      if (!address.city.trim()) return setError("City is required"), false;
      if (!address.state.trim()) return setError("State is required"), false;
      if (!/^\d{6}$/.test(address.pincode.trim())) return setError("Pincode must be 6 digits"), false;
    }

    if (step === 3) {
      if (payment.method === "upi" && !payment.upiId.trim()) {
        return setError("UPI ID is required"), false;
      }

      if (payment.method === "card") {
        const cleanCard = payment.cardNumber.replace(/\s/g, "");
        if (cleanCard.length < 12) return setError("Enter a valid card number"), false;
        if (!payment.cardName.trim()) return setError("Card holder name is required"), false;
        if (!/^\d{2}\/\d{2}$/.test(payment.expiry.trim())) return setError("Expiry must be MM/YY"), false;
        if (!/^\d{3,4}$/.test(payment.cvv.trim())) return setError("Invalid CVV"), false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((prev) => Math.min(3, prev + 1));
  };

  const prevStep = () => {
    setError("");
    setStep((prev) => Math.max(1, prev - 1));
  };

  const placeOrder = async () => {
    if (!validateStep()) return;

    try {
      setSubmitting(true);

      const order = createOrder(checkoutItems, {
        name: personal.name,
        email: personal.email,
        phone: personal.phone,
        address,
        payment: {
          method: payment.method,
          status: payment.method === "cod" ? "Pending on Delivery" : "Paid",
          upiId: payment.method === "upi" ? payment.upiId : undefined,
          cardLast4: payment.method === "card" ? payment.cardNumber.replace(/\s/g, "").slice(-4) : undefined,
        },
      });

      let mailSent = false;
      let mailMessage = "";

      // Ensure recipient is present; prefer order.customerEmail, then form personal.email, then user email
      const recipient = order.customerEmail || personal.email || (user && user.email) || "";
      if (!recipient) {
        mailSent = false;
        mailMessage = "Confirmation email not sent: recipient address is empty.";
      } else {
        // Ensure order has recipient set
        order.customerEmail = recipient;

        // Post order to backend so it is persisted and backend sends email
        try {
          const payload = {
            items: order.items.map((it) => ({
              productId: it.product?._id || it.product?.id || undefined,
              title: it.name,
              quantity: it.quantity,
              price: it.price,
            })),
            total: order.totalAmount,
            address: order.shippingAddress,
            paymentStatus: order.paymentDetails?.status || "pending",
            metadata: { notes: order.notes || "" },
            customerEmail: order.customerEmail,
            customerName: order.customerName,
            customerPhone: order.customerPhone,
          };

          const res = await fetch(`${API_BASE_URL}/api/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(payload),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Order API failed");
          }

          // backend returns emailResult
          const emailResult = data.emailResult || {};
          mailSent = !!emailResult.sent;
          mailMessage = emailResult.sent ? "Confirmation email sent" : `Email not sent: ${emailResult.error || "unknown"}`;
        } catch (err) {
          mailSent = false;
          mailMessage = err.message || "Order placed, but confirmation email could not be sent right now.";
        }
      }

      // Show debug alert so user sees email result without DevTools
      try {
        const debugMsg = `Email status: ${mailMessage}\nRecipient: ${recipient || "(none)"}`;
        // show short alert in browser
        // eslint-disable-next-line no-undef
        window.alert(debugMsg);
      } catch (e) {
        // ignore in non-browser environments
      }

      if (source === "buy-now") {
        checkoutItems.forEach((item) => {
          const name = item.product?.name || item.name;
          dispatch({ type: "REMOVE_FROM_CART", payload: { name } });
        });
      } else {
        dispatch({ type: "CLEAR_CART" });
      }

      navigate("/order-confirmation", {
        state: {
          order,
          mailSent,
          mailMessage,
        },
      });
    } catch (err) {
      setError(err.message || "Unable to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="checkout-page">
        <div className="checkout-wrap">
          <header className="checkout-header">
            <h1 className="checkout-title">Secure Checkout</h1>
            <p className="checkout-subtitle">Complete your order in 3 quick steps</p>
          </header>

          <div className="checkout-stepper">
            {steps.map((label, index) => {
              const indexStep = index + 1;
              const active = indexStep === step;
              const done = indexStep < step;
              return (
                <div key={label} className={`step-chip ${active ? "active" : ""} ${done ? "done" : ""}`}>
                  <span className="step-number">{done ? "✓" : indexStep}</span>
                  <span>{label}</span>
                </div>
              );
            })}
          </div>

          <div className="checkout-grid">
            <div className="checkout-form-card">
              {step === 1 && (
                <>
                  <h2>Personal Information</h2>
                  <div className="field-grid">
                    <label>
                      Full Name
                      <input
                        type="text"
                        value={personal.name}
                        onChange={(e) => setPersonal((s) => ({ ...s, name: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </label>
                    <label>
                      Phone Number
                      <input
                        type="tel"
                        value={personal.phone}
                        onChange={(e) => setPersonal((s) => ({ ...s, phone: e.target.value }))}
                        placeholder="10 digit phone number"
                      />
                    </label>
                    <label className="full-width">
                      Email Address
                      <input
                        type="email"
                        value={personal.email}
                        onChange={(e) => setPersonal((s) => ({ ...s, email: e.target.value }))}
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2>Shipping Address</h2>
                  <div className="field-grid">
                    <label className="full-width">
                      Address Line 1
                      <input
                        type="text"
                        value={address.line1}
                        onChange={(e) => setAddress((s) => ({ ...s, line1: e.target.value }))}
                        placeholder="House no, street, area"
                      />
                    </label>
                    <label className="full-width">
                      Address Line 2 (Optional)
                      <input
                        type="text"
                        value={address.line2}
                        onChange={(e) => setAddress((s) => ({ ...s, line2: e.target.value }))}
                        placeholder="Landmark, locality"
                      />
                    </label>
                    <label>
                      City
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => setAddress((s) => ({ ...s, city: e.target.value }))}
                        placeholder="City"
                      />
                    </label>
                    <label>
                      State
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) => setAddress((s) => ({ ...s, state: e.target.value }))}
                        placeholder="State"
                      />
                    </label>
                    <label>
                      Pincode
                      <input
                        type="text"
                        value={address.pincode}
                        onChange={(e) => setAddress((s) => ({ ...s, pincode: e.target.value }))}
                        placeholder="6 digit pincode"
                      />
                    </label>
                    <label>
                      Country
                      <input
                        type="text"
                        value={address.country}
                        onChange={(e) => setAddress((s) => ({ ...s, country: e.target.value }))}
                        placeholder="Country"
                      />
                    </label>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2>Payment</h2>
                  <div className="payment-methods">
                    <button
                      type="button"
                      className={`method-chip ${payment.method === "cod" ? "active" : ""}`}
                      onClick={() => setPayment((s) => ({ ...s, method: "cod" }))}
                    >
                      Cash On Delivery
                    </button>
                    <button
                      type="button"
                      className={`method-chip ${payment.method === "upi" ? "active" : ""}`}
                      onClick={() => setPayment((s) => ({ ...s, method: "upi" }))}
                    >
                      UPI
                    </button>
                    <button
                      type="button"
                      className={`method-chip ${payment.method === "card" ? "active" : ""}`}
                      onClick={() => setPayment((s) => ({ ...s, method: "card" }))}
                    >
                      Card
                    </button>
                  </div>

                  {payment.method === "upi" && (
                    <div className="field-grid">
                      <label className="full-width">
                        UPI ID
                        <input
                          type="text"
                          value={payment.upiId}
                          onChange={(e) => setPayment((s) => ({ ...s, upiId: e.target.value }))}
                          placeholder="yourname@upi"
                        />
                      </label>
                    </div>
                  )}

                  {payment.method === "card" && (
                    <div className="field-grid">
                      <label className="full-width">
                        Card Number
                        <input
                          type="text"
                          value={payment.cardNumber}
                          onChange={(e) => setPayment((s) => ({ ...s, cardNumber: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                        />
                      </label>
                      <label className="full-width">
                        Card Holder Name
                        <input
                          type="text"
                          value={payment.cardName}
                          onChange={(e) => setPayment((s) => ({ ...s, cardName: e.target.value }))}
                          placeholder="Name on card"
                        />
                      </label>
                      <label>
                        Expiry (MM/YY)
                        <input
                          type="text"
                          value={payment.expiry}
                          onChange={(e) => setPayment((s) => ({ ...s, expiry: e.target.value }))}
                          placeholder="MM/YY"
                        />
                      </label>
                      <label>
                        CVV
                        <input
                          type="password"
                          value={payment.cvv}
                          onChange={(e) => setPayment((s) => ({ ...s, cvv: e.target.value }))}
                          placeholder="CVV"
                        />
                      </label>
                    </div>
                  )}
                </>
              )}

              {error && <p className="checkout-error">{error}</p>}

              <div className="checkout-actions">
                {step > 1 && (
                  <button className="checkout-btn secondary" type="button" onClick={prevStep}>
                    Back
                  </button>
                )}

                {step < 3 ? (
                  <button className="checkout-btn primary" type="button" onClick={nextStep}>
                    Next
                  </button>
                ) : (
                  <button className="checkout-btn primary" type="button" onClick={placeOrder} disabled={submitting}>
                    {submitting ? "Placing Order..." : "Place Order"}
                  </button>
                )}
              </div>
            </div>

            <aside className="checkout-summary-card">
              <h3>Order Summary</h3>
              <ul>
                {checkoutItems.map((item, index) => {
                  const name = item.product?.name || item.name;
                  const quantity = item.quantity || 1;
                  const priceRaw = item.product?.price || item.price || 0;
                  const price = typeof priceRaw === "number" ? priceRaw : Number(String(priceRaw).replace(/[^0-9.]/g, "")) || 0;
                  return (
                    <li key={`${name}-${index}`}>
                      <span>{name} x {quantity}</span>
                      <strong>₹{(price * quantity).toLocaleString()}</strong>
                    </li>
                  );
                })}
              </ul>
              <div className="checkout-total">
                <span>Total</span>
                <strong>₹{total.toLocaleString()}</strong>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
