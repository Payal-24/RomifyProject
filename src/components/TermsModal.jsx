import React, { useEffect } from "react";
import "../pages/Terms.css";

const SECTIONS = [
  { id: "account", title: "Account", content: "You are responsible for keeping your account credentials secure and for all activity that occurs under your account. Do not share your password. Notify us immediately if you suspect unauthorized access." },
  { id: "orders", title: "Orders & Payments", content: "Orders placed through the site are subject to availability and payment verification. Prices and availability may change. We use third-party payment processors and are not liable for their failures." },
  { id: "returns", title: "Returns & Refunds", content: "Returns and refunds are handled according to our Returns Policy. If you receive a damaged or incorrect item, contact support within 7 days." },
  { id: "acceptable", title: "Acceptable Use", content: "You agree not to use the service for illegal activities, spam, harassment, or to infringe the rights of others. Violation may lead to account suspension." },
  { id: "privacy", title: "Privacy", content: "We collect and process personal data as described in our Privacy Policy. By using the service you consent to such processing." },
  { id: "contact", title: "Contact", content: "For questions about these Terms, contact our support team at support@romify.example (replace with your real support email)." },
];

export default function TermsModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="terms-modal" onClick={(e) => e.stopPropagation()}>
        <div className="terms-modal-header">
          <h2>Terms & Conditions</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="terms-modal-body">
          <p className="lead">By creating an account or using our services, you agree to these terms.</p>
          {SECTIONS.map((s) => (
            <div key={s.id} className="modal-section">
              <h4>{s.title}</h4>
              <p>{s.content}</p>
            </div>
          ))}
          <p className="terms-note">Sample terms for development. Replace with legally reviewed terms before production.</p>
        </div>
      </div>
    </div>
  );
}
