// models/Chat.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    lastMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // createdAt & updatedAt
);

// 🔒 Enforce one chat per buyer-doctor pair
chatSchema.index({ userId: 1, doctorId: 1 }, { unique: true });

export default mongoose.model("Chat", chatSchema);
