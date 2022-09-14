const mongoose = require("mongoose")
const Schema = mongoose.Schema



const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    products: [
        {
            type: Object
        }
    ],
    total: {
        type: Number
    },
    grandTotal: {
        type: Number
    }
},{
        timestamps: true
})




module.exports = mongoose.model("cart", cartSchema);