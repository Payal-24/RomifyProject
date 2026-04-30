import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, default: 0 },
    images: { type: [String], default: [] },
    category: { type: String, index: true, trim: true },
    stock: { type: Number, default: 0 },
    sku: { type: String, trim: true },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
