import mongoose from "mongoose";

const DocBookingSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Login", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Login", required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true }, // e.g., "10:30 AM"
  status: { type: String, enum: ["Pending", "Confirmed", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

const DocBooking = mongoose.model("DocBooking", DocBookingSchema);
export default DocBooking;
