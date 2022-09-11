const router = require("express").Router();
const {authToken}  = require ('../middlewares/authToken')
const {
    createProduct, getAllProducts, getProductById, 
    updateProduct, deleteProduct, createProductReview,
    getAllReviews, deleteReview, addToWishlist
    } = require ('../controllers/productController')

router.post("/addproduct", createProduct)       // create new product
router.get("/getproducts", getAllProducts)       // get all products
router.get("/:id", getProductById)              // get single product
router.put("/updateproduct/:id", updateProduct) // update product
router.delete("/deleteproduct/:id", deleteProduct) // delete product

router.post("/review/:id", authToken, createProductReview) // create product review
router.get("/reviews/:id", getAllReviews)  // get all reviews of a product
router.delete("/deletereview/:id", authToken, deleteReview) // delete product review


router.post("/addwishlist/:id", addToWishlist) // add product to wishlist



module.exports = router; 
