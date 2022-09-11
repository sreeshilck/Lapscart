const mongoose = require ("mongoose")

const addressSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    address:{
        type:String
    },
    phonenumber: {
        type: Number
    },
    city: {
        type: String
    },
    district: {
        type: String
    },
    state:{
        type : String
    },
    pincode: {
        type: Number
    },
    isDefault: {
        type: Boolean,
        default: false
    },
     
},{timestamps: true})

module.exports = mongoose.model("Address" , addressSchema)