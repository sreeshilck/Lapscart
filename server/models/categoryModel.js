const mongoose = require ("mongoose")

const categorySchema = mongoose.Schema({
    category: {type: String,},
},{
    timestamps: true
})



module.exports = mongoose.model("category", categorySchema);