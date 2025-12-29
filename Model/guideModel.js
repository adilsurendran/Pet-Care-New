import mongoose, { Schema } from "mongoose";

const guideSchema = new Schema({
  docId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",          // 🔗 Reference Doctor table
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  videoUrl: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Guide = mongoose.model("Guide", guideSchema);
export default Guide;
