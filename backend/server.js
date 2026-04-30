import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";
// Orders are intentionally not persisted in MongoDB per project settings.
import nodemailer from "nodemailer";
import Razorpay from "razorpay";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_change_in_production";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/romify";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "change_this_admin_api_key";
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = process.env.SMTP_PORT || "";
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const EMAIL_FROM = process.env.EMAIL_FROM || `no-reply@${process.env.DOMAIN || "romify.local"}`;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
// Social login providers removed: Google/Facebook handled externally if needed

let razorpayClient = null;
if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
  razorpayClient = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    authProvider: {
      type: String,
      default: "local",
    },
    providerId: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Helper function to compare passwords
const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const buildUserResponse = (user) => ({
  id: user._id,
  email: user.email,
  name: user.name,
  role: user.role || "user",
  authProvider: user.authProvider || "local",
  avatar: user.avatar || "",
});

// Removed social token verification utilities to simplify server.

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
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
    const normalizedEmail = email?.toLowerCase().trim();

    // Validation
    if (!normalizedEmail || !password || !name) {
      return res.status(400).json({
        message: "Email, password, and name are required",
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      name,
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

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
    const normalizedEmail = email?.toLowerCase().trim();

    // Validation
    if (!normalizedEmail || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    // Find user
    const user = await User.findOne({ email: normalizedEmail });
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
      user: buildUserResponse(user),
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
app.get("/api/auth/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Profile retrieved successfully",
      success: true,
      user: buildUserResponse(user),
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

// Social login endpoint removed. Use local email/password auth only.

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

// Create Razorpay order (backend) — used by frontend to start checkout
app.post("/api/payments/razorpay/create-order", async (req, res) => {
  try {
    if (!razorpayClient) return res.status(500).json({ success: false, message: "Razorpay not configured" });

    const { amount, currency = "INR", receipt } = req.body;
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    // Razorpay expects amount in paise
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpayClient.orders.create(options);
    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error("Razorpay create order error:", err);
    res.status(500).json({ success: false, message: err.message || "Error creating Razorpay order" });
  }
});

// --- Products API ---

// Helper to require admin API key for management routes
const requireAdminKey = (req, res, next) => {
  const key = req.headers["x-admin-key"] || req.headers["admin-api-key"];
  if (!key || key !== ADMIN_API_KEY) {
    return res.status(403).json({ message: "Forbidden", success: false });
  }
  next();
};

// List products with basic search/filter
app.get("/api/products", async (req, res) => {
  try {
    const { q, category, limit = 50, skip = 0, sort = "-createdAt" } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .sort(sort)
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({ message: "Products retrieved", success: true, total, products });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Error fetching products", success: false, error: error.message });
  }
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found", success: false });
    res.status(200).json({ message: "Product retrieved", success: true, product });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Error fetching product", success: false, error: error.message });
  }
});

// Create product (admin only via ADMIN_API_KEY)
app.post("/api/products", requireAdminKey, async (req, res) => {
  try {
    const payload = req.body;
    const product = await Product.create(payload);
    res.status(201).json({ message: "Product created", success: true, product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Error creating product", success: false, error: error.message });
  }
});

// Update product (admin only)
app.put("/api/products/:id", requireAdminKey, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found", success: false });
    res.status(200).json({ message: "Product updated", success: true, product });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Error updating product", success: false, error: error.message });
  }
});

// Delete product (admin only)
app.delete("/api/products/:id", requireAdminKey, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found", success: false });
    res.status(200).json({ message: "Product deleted", success: true });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Error deleting product", success: false, error: error.message });
  }
});

// --- Orders API ---

// Create order endpoint: orders are not persisted server-side. Accept payload and attempt to send confirmation email.
app.post("/api/orders", verifyToken, async (req, res) => {
  try {
    const { items, total, address, paymentStatus = "pending", metadata = {}, customerEmail, customerName, customerPhone } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items required", success: false });
    }

    const orderData = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      address,
      paymentStatus,
      metadata,
      customerEmail,
      customerName,
      customerPhone,
      createdAt: new Date().toISOString(),
      userId: req.user?.id || null,
    };

    // Attempt to send confirmation email from backend (best-effort)
    let emailResult = { sent: false, error: null };
    try {
      if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT) || 587,
          secure: Number(SMTP_PORT) === 465,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        const recipient = customerEmail || req.user?.email || address?.email;
        const mailOptions = {
          from: EMAIL_FROM,
          to: recipient || undefined,
          subject: `Order confirmation - ${orderData.id}`,
          text: `Thank you for your order. Order ID: ${orderData.id}. Total: ${orderData.total}`,
          html: `<p>Thank you for your order.</p><p>Order ID: <strong>${orderData.id}</strong></p><p>Total: ${orderData.total}</p>`,
        };

        if (mailOptions.to) {
          const info = await transporter.sendMail(mailOptions);
          emailResult.sent = true;
          emailResult.info = info;
          console.log("Order confirmation email sent:", info);
        } else {
          emailResult.sent = false;
          emailResult.error = "No recipient email available";
          console.warn("Skipping email send - no recipient found for order", orderData.id);
        }
      } else {
        emailResult.sent = false;
        emailResult.error = "SMTP not configured";
      }
    } catch (emailErr) {
      console.error("Order confirmation email error:", emailErr);
      emailResult.sent = false;
      emailResult.error = emailErr.message || String(emailErr);
    }

    res.status(201).json({ message: "Order processed (not persisted)", success: true, order: orderData, emailResult });
  } catch (error) {
    console.error("Process order error:", error);
    res.status(500).json({ message: "Error processing order", success: false, error: error.message });
  }
});

// Get orders: user-specific or all if admin key provided
// Orders are not stored on the server. Listing or retrieving orders server-side is not supported.
app.get("/api/orders", (req, res) => {
  res.status(501).json({ message: "Order listing is not supported on the backend; orders are stored client-side.", success: false });
});

app.get("/api/orders/:id", (req, res) => {
  res.status(501).json({ message: "Order retrieval is not supported on the backend; orders are stored client-side.", success: false });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` Try: http://localhost:${PORT}/api/health`);
  });
};

startServer();
