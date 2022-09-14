const router = require("express").Router();
const {authToken}  = require ('../middlewares/authToken')
const upload = require ("../utils/multerConfig")
const {
    createProduct, getAllProducts, getProductById, updateProduct, 
    deleteProduct, createProductReview, getAllReviews, deleteReview, 
    addProductCategory, getEditCategory, updateProductCategory, deleteProductCategory,
    getAllCategory,
    } = require ('../controllers/productController')

router.post("/addproduct", upload.array("images",4),  createProduct)       // create new product
router.get("/getproducts", getAllProducts)                                 // get all products
router.get("/findproduct/:id", getProductById)                                         // get single product
router.put("/updateproduct/:id", upload.array("images",4),updateProduct)                            // update product
router.delete("/deleteproduct/:id", deleteProduct)                         // delete product

//product review
router.post("/review/:id", authToken, createProductReview)                  // create product review
router.get("/reviews/:id", getAllReviews)                                   // get all reviews of a product
router.delete("/deletereview/:id", authToken, deleteReview)                 // delete product review



// product category
router.get("/findcategory", getAllCategory)                                  // get all product category
router.post("/addcategory", addProductCategory)                             // add product category
router.get("/editcategory/:id", getEditCategory)                                   // edit product category
router.put("/updatecategory/:id", updateProductCategory)                        // update product category
router.delete("/deletecategory/:id", deleteProductCategory)                  // delete product category




module.exports = router;  
