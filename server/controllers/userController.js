const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { sendOtp, verifyOtp } = require('../utils/twilioOtp')

//@@ User Login
//@@  /api/user/login
module.exports.userLogin = async (req, res) => {
    try {
        console.table(req.body);
        const {email,password} = req.body;

        //const user = await userModel.findOne({email})
       console.log(user,"====user ");

    } catch (error) {
        console.log(error);
    }
}

//@@ User Signup
//@@ /api/user/signup
module.exports.userSignup = async (req, res) => {
    try {

        const { name, email, phonenumber, password } = req.body;

        const userExists = await userModel.findOne({ email })

        if (userExists) {

            return res.status(400).json({ created: false, message: "User already exists" });
        }

        const newUser = await userModel.create({ name, email, phonenumber, password })


        if (newUser) {
            const sendOtpRes = await sendOtp(newUser.phonenumber);
            //console.log(sendOtpRes, "====sendotpppppp res");
            res.status(201).json({ user: newUser._id, created: true, verified: false })
        } else {
            res.status(400).json({ created: false, verified: false, msg: "Registration Failed Try Again..." })

        }


    } catch (error) {
        console.log(error);
        res.status(400).json({ created: false, msg: "Registration Failed Try Again..." })
    }
}

//@@  OTP verification 
//@@  /api/user/verifyotp
module.exports.registerOtpVerify = async (req, res) => {
    try {

        const { otp, userId } = req.body;
        const userData = await userModel.findById(userId, { phonenumber: 1 })

        if (userData) {
            const verifyOtpRes = await verifyOtp(otp, userData.phonenumber)
            console.log(verifyOtpRes, "=====verifyOtpRes");
            if (verifyOtpRes) {
                if (verifyOtpRes.status == 'approved' && verifyOtpRes.valid == true) {

                    await userModel.findByIdAndUpdate(userData._id, { $set: { 'verified.phone': true } })

                    res.status(201).json({ user: userData._id, verified: true, note: "it is success.." })
                } else {
                    console.log("else false otp ");
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


//@@  Resend OTP
//@@  /api/user/resendotp:id
module.exports.getResendOtp = async (req, res) => {
    console.log(req.params.id, "reqqqq");
    const uId = req.params.id;
    const userData = await userModel.findById(uId, { phonenumber: 1 })
    if (userData) {

        await sendOtp(userData.phonenumber);
        res.status(201).json({ resendstatus: true })
    } else {
        res.status(400).json({ resendstatus: false })
    }

} 