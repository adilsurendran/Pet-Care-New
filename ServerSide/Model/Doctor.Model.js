
import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    commonkey: {
      type: Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },

    doctorName: {
      type: String,
      required: true,
      trim: true,
    },

    doctorEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    doctorNumber: {
      type: String,
      required: true,
    },

    doctorAddress: {
      type: String,
      required: true,
    },

    doctorQualification: {
      type: String,
      required: true,
    },

    doctorExperience: {
      type: Number,
      required: true,
      min: 0,
    },

    doctorAbout: {
      type: String,
      required: true,
    },

    doctorImage: {
      type: String, // stores image path
      required: true,
    },
  },
  { timestamps: true }
);

const doctData = mongoose.model("Doctor", doctorSchema);
export default doctData;
