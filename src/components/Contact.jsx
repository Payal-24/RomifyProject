import "./Contact.css";
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

import { useEffect, useRef } from 'react';
function Contact() {
  const [state, handleSubmit] = useForm("xkovrqdz");
  const formRef = useRef(null);
  const [showSuccess, setShowSuccess] = React.useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      // Reset form fields
      if (formRef.current) {
        formRef.current.reset();
      }
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-image">
          <div className="image-placeholder"></div>
          <div className="social-links">
            <a href="#" className="social-icon">📷</a>
            <a href="#" className="social-icon">f</a>
            <a href="#" className="social-icon">👍</a>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h2>Get In Touch</h2>
          <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Message*"
                rows="6"
                required
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <div className="form-footer">
              <p className="email-text">📧 romify.india57@gmail.com</p>
              <button
                type="submit"
                className="submit-btn"
                disabled={state.submitting}
              >
                Send
              </button>
            </div>
          </form>
          {showSuccess && (
            <div className="success-overlay">
              <div className="success-popup">
                <div className="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;