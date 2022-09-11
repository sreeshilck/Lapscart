const userModel = require('../models/userModel')
const addressModel = require('../models/addressModel')
const jwt = require('jsonwebtoken');
const { sendOtp, verifyOtp } = require('../utils/twilioOtp')
const getToken = require('../utils/getToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwtDecode = require("jwt-decode");
const { OAuth2Client } = require('google-auth-library');
const { log } = require('console');

// User Signup
// @route POST => /api/user/signup
module.exports.userSignup = async (req, res) => {
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            const idToken = req.headers.authorization.split(' ')[1]

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

            client
                .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
                .then((response) => {

                    const { email_verified, given_name, email, sub } = response.payload;
                    const password = sub;
                    const name = given_name;

                    //check email is verified
                    if (email_verified) {
                        userModel.findOne({ email }).exec((err, user) => {

                            // return if user Exists
                            if (user) return res.status(409).json({ created: false, message: "User already exists" });

                            //create new user
                            const userData = new userModel({ name, email, password })
                            userData.save((err, data) => {

                                if (err) {
                                    return res.status(400).json({ created: false, verified: false, msg: "User Signup is failed with google" });
                                }

                                getToken(data, 201, res);

                            })

                        })

                    } else {
                        res.status(400).json({ created: false, verified: false, msg: "Authentication Failed Try Again.." })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({ created: false, verified: false, msg: "Authentication Failed Try Again.." })

                })



        } else if (req.body) {

            let { name, email, phonenumber, password } = req.body;

            phonenumber = +phonenumber.replace(/\D/g, '').slice(-10);


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
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ created: false, msg: "Registration Failed Try Again..." })
    }
}

// Mobile OTP verification 
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

                    res.status(201).json({ user: userData._id, verified: true, isLoggedIn: true })
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

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const idToken = req.headers.authorization.split(' ')[1]

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

            client
                .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
                .then((response) => {

                    const { email_verified, email } = response.payload;

                    //check email is verified
                    if (email_verified) {
                        //find user in db
                        userModel.findOne({ email }).exec((err, user) => {

                            // return if user Exists
                            if (!user) return res.status(400).json({ isLoggedIn: false, message: "User login failed with google" });

                            if (user.isBlocked) return res.status(403).json({ isLoggedIn: false, msg: "You are blocked..." });


                            getToken(user, 200, res);


                        })

                    } else {
                        res.status(400).json({ created: false, verified: false, msg: "Google Authentication Failed Try Again.." })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({ created: false, verified: false, msg: "Google Authentication Failed Try Again.." })

                })

        } else if (req.body) {
            const { email, password } = req.body;

            // Finding user in database
            const user = await userModel.findOne({ email })
            // check the user
            if (!user) return res.status(400).json({ isLoggedIn: false, msg: "Invalid Email or Password" })

            // check if user is blocked
            if (user.isBlocked) {
                return res.status(403).json({ isLoggedIn: false, msg: "You are blocked..." })
            } else {
                // Checks if entered password is correct or not
                const isPasswordMatched = await user.comparePassword(password);
                if (!isPasswordMatched) {
                    return res.status(400).json({ isLoggedIn: false, msg: "Invalid Email or Password" });
                } else {
                    // for token 
                    getToken(user, 200, res);
                }

            }
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({ isLoggedIn: false, msg: "Login failed please try again.." })
    }
}

// forgot password
// @route POST => /api/user/forgotpassword
module.exports.forgotPassword = async (req, res) => {
    try {
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
        if (!user) return res.status(400).json({ url: false, msg: "invalid reset url" })

        if (req.body.password != req.body.confirmpassword) return res.status(400).json({ msg: "password not matching" })

        // Set New Password
        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.status(200).json({ msg: "Reset Password Successfull" })


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong try again.." })
    }


}

// User Logout
// @route POST => /api/user/logout
module.exports.userLogout = async (req, res) => {

    try {
        console.log(req.user, "req.userr");

    } catch (error) {
        console.log(error);
    }

}

// User Profile
// @route GET => api/user/profile
module.exports.getUserProfile = async (req, res) => {
    try {
        if (req.user) {
            const userProfile = await userModel.findById(req.user, { name: 1, email: 1, phonenumber: 1, verified: 1 });
            // if (!userProfile.verified.email && !userProfile.verified.phone ) res.status(200).json({profile:userProfile,email:false,phone:false})
            // else if (!userProfile.verified.email) res.status(200).json({profile:userProfile})

            res.status(200).json({ profile: userProfile })
        } else {
            res.status(400).json({ msg: "no user found" })
        }

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error " })
    }

}

// Update User Name
// @route PUT => api/user/updatename
module.exports.updateUserName = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.user, { name: req.body.name })
        const updateName = await userModel.findById(req.user, { name: 1 })
        res.status(200).json({ user: updateName, updated: true, msg: "Name Updated Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ updated: false, msg: "Internal Server Error" })
    }
}

// Update User Phone
// @route PUT => api/user/updatephone
module.exports.updateUserPhone = async (req, res) => {
    try {
        console.log(req.body);
        const number = req.body.phonenumber;
        const user = await userModel.findById(req.user, { phonenumber: 1 })
        if (user.phonenumber == number) {
            return res.status(200).json({ sent: false, msg: 'phone number has no change' })
        } else {
            //const sendOtpRes = await sendOtp(number);
            req.session.newphone = number;
            console.log(req.session.newphone, "   %%% session");
            res.status(200).json({ sent: true, msg: "OTP Sent Successfully" })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ sent: false, msg: "Internal Server Error" })
    }
}

// Update Phone Otp Verify
// @route POST => /api/user/phoneverifyotp
module.exports.updatePhoneOtpVerify = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.user);
        console.log(req.session);
    } catch (error) {

    }
}


// Update User Password
// @route PUT => /api/user/changepassword
module.exports.updateUserPassword = async (req, res) => {
    try {
        const { oldpassword, newpassword } = req.body
        console.log(oldpassword, newpassword)
        const userData = await userModel.findById(req.user)

        // Compare password
        const password = await bcrypt.compare(oldpassword, userData.password)

        //retun if password doesnt match
        if (!password) {
            return res.status(400).json({ updated: false, msg: "Enter Correct Password" })
        }
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        hashpassword = await bcrypt.hash(newpassword, salt);

        // save new password
        await userModel.findByIdAndUpdate(req.user, { password: hashpassword })
        res.status(200).json({ updated: true, msg: "Password Reset Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({})
    }
}


// Add User Address
// @route POST => /api/user/addaddress
module.exports.addAddress = async (req, res) => {
    try {
        const { address, phonenumber, city, district, state, pincode } = req.body
        const user = req.user
        await addressModel.create({
            user,
            address,
            phonenumber,
            city,
            district,
            state,
            pincode
        })

        res.status(201).json({success: true, msg: "Address added successfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, msg: "Internal Server Error" })
    }
}

// Get Single User Address
// @route GET => /api/user/getaddress
module.exports.getUserAddress = async (req, res) => {
    try {
        const userId = req.user
        const userAddress = await addressModel.find({ user: userId })
        if (!userAddress) return res.status(400).json({ success: false, msg: "Address not found " })

        res.status(200).json(userAddress)

    } catch (error) {
        res.status(500).json({success: false, msg: "Internal Server Error"})
        console.error(error)
    }
}

// Edit User Address
// @route PUT => /api/user/editaddress
module.exports.editUserAddress = async (req, res) => {
    try {
        const {address, city, district, state, pincode} = req.body
        const userId = req.user
        const updated = await addressModel.findOneAndUpdate({user: userId}, {address:address, city: city, district: district, state: state, pincode: pincode})
        res.send(updated)
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, msg: "Internal Server Error" })
    }
}