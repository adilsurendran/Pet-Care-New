// import mongoose, { Schema } from "mongoose"

// /* schema for the doctor Username and pasword in the Login.js */

// const doctorSchema = new Schema({
//     commonkey:{
//         type:Schema.Types.ObjectId,
//         ref:"Login"
//     },
//     doctorName:{
//         type:String,
//         required:true
//     },
//     doctorEmail:{
//         type:String,
//         required:true
//     },
//     doctorNumber:{
//         type:String,
//         required:true
//     },
//     doctorAddress:{
//         type:String,
//         required:true
//     },
//     doctorQualification:{
//         type:String,
//         required:true
//     }
// })

// const doctData = mongoose.model('Doctor', doctorSchema)
// export default doctData
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
