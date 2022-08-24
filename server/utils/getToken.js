// Create and send token ,save it in the cookie.
const getToken = async (user, statusCode, res) => {

    // generate the  Jwt token
    const token = await user.generateJwtToken();

    // const options = {
    //     maxAge: process.env.COOKIE_EXPIRE_TIME * 60 * 60 * 1000,
    //     httpOnly: true,
    //     withCredentials: true,
    // }
   
    // res.status(statusCode).cookie('UToken', token, options).json({
    //     isLoggedIn:true,
    // })

    res.status(statusCode).json({isLoggedIn : true, Utoken :token ,uID: user._id});

}

module.exports = getToken;