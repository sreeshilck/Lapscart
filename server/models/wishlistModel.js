const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    products:[{
        type: Object
    }]
    // productId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "product"
    // }  

},
{ timestamps: true})




module.exports = mongoose.model("wishlist", wishlistSchema);