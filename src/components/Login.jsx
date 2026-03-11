import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLoginSuccess, onSignUpClick }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleEmailError, setGoogleEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time email validation
    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }

    // Password strength check
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);

      if (value.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleGoogleEmailChange = (e) => {
    const email = e.target.value;
    setGoogleEmail(email);

    if (email && !validateEmail(email)) {
      setGoogleEmailError("Please enter a valid email address");
    } else {
      setGoogleEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!formData.password.trim()) {
      alert("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    // Simulate authentication
    setIsLoading(true);

    setTimeout(() => {
      // Store user data in localStorage (for demo purposes)
      const userData = {
        email: formData.email,
        loginTime: new Date().toLocaleString(),
        loggedIn: true,
        loginMethod: "email",
      };

      localStorage.setItem("romifyUser", JSON.stringify(userData));

      console.log("Login successful:", userData);
      setIsLoading(false);
      setSuccessMessage("Welcome back!");
      setShowSuccess(true);

      // Reset form
      setFormData({
        email: "",
        password: "",
      });
      setPasswordStrength(0);

      // Hide popup and trigger callback after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }, 3000);
    }, 1500); // Simulate network delay
  };

  const handleGoogleLogin = () => {
    setShowGoogleModal(true);
  };

  const handleGoogleModalSubmit = () => {
    if (!googleEmail.trim()) {
      alert("Please enter an email address");
      return;
    }

    if (!validateEmail(googleEmail)) {
      setGoogleEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setShowGoogleModal(false);

    setTimeout(() => {
      // Simulate Google login response with user's email
      const userData = {
        email: googleEmail,
        name: googleEmail.split("@")[0],
        loginTime: new Date().toLocaleString(),
        loggedIn: true,
        loginMethod: "google",
        profilePicture: "https://via.placeholder.com/150",
      };

      localStorage.setItem("romifyUser", JSON.stringify(userData));

      console.log("Google login successful:", userData);
      setIsLoading(false);
      setSuccessMessage(`Welcome, ${userData.name}!`);
      setShowSuccess(true);

      // Reset form and modal
      setFormData({
        email: "",
        password: "",
      });
      setGoogleEmail("");
      setGoogleEmailError("");
      setPasswordStrength(0);

      // Hide popup and trigger callback after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }, 3000);
    }, 1500);
  };

  const handleFacebookLogin = () => {
    setIsLoading(true);

    setTimeout(() => {
      // Simulate Facebook login response
      const userData = {
        email: "user@facebook.com",
        name: "Facebook User",
        loginTime: new Date().toLocaleString(),
        loggedIn: true,
        loginMethod: "facebook",
        profilePicture: "https://via.placeholder.com/150",
      };

      localStorage.setItem("romifyUser", JSON.stringify(userData));

      console.log("Facebook login successful:", userData);
      setIsLoading(false);
      setSuccessMessage("Welcome, Facebook User!");
      setShowSuccess(true);

      // Reset form
      setFormData({
        email: "",
        password: "",
      });
      setPasswordStrength(0);

      // Hide popup and trigger callback after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }, 3000);
    }, 1500);
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    if (passwordStrength === 4) return "Strong";
    return "Very Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "#ddd";
    if (passwordStrength <= 1) return "#ff6b6b";
    if (passwordStrength <= 2) return "#ffa94d";
    if (passwordStrength <= 3) return "#ffd43b";
    return "#51cf66";
  };

  return (
    <section className="login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your Romify account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <span className="error-message">{emailError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {passwordError && (
                <span className="error-message">{passwordError}</span>
              )}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <div
                        key={bar}
                        className="strength-bar"
                        style={{
                          backgroundColor:
                            bar <= passwordStrength
                              ? getPasswordStrengthColor()
                              : "#e0e0e0",
                        }}
                      ></div>
                    ))}
                  </div>
                  <span className="strength-label">
                    {getPasswordStrengthLabel()}
                  </span>
                </div>
              )}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={emailError !== "" || isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button
              type="button"
              className="social-btn google"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? "..." : "Google"}
            </button>
            <button
              type="button"
              className="social-btn facebook"
              onClick={handleFacebookLogin}
              disabled={isLoading}
            >
              {isLoading ? "..." : "Facebook"}
            </button>
          </div>
        </div>

        <div className="login-image-section">
          <img src="/assets/loginpic.png" alt="Login" className="login-image" />
        </div>
      </div>

      {/* Google Email Modal */}
      {showGoogleModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Sign in with Google</h2>
            <p>Please enter your Google email address</p>
            
            <div className="modal-form-group">
              <input
                type="email"
                placeholder="Enter your Google email"
                value={googleEmail}
                onChange={handleGoogleEmailChange}
                className="modal-input"
              />
              {googleEmailError && (
                <span className="error-message">{googleEmailError}</span>
              )}
            </div>

            <div className="modal-actions">
              <button
                className="modal-btn cancel"
                onClick={() => {
                  setShowGoogleModal(false);
                  setGoogleEmail("");
                  setGoogleEmailError("");
                }}
              >
                Cancel
              </button>
              <button
                className="modal-btn confirm"
                onClick={handleGoogleModalSubmit}
                disabled={!googleEmail.trim() || googleEmailError !== ""}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-popup">
            <div className="success-icon">✓</div>
            <h3>Login Successful!</h3>
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Login;
