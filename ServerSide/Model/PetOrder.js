import mongoose, { Schema } from "mongoose";

const petOrderSchema = new Schema(
  {
    petId: {
      type: Schema.Types.ObjectId,
      ref: "PetSale",
      required: true
    },

    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("PetOrder", petOrderSchema);
