const productModel = require('../models/productModel')
const userModel = require('../models/userModel')


// create new Product
// @route POST /api/product/addproduct
module.exports.createProduct = async (req, res) => {
    try {

        const { name, description, price } = req.body
        const product = new productModel({
            name: name,
            price: +price,
            description: description,
        })
        const createProduct = await product.save();
        res.status(201).json({ created: true, prodID: createProduct._id, msg: "Product Added Successfully" })

    } catch (error) {
        console.error(error)
    }
}

// get All Product
// @route GET /api/product/getproducts
module.exports.getAllProducts = async (req, res) => {
    try {

        const allProducts = await productModel.find()
        res.status(200).json({ products: allProducts })

    } catch (error) {
        console.error(error)
    }
}

// get singleProduct
// @route GET /api/product/:id
module.exports.getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)

        if (product) res.status(200).json(product)
        else res.status(404).json({ status: false, msg: "Product Not Found" })

    } catch (error) {
        console.log(error)
    }
}

// update Product
// @route PUT => /api/product/updateproduct/:id
module.exports.updateProduct = async (req, res) => {
    try {
        console.log(req.params.id);
        const { name, description, price, stockcount } = req.body
        const product = await productModel.findById(req.params.id)
    
        if (product) {
            product.name = name,
            product.description = description,
            product.price = price,
            product.stockCount = stockcount

            const updatedProduct = await product.save()
            res.status(200).json(updatedProduct)
        } else {

            res.status(404).json({ status: false, msg: "update failed" })

        }

    } catch (error) {

        console.log(error)
    }
}

// delete Product
// @route DELETE => /api/product/deleteproduct/:id
module.exports.deleteProduct = async (req, res) => {
    try {
       
        const product = await productModel.findById(req.params.id)
    
        if (product) {
            await product.remove()
            res.status(200).json({delete: true, msg: "Product Deleted Successfully"})
        } else {
            res.status(404).json({ delete: false, msg: "delete failed" })
        }
    } catch (error) {
        console.log(error)
    }
}


// create product review
// @route POST => /api/product/review/:id
module.exports.createProductReview = async (req, res) => {
    try {
        const {rating, comment} = req.body
        const product = await productModel.findById(req.params.id)
        if (product) {
            const isAlreadyReviewed = product.reviews.find( review => review.user.toString() === req.user.toString()) 

            if (isAlreadyReviewed) {
                return res.status(404).json({msg : "user is already reviewed"})
            } 
            const user = await userModel.findById(req.user,{password:0})

            const review = {
                name : user.name,
                user : req.user,
                rating : Number(rating),
                comment: comment
            }
            product.reviews.push(review)
            product.reviewsCount = product.reviews.length
            product.rating = product.reviews.reduce((accumulator, item) => item.rating + accumulator,0) / product.reviews.length
            await product.save()
            res.status(201).json({msg: "Review added successfully"})
        } else {
            res.status(404).json({msg: "product not found"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal server error"})
    }    
}

// get all reviews of a product
// @route GET => /api/product/reviews/:id
module.exports.getAllReviews = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        if (!product) return res.status(404).json({msg: "product not found"})

        res.status(200).json({reviewsCount: product.reviewsCount, reviews: product.reviews})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal server error"})
    }
}


// delete review
// @route DELETE => /api/product/deletereview/:id
module.exports.deleteReview = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)

        if (!product) return res.status(404).json({msg: "product not found"})

        const reviews = product.reviews.filter(review => review.user.toString() !== req.user.toString());
        console.log(reviews)
        const rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
        const reviewsCount = reviews.length
        const updatedProd = await productModel.findByIdAndUpdate(req.params.id, {
            reviews,
            rating,
            reviewsCount
        }, {new: true, useFindAndModify: false})

        res.status(200).json({deleted: true, msg: "review deleted successfull", reviews: updatedProd.reviews})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : "Internal server error"})
    }
}


// add to wishlist
// @route POST => /api/product/addwishlist
module.exports.addToWishlist = async (req, res) => {
    try {
        
        
    } catch (error) {
        console.error(error)
    }
}