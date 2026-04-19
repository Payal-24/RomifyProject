import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_change_in_production";

// Middleware
app.use(cors());
app.use(express.json());

// Mock database - In production, use a real database
const users = new Map();

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Helper function to compare passwords
const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided", success: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        message: "Invalid or expired token",
        success: false,
        error: error.message,
      });
  }
};

// Register endpoint
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Email, password, and name are required",
        success: false,
      });
    }

    // Check if user already exists
    if (users.has(email)) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    };

    users.set(email, user);

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      message: "Error during registration",
      success: false,
      error: error.message,
    });
  }
});

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    // Find user
    const user = users.get(email);
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Compare passwords
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Error during login",
      success: false,
      error: error.message,
    });
  }
});

// Protected route - Get user profile
app.get("/api/auth/profile", verifyToken, (req, res) => {
  try {
    const user = users.get(req.user.email);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Profile retrieved successfully",
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      message: "Error retrieving profile",
      success: false,
      error: error.message,
    });
  }
});

// Verify token endpoint
app.post("/api/auth/verify", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Token is valid",
    success: true,
    user: req.user,
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Romify JWT Authentication Server",
    version: "1.0.0",
    status: "running",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      profile: "GET /api/auth/profile",
      verify: "POST /api/auth/verify",
      health: "GET /api/health",
    },
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running", success: true });
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Try: http://localhost:${PORT}/api/health`);
});
