import "./SignUp.css";
import { useState } from "react";

function SignUp({ onSignUpSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

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
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Real-time password strength check
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Store user data in localStorage
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        signUpTime: new Date().toLocaleString(),
        signedUp: true,
        signUpMethod: "email",
      };

      localStorage.setItem("romifyNewUser", JSON.stringify(userData));

      console.log("Sign up successful:", userData);
      setIsLoading(false);
      setSuccessMessage(
        `Welcome, ${formData.firstName}! Your account has been created.`
      );
      setShowSuccess(true);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      setPasswordStrength(0);
      setErrors({});

      // Hide popup and trigger callback after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        if (onSignUpSuccess) {
          onSignUpSuccess();
        }
      }, 3000);
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);

    setTimeout(() => {
      const userData = {
        email: "newuser@gmail.com",
        firstName: "Google",
        lastName: "User",
        signUpTime: new Date().toLocaleString(),
        signedUp: true,
        signUpMethod: "google",
      };

      localStorage.setItem("romifyNewUser", JSON.stringify(userData));

      console.log("Google sign up successful:", userData);
      setIsLoading(false);
      setSuccessMessage("Account created with Google!");
      setShowSuccess(true);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      setPasswordStrength(0);
      setErrors({});

      setTimeout(() => {
        setShowSuccess(false);
        if (onSignUpSuccess) {
          onSignUpSuccess();
        }
      }, 3000);
    }, 1500);
  };

  const handleFacebookSignUp = () => {
    setIsLoading(true);

    setTimeout(() => {
      const userData = {
        email: "newuser@facebook.com",
        firstName: "Facebook",
        lastName: "User",
        signUpTime: new Date().toLocaleString(),
        signedUp: true,
        signUpMethod: "facebook",
      };

      localStorage.setItem("romifyNewUser", JSON.stringify(userData));

      console.log("Facebook sign up successful:", userData);
      setIsLoading(false);
      setSuccessMessage("Account created with Facebook!");
      setShowSuccess(true);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      setPasswordStrength(0);
      setErrors({});

      setTimeout(() => {
        setShowSuccess(false);
        if (onSignUpSuccess) {
          onSignUpSuccess();
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
    <section className="signup">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h1>Create Account</h1>
            <p>Join Romify and explore beautiful interior designs</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error-input" : ""}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error-input" : ""}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error-input" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error-input" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error-input" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-group checkbox">
              <label className="terms-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="terms-link">
                    Terms and Conditions
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="error-message">{errors.agreeTerms}</span>
              )}
            </div>

            <button
              type="submit"
              className="signup-btn"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>

        <div className="signup-benefits">
          <h2>Why Join Romify?</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">🎨</div>
              <h3>Exclusive Designs</h3>
              <p>Access curated interior design collections</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">🛒</div>
              <h3>Easy Shopping</h3>
              <p>One-click checkout and saved preferences</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">📱</div>
              <h3>AR Experience</h3>
              <p>Visualize furniture in your space instantly</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">💳</div>
              <h3>Secure Payments</h3>
              <p>Safe and encrypted transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-popup">
            <div className="success-icon">✓</div>
            <h3>Welcome to Romify!</h3>
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default SignUp;
