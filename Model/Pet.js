import mongoose from "mongoose";
import { type } from "os";

const PetSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    breed: {
      type: String,
      required: true
    },

    purchaseDate: {
      type: Date
    },

    ageYears: {
      type: Number,
      default: 0
    },

    ageMonths: {
      type: Number,
      default: 0
    },

    sex: {
      type: String,
      enum: ["Male", "Female"],
      required: true
    },

    lastVaccination: {
      type: Date
    },

    weight: {
      type: Number // in KG
    },
    image:{type:String}
  },
  { timestamps: true }
);

export default mongoose.model("Pet", PetSchema);
