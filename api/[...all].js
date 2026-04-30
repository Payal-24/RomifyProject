import app, { connectDB } from "../backend/server.js";

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("API handler error:", error);
    return res.status(500).json({
      success: false,
      message: "Serverless API initialization failed",
      error: error.message,
    });
  }
}