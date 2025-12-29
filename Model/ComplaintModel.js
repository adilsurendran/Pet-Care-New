import mongoose, { Schema } from "mongoose";

const complaintSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Login", required: true },
  issue: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reply: {
    message: { type: String },
    repliedAt: { type: Date },
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
