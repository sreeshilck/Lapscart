const userModel = require("../models/userModel");

// Create and send token ,save it in the cookie.
const getToken = async (user, statusCode, res) => {

     // generate the  Jwt token
     const token = await user.generateJwtToken();

    if (statusCode == 201) {
        await userModel.findByIdAndUpdate(user._id, { $set: { 'verified.email': true } })
        return res.status(201).json({ created: true, verified: true, isLoggedIn : true, Utoken :token ,uID: user._id })
    }
  
    res.status(statusCode).json({isLoggedIn : true, Utoken :token ,uID: user._id});

}

module.exports = getToken;