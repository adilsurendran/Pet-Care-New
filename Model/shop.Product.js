// import mongoose from 'mongoose';

// const ProductSchema = new mongoose.Schema({
//     ProductName: { type: String, required: true },  
//     description: { type: String, required: true },
//     price: { type: Number, required: true }, 
//     screenshots: { type: [String], required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
// });

// const Product = mongoose.model('Products', ProductSchema);
// export default Product;
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  ProductName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },

  quantity: {
    type: Number,
    required: true,
    min: 0,
  },

  available: {
    type: Boolean,
    default: true, // 🔹 default availability
  },

  screenshots: { type: [String], required: true },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login",
    required: true,
  },
});

const Product = mongoose.model("Products", ProductSchema);
export default Product;
