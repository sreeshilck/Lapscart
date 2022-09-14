const mongoose = require ("mongoose")
const Schema = mongoose.Schema


const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'cart'
    },
    userAddress: {
        type: Schema.Types.ObjectId,
        ref: 'address'
    },
    orderedItems:[
        {
            type: Object
        }
    ]
})





module.exports = mongoose.model("order", orderSchema)