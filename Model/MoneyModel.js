/* model for money for each user */

import mongoose, { Schema } from "mongoose"

const moneySchema = new Schema({
    commonkey:{
        type:Schema.Types.ObjectId,
        ref:"Login"
    },
    money:{
        type:Number,
        required:true
    }
})

const moneydata = mongoose.model('Money', moneySchema)
export default moneydata