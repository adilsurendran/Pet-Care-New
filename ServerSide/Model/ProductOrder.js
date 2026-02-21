import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User placing the order
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true }, // Product being booked
status: {
  type: String,
  enum: ["pending", "confirmed", "rejected", "cancelled","delivered"],
  default: "Pending",
},
    sellerId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    quantity:{type:Number}
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
