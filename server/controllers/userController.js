const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { sendOtp, verifyOtp } = require('../utils/twilioOtp')
const getToken = require('../utils/getToken')
const sendEmail = require ('../utils/sendEmail')
const crypto = require("crypto");


// User Signup
// @route POST => /api/user/signup
module.exports.userSignup = async (req, res) => {
    try {

        const { name, email, phonenumber, password } = req.body;

        const userExists = await userModel.findOne({ email })
        // check if user Exists
        if (userExists) return res.status(409).json({ created: false, message: "User already exists" });

        //create newuser
        const newUser = await userModel.create({ name, email, phonenumber, password })


        if (newUser) {
            const sendOtpRes = await sendOtp(newUser.phonenumber);
            res.status(201).json({ user: newUser._id, created: true, verified: false })
        } else {
            res.status(400).json({ created: false, verified: false, msg: "Registration Failed Try Again..." })

        }


    } catch (error) {
        console.log(error);
        res.status(400).json({ created: false, msg: "Registration Failed Try Again..." })
    }
}

// OTP verification 
// @route POST => /api/user/verifyotp
module.exports.registerOtpVerify = async (req, res) => {
    try {

        const { otp, userId } = req.body;
        const userData = await userModel.findById(userId, { phonenumber: 1 })

        if (userData) {
            const verifyOtpRes = await verifyOtp(otp, userData.phonenumber)
            if (verifyOtpRes) {
                if (verifyOtpRes.status == 'approved' && verifyOtpRes.valid == true) {

                    await userModel.findByIdAndUpdate(userData._id, { $set: { 'verified.phone': true } })

                    res.status(201).json({ user: userData._id, verified: true, note: "it is success.." })
                } else {

                    res.status(400).json({ user: userData._id, verified: false, msg: "Invalid OTP!!!" })
                }
            } else {
                res.status(400).json({ user: userData._id, verified: false, msg: "Invalid OTP!!!" })
            }


        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ verified: false, msg: "Something went wrong ...." })
    }
}


//  Resend OTP
//@route GET => /api/user/resendotp:id
module.exports.getResendOtp = async (req, res) => {
    const uId = req.params.id;
    const userData = await userModel.findById(uId, { phonenumber: 1 })
    if (userData) {

        await sendOtp(userData.phonenumber);
        res.status(201).json({ resendstatus: true })
    } else {
        res.status(400).json({ resendstatus: false })
    }

}



// User Login
// @route POST =>  /api/user/login
module.exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Finding user in database
        const user = await userModel.findOne({ email })
        // check the user
        if (!user) return res.status(400).json({ isLogged: false, msg: "Invalid Email or Password" })

        // check if user is blocked
        if (user.isBlocked) {
            return res.status(403).json({ msg: "You are blocked..." })
        } else {
            // Checks if entered password is correct or not
            const isPasswordMatched = await user.comparePassword(password);
            if (!isPasswordMatched) {
                return res.status(400).json({ isLogged: false, msg: "Invalid Email or Password" });
            } else {
                // for token generate
                getToken(user, 200, res);
            }

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ isLogged: false, msg: "Login failed please try again.." })
    }
}

// forgot password
// @route POST => /api/user/forgotpassword
module.exports.forgotPassword = async (req, res) => {
try{
    const { email } = req.body
    // find user
    const user = await userModel.findOne({ email: email })

    if (!user) return res.status(400).json({ msg: "Invalid email " })


        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        // Create reset password url
        const resetUrl = `${process.env.BASE_URL}/user/passwordreset/${resetToken}`;

        let msg = `Your password reset url is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`
    

        await sendEmail({
            email: user.email,
            subject: 'Lapscart Password Reset',
            msg
        })

        res.status(200).json({
            success: true,
            message: `Email Is Sent To: ${user.email}`
        })

    } catch (error) {
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        res.status(500).json({ msg: "something went wrong please try again.." })
    }
}

// Reset Password
// @route POST => /api/user/passwordreset/:token
module.exports.passwordreset = async (req, res) => {
try {

     // Hash URL token
     const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

     const user = await userModel.findOne({
         resetPasswordToken,
         resetPasswordExpire: { $gt: Date.now() }
     })
     if (!user) return res.status(400).json({url:false,msg:"invalid reset url"})

     if (req.body.password != req.body.confirmpassword) return res.status(400).json({msg:"password not matching"})

       // Set New Password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(200).json({msg:"Reset Password Successfull"})
    

} catch (error) {
    console.log(error);
    res.status(500).json({msg:"Something went wrong try again.."})
}


}