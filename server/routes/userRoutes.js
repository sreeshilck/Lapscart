const router = require("express").Router();

const {userLogin, userSignup, registerOtpVerify, getResendOtp, forgotPassword,passwordreset} = require ('../controllers/userController')

router.post("/login",userLogin)
router.post("/signup",userSignup)
router.post("/verifyotp",registerOtpVerify)
router.get("/resendotp/:id",getResendOtp)
router.post("/forgotpassword",forgotPassword)
router.post("/passwordreset/:token",passwordreset)







module.exports = router;