const adminModel = require('../models/adminModel')
const getToken = require('../utils/getToken')

// admin Login
//@route POST => /api/admin/adminlogin
module.exports.adminLogin = async (req, res) => {

    try {
        
        const { email, password } = req.body
        const isAdmin = await adminModel.findOne({ email })
        if (!isAdmin) return res.status(400)

        isPasswordMatch = await isAdmin.comparePassword(password)
        if (!isPasswordMatch) return res.status(400)

        //getToken(user, 200, res);
        res.status(200).json("login success")
    } catch (error) {
        console.log(error);

    }


}