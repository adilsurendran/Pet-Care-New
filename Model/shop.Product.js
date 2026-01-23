import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: ["food", "toys", "accessories", "medicine"],
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    screenshots: {
      type: [String],
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", ProductSchema);
export default Product;

