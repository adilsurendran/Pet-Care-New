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

    petType: {
      type: String,
    },

    notes: {
      type: String,
    },

    sex: {
      type: String,
      required: true
    },

    lastVaccination: {
      type: Date,
      default:null
    },

    weight: {
      type: String // in KG
    },
    weightunit: {
      type: String // in KG
    },
    image:{type:String}
  },
  { timestamps: true }
);

export default mongoose.model("Pet", PetSchema);
