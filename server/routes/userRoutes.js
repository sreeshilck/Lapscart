const router = require("express").Router();
const {authToken}  = require ('../middlewares/authToken')
const {
    userLogin, userSignup, registerOtpVerify, getResendOtp, 
    forgotPassword,passwordreset, userLogout, getUserProfile,
    updateUserName, updateUserPhone, updateUserPassword, 
    updatePhoneOtpVerify, addAddress, getUserAddress, editUserAddress, getCart,
    addToCart, deleteFromCart, updateProductQuantity, addToWishlist, getWishlistData,
    deleteFromWishlist, deleteUserAddress

} = require ('../controllers/userController')


// user login, signup, profile
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
router.get("/getaddress", authToken, getUserAddress)         // get single user address
router.put("/editaddress/:id", authToken, editUserAddress)        // edit user address
router.delete("/deleteaddress/:id", authToken, deleteUserAddress) // delete user address



// user product cart
router.get("/getcart", getCart)                                              // get user cart details
router.post("/addcart/:id", authToken, addToCart)                           // add product to cart
router.delete("/deletecart/:id", authToken, deleteFromCart)                 // delete item from cart
router.post("/cart/updatequantity/:id", authToken, updateProductQuantity)   // increment product quantity in the cart



// user product wishlist
router.get("/getwishlist", authToken, getWishlistData)                          // get products from  wishlist 
router.post("/addwishlist/:id", authToken, addToWishlist)                        // add product to wishlist
router.delete("/deletewishlist/:id", authToken, deleteFromWishlist)              // delete product from wishlist













module.exports = router;