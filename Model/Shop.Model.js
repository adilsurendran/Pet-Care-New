import mongoose, { Schema } from "mongoose";

const shopSchema = new Schema({
    commonkey:{
        type:Schema.Types.ObjectId,
        ref:"Login"
    },
    shopName:{
        type:String,
        required:true
    },
    shopAddress:{
        type:String,
        required:true
    },
    shopPhone:{     
        type:String,
        required:true
    },
    shopEmail:{
        type:String,
        required:true
    },
})

const shopdata = mongoose.model('Shop', shopSchema)
export default shopdata