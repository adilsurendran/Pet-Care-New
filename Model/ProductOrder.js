import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Login", required: true }, // User placing the order
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true }, // Product being booked
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" }, // Order status
    orderDate: { type: Date, default: Date.now }, // Timestamp of order
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
