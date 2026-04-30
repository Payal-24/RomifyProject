import "./Login.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Social login disabled — removed Google/Facebook flows

const loadScript = (src, id) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.id = id;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
};

function Login({ onLoginSuccess, onSignUpClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const redirectPath = location.state?.from || "/";

  useEffect(() => {
    if (location.state?.authMessage) {
      setGeneralError(location.state.authMessage);
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

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
    setGeneralError("");

    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!formData.email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!formData.password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);

      // Call login from AuthContext with admin flag
      const response = await login(formData.email, formData.password, isAdminLogin);

      console.log("Login successful:", response);
      const messagePrefix = isAdminLogin ? "Admin login successful! Welcome to admin panel." : "Welcome back!";
      setSuccessMessage(messagePrefix);
      setShowSuccess(true);

      // Clear form
      setFormData({
        email: "",
        password: "",
      });
      setPasswordStrength(0);

      // Navigate after showing success message
      setTimeout(() => {
        setShowSuccess(false);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        // Navigate to admin dashboard if admin login
        if (isAdminLogin) {
          navigate("/admin");
        } else {
          navigate(redirectPath, { replace: true });
        }
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      setGeneralError(error.message || "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  // Social login handlers removed

  // parseJwtPayload removed

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
            <h1>{isAdminLogin ? "Admin Login" : "Welcome Back"}</h1>
            <p>{isAdminLogin ? "Sign in to admin panel" : "Sign in to your Romify account"}</p>
          </div>

          {/* Login Type Tabs */}
          <div className="login-type-tabs">
            <button
              className={`tab-btn ${!isAdminLogin ? "active" : ""}`}
              onClick={() => {
                setIsAdminLogin(false);
                setFormData({ email: "", password: "" });
                setEmailError("");
                setPasswordError("");
                setGeneralError("");
              }}
            >
              Customer Login
            </button>
            <button
              className={`tab-btn ${isAdminLogin ? "active" : ""}`}
              onClick={() => {
                setIsAdminLogin(true);
                setFormData({ email: "", password: "" });
                setEmailError("");
                setPasswordError("");
                setGeneralError("");
              }}
            >
              Admin Login
            </button>
          </div>

          {generalError && (
            <div className="error-banner">
              <span>{generalError}</span>
            </div>
          )}

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

          {!isAdminLogin && (
            <>
              {/* Social login removed */}
            </>
          )}
        </div>

        <div className="login-image-section">
          <img src="/assets/loginpic.png" alt="Login" className="login-image" />
        </div>
      </div>

      
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
