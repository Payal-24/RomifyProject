import React, { useState, useMemo } from "react";
import usePageTitle from "../hooks/usePageTitle";
import "./Terms.css";

const SECTIONS = [
  {
    id: "account",
    title: "Account",
    content:
      "You are responsible for keeping your account credentials secure and for all activity that occurs under your account. Do not share your password. Notify us immediately if you suspect unauthorized access.",
  },
  {
    id: "orders",
    title: "Orders & Payments",
    content:
      "Orders placed through the site are subject to availability and payment verification. Prices and availability may change. We use third-party payment processors and are not liable for their failures.",
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    content:
      "Returns and refunds are handled according to our Returns Policy. If you receive a damaged or incorrect item, contact support within 7 days.",
  },
  {
    id: "acceptable",
    title: "Acceptable Use",
    content:
      "You agree not to use the service for illegal activities, spam, harassment, or to infringe the rights of others. Violation may lead to account suspension.",
  },
  {
    id: "privacy",
    title: "Privacy",
    content:
      "We collect and process personal data as described in our Privacy Policy. By using the service you consent to such processing.",
  },
  {
    id: "contact",
    title: "Contact",
    content:
      "For questions about these Terms, contact our support team at support@romify.example (replace with your real support email).",
  },
];

export default function Terms() {
  usePageTitle("Romify - Terms and Conditions");

  const [open, setOpen] = useState(SECTIONS[0].id);

  const toc = useMemo(() => SECTIONS.map((s) => ({ id: s.id, title: s.title })), []);

  const toggle = (id) => setOpen((cur) => (cur === id ? null : id));

  return (
    <section className="terms-page modern">
      <div className="terms-grid">
        <aside className="terms-toc" aria-label="Table of contents">
          <div className="toc-card">
            <h3>Contents</h3>
            <ul>
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setOpen(t.id); }}>
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className="toc-note">Sample terms — replace with legal text before production.</p>
          </div>
        </aside>

        <main className="terms-content">
          <div className="terms-hero">
            <h1>Terms &amp; Conditions</h1>
            <p className="lead">Welcome to Romify. By using our services you agree to the terms below.</p>
          </div>

          <div className="accordion">
            {SECTIONS.map((sec) => (
              <section key={sec.id} id={sec.id} className={`accordion-item ${open === sec.id ? 'open' : ''}`}>
                <button className="accordion-toggle" onClick={() => toggle(sec.id)} aria-expanded={open === sec.id}>
                  <span>{sec.title}</span>
                  <span className="chev">{open === sec.id ? '−' : '+'}</span>
                </button>
                <div className="accordion-body" style={{ display: open === sec.id ? 'block' : 'none' }}>
                  <p>{sec.content}</p>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}
