import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./RazorpayUPITest.css";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

export default function RazorpayUPITest() {
  const { user } = useAuth();
  const [amount, setAmount] = useState(1);
  const [upiId, setUpiId] = useState("");
  const [status, setStatus] = useState("");
  const [sdkReady, setSdkReady] = useState(false);

  const loadRazorpay = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    setStatus("Loading Razorpay SDK...");
    loadRazorpay()
      .then(() => {
        setSdkReady(true);
        setStatus("Razorpay SDK loaded. Ready.");
      })
      .catch((err) => {
        console.error(err);
        setSdkReady(false);
        setStatus(err?.message || "Razorpay SDK failed to load");
      });
  }, []);

  const startPayment = async () => {
    if (!RAZORPAY_KEY_ID) {
      setStatus("Missing VITE_RAZORPAY_KEY_ID in .env");
      return;
    }

    try {
      if (!sdkReady) {
        await loadRazorpay();
        setSdkReady(true);
      }

      const amountPaise = Math.round(Number(amount) * 100);
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amountPaise,
        currency: "INR",
        name: "Romify Test",
        description: "UPI Test Payment",
        method: {
          upi: true,
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay via UPI",
                instruments: [{ method: "upi" }],
              },
            },
            sequence: ["block.upi"],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
        theme: { color: "#0a6cff" },
        notes: {
          email: user?.email || "test@example.com",
          purpose: "UPI test checkout",
        },
        prefill: {
          name: user?.name || "Test User",
          email: user?.email || "test@example.com",
          contact: "",
        },
        handler: function (response) {
          setStatus(`Payment successful. Payment id: ${response.razorpay_payment_id}`);
        },
        modal: {
          ondismiss: function () {
            setStatus("Payment popup closed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Razorpay payment failed:", response.error);
        setStatus(response.error?.description || "Payment failed");
      });
      rzp.open();
      setStatus("Opening Razorpay checkout...");
    } catch (err) {
      console.error(err);
      setStatus(err?.message || err?.error?.description || "Error starting payment");
    }
  };

  const openUpiIntent = () => {
    if (!upiId.trim()) {
      setStatus("Please enter a UPI ID like name@upi");
      return;
    }

    const txnRef = `ROMIFY${Date.now()}`;
    const upiUrl =
      `upi://pay?pa=${encodeURIComponent(upiId.trim())}` +
      `&pn=${encodeURIComponent("Romify Test")}` +
      `&am=${encodeURIComponent(Number(amount) || 1)}` +
      `&cu=INR` +
      `&tr=${encodeURIComponent(txnRef)}` +
      `&tn=${encodeURIComponent("Romify UPI Test Payment")}`;

    setStatus(`Opening UPI app with reference ${txnRef}...`);

    try {
      window.location.href = upiUrl;
    } catch (err) {
      console.error(err);
      setStatus(err?.message || "Could not open UPI app");
    }
  };

  return (
    <>
      <Navbar />
      <section className="razorpay-test">
        <div className="razorpay-wrap">
          <h1>Razorpay UPI Test</h1>
          <p>Enter amount (INR) and click to open Razorpay checkout with UPI first</p>
          <p style={{ fontSize: 14, color: "#666" }}>
            Key loaded: {RAZORPAY_KEY_ID ? "Yes" : "No"} | SDK ready: {sdkReady ? "Yes" : "No"} | Logged in: {user ? "Yes" : "No"}
          </p>
          <div className="field">
            <label>Amount (INR)</label>
            <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="field">
            <label>Your UPI ID</label>
            <input
              type="text"
              placeholder="name@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
          <div className="actions">
            <button className="primary" onClick={startPayment}>Open UPI Checkout</button>
            <button className="primary" style={{ marginLeft: 12, background: "#16a34a" }} onClick={openUpiIntent}>
              Open UPI App
            </button>
          </div>
          <div className="status">{status}</div>
        </div>
      </section>
    </>
  );
}
