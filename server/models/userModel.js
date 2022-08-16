const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    name:{
        type:String,
        required: [true, "Name is Required"],
    },
    email:{
        type:String,
        required: [true, "Email is Required"],
        unique: true,
    },
    phonenumber:{
        type: String,
        required: [true, "Phone Number is Required"],
    },
    password:{
        type: String,
        required: [true, "Password is Required"],
        
    },
    wishlist:[
        {
            type:Array,
            productId: Schema.Types.ObjectId,
            ref:"",
            productName:String,
        }
    ],
    isBlocked:{
        type:Boolean,
        default:false
    },
    verified:{
        email:{
            type:Boolean,
            default:false
        },
        phone:{
            type:Boolean,
            default:false
        }
    },
     
})

//Before saving encrypting password
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
console.log("to the bycrypt");
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
   // next()
})




module.exports = mongoose.model("Users", userSchema)