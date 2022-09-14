const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const crypto = require("crypto");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    phonenumber: {
        type: Number,
        
        default:null,
       // unique:true
    },
    password: {
        type: String,
        required: [true, "Password is Required"],

    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    verified: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: false
        }
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

// encrypting user password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// create JWT token and return
userSchema.methods.generateJwtToken = function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    });
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}


module.exports = mongoose.model("user", userSchema)