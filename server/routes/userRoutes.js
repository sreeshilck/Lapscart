const router = require("express").Router();

const {userLogin, userSignup, registerOtpVerify, getResendOtp} = require ('../controllers/userController')

router.post("/login",userLogin)
router.post("/signup",userSignup)
router.post("/verifyotp",registerOtpVerify)
router.get("/resendotp/:id",getResendOtp)







module.exports = router;