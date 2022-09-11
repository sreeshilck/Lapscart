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
        require: true,
        maxLength: 20
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true,
        default: 0.0
    },
    images: [
        {
            public_id: {
                type: String,
                //required: true
            },
            url: {
                type: String,
               // required: true
            },
        }
    ],
    stockCount:{
        type : Number,
        required: true,
        default: 0
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
})


module.exports = mongoose.model("Products" , productSchema)