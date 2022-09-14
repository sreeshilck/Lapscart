const mongoose  = require ('mongoose')

// Review schema
const reviewSchema = mongoose.Schema({
    name : { type: String, },
    rating : { type: Number, },
    comment : { type: String, },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
},{ 
    timestamps: true
})



// Product schema
const productSchema = new mongoose.Schema({
    name:{
        type : String,
        trim: true,
        required: true,
        
    },
    brand: {
        type: String,
        trim: true,
        required: true,
        
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        default: 0.0
    },
    images: [
        {
            type: Object,
            required: true
        }
    ],
    stockCount:{
        type : Number,
        required: true,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    reviews: [reviewSchema],
    rating:{
        type : Number,
        required: true,
        default: 0
    },
    reviewsCount:{
        type : Number,
        required: true,
        default: 0
    },
    couponDiscount: {
        type: Number,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model("product" , productSchema)