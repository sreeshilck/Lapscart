const router = require("express").Router();
const {authToken}  = require ('../middlewares/authToken')
const {userLogin, userSignup, registerOtpVerify, getResendOtp, forgotPassword,passwordreset, userLogout, getUserProfile,updateUserName,
    updateUserPhone, updateUserPassword} = require ('../controllers/userController')

router.post("/login",userLogin)
router.post("/signup",userSignup)
router.post("/verifyotp",registerOtpVerify)
router.get("/resendotp/:id",getResendOtp)
router.post("/forgotpassword",forgotPassword)
router.post("/passwordreset/:token",passwordreset)
router.post("/profile", authToken, getUserProfile)
router.put("/updatename", authToken, updateUserName)
router.put("/updatephone", authToken, updateUserPhone)
router.put("/changepassword", authToken, updateUserPassword)







module.exports = router;