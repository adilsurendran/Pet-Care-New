import mongoose, { Schema } from "mongoose"

/* schema for the doctor Username and pasword in the Login.js */

const doctorSchema = new Schema({
    commonkey:{
        type:Schema.Types.ObjectId,
        ref:"Login"
    },
    doctorName:{
        type:String,
        required:true
    },
    doctorEmail:{
        type:String,
        required:true
    },
    doctorNumber:{
        type:String,
        required:true
    },
    doctorAddress:{
        type:String,
        required:true
    },
    doctorQualification:{
        type:String,
        required:true
    }
})

const doctData = mongoose.model('Doctor', doctorSchema)
export default doctData