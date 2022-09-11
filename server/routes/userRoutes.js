const router = require("express").Router();
const {authToken}  = require ('../middlewares/authToken')
const {userLogin, userSignup, registerOtpVerify, getResendOtp, forgotPassword,passwordreset, userLogout, getUserProfile,updateUserName,
    updateUserPhone, updateUserPassword, updatePhoneOtpVerify, addAddress,
    getUserAddress, editUserAddress

} = require ('../controllers/userController')

router.post("/login",userLogin)
router.post("/signup",userSignup)
router.post("/verifyotp",registerOtpVerify)
router.get("/resendotp/:id",getResendOtp)
router.post("/forgotpassword",forgotPassword)
router.post("/passwordreset/:token",passwordreset)
router.post("/profile", authToken, getUserProfile)
router.put("/updatename", authToken, updateUserName)
router.put("/updatephone", authToken, updateUserPhone)
router.post("/phoneverifyotp",authToken, updatePhoneOtpVerify)
router.put("/changepassword", authToken, updateUserPassword)


// User Address
router.post("/addaddress", authToken, addAddress)             // add user address
router.get("/getaddress/", authToken, getUserAddress)         // get single user address
router.put("/editaddress", authToken, editUserAddress)        // edit user address


module.exports = router;