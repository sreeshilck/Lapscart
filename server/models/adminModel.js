const mongoose = require ('mongoose')
const bcrypt = require("bcrypt")

const adminSchema = new mongoose.Schema({
    name : {
        type:String,
        require: true
    },
    email : {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }   
})



// encrypting user password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// comparing password
adminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}




module.exports = mongoose.model("Admin" , adminSchema)