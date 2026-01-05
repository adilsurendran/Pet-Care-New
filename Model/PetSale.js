import mongoose, { Schema } from "mongoose";

const petSaleSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    breed: {
      type: String,
      required: true
    },

    age: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Available", "Sold"],
      default: "Available"
    },
    image:{
        type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model("PetSale", petSaleSchema);
