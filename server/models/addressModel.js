const mongoose = require("mongoose")


const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    allAddress: [
        {

            addressId: { type: mongoose.Schema.Types.ObjectId },
            address: {
                type: String
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
            state: {
                type: String
            },
            pincode: {
                type: Number
            },
            isDefault: {
                type: Boolean,
                default: false
            },
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model("address", addressSchema)