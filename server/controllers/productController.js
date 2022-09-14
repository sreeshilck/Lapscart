const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const categoryModel = require('../models/categoryModel')



// create new Product
// @route POST /api/product/addproduct
module.exports.createProduct = async (req, res) => {
    try {

        const { name, brand, description, price, stock, category } = req.body
        const categoryData = await categoryModel.findOne({ category: category })
        let images = []
        req.files.forEach(element => {
            images.push(element.filename)
        });

        const product = new productModel({
            name: name,
            brand: brand,
            price: +price,
            stockCount: +stock,
            category: categoryData.id,
            description: description,
            images: images
        })
        const createProduct = await product.save();
        res.status(201).json({ created: true, prodID: createProduct._id, msg: "Product Added Successfully" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ created : false, msg: "Internal server error" })
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
        res.status(500).json({ deleted: false, msg: "Internal server error" })
    }
}

// get singleProduct
// @route GET /api/product/findproduct/:id
module.exports.getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)

        if (product) res.status(200).json(product)
        else res.status(404).json({ status: false, msg: "Product Not Found" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: false, msg: "Internal Server Error" })
    }
}

// update Product
// @route PUT => /api/product/updateproduct/:id
module.exports.updateProduct = async (req, res) => {
    try {

        const { name, brand, description, price, stockcount, category } = req.body
        const product = await productModel.findById(req.params.id)
        console.log(product.images);
        let images = []
        if (req.files) {
            req.files.forEach(element => {
                images.push(element.filename)
            });
        }
        const categoryData = await categoryModel.findOne({ category: category })

        if (product) {
            product.name = name,
                product.brand = brand,
                product.description = description,
                product.price = price,
                product.stockCount = stockcount,
                product.category = categoryData.id
            product.images = images.length > 0 ? images : product.images

            const updatedProduct = await product.save()
            res.status(200).json(updatedProduct)

        } else {
            res.status(404).json({ status: false, msg: "update failed" })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ deleted: false, msg: "Internal server error" })
    }
}

// delete Product
// @route DELETE => /api/product/deleteproduct/:id
module.exports.deleteProduct = async (req, res) => {
    try {

        const product = await productModel.findById(req.params.id)

        if (product) {
            await product.remove()
            res.status(200).json({ delete: true, msg: "Product Deleted Successfully" })
        } else {
            res.status(404).json({ delete: false, msg: "delete failed" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ deleted: false, msg: "Internal server error" })
    }
}


// create product review
// @route POST => /api/product/review/:id
module.exports.createProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body
        const product = await productModel.findById(req.params.id)
        if (!product) {
            // return if product not found
            return res.status(404).json({ added: false, msg: "product not found" })

        } else {

            // get review
            const isAlreadyReviewed = product.reviews.find(review => review.user.toString() === req.user.toString())
            // return if already reviewed
            if (isAlreadyReviewed) {
                return res.status(404).json({ added: false, msg: "user is already reviewed" })
            }

            const user = await userModel.findById(req.user, { password: 0 })
            const review = {
                name: user.name,
                user: req.user,
                rating: Number(rating),
                comment: comment
            }
            product.reviews.push(review)
            product.reviewsCount = product.reviews.length
            product.rating = product.reviews.reduce((accumulator, item) => item.rating + accumulator, 0) / product.reviews.length
            await product.save()
            res.status(201).json({added: true, msg: "Review added successfully" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" })
    }
}

// get all reviews of a product
// @route GET => /api/product/reviews/:id
module.exports.getAllReviews = async (req, res) => {
    try {
        // get product data
        const product = await productModel.findById(req.params.id)
        // return if product not found
        if (!product) return res.status(404).json({ msg: "product not found" })

        res.status(200).json({ reviewsCount: product.reviewsCount, reviews: product.reviews })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" })
    }
}


// delete review
// @route DELETE => /api/product/deletereview/:id
module.exports.deleteReview = async (req, res) => {
    try {
        // get product data
        const product = await productModel.findById(req.params.id)
        // return if product not found
        if (!product) return res.status(404).json({ msg: "product not found" })
        // get reviews 
        const reviews = product.reviews.filter(review => review.user.toString() !== req.user.toString());

        const rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
        const reviewsCount = reviews.length
        const updatedProd = await productModel.findByIdAndUpdate(req.params.id, {
            reviews,
            rating,
            reviewsCount
        }, { new: true, useFindAndModify: false })

        res.status(200).json({ deleted: true, msg: "review deleted successfull", reviews: updatedProd.reviews })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" })
    }
}


// get all product category
// @route GET => /api/product/getcategory
module.exports.getAllCategory = async (req, res) => {
    try {

        const allCategory = await categoryModel.find()
        res.status(200).json({ status: true, category: allCategory })
    } catch (error) {
        console.error(error)
        res.status(500).json({ created: false, msg: "Internal Server Error" })
    }
}

// add product category
// @route POST => /api/product/addcategory
module.exports.addProductCategory = async (req, res) => {
    try {
        await categoryModel.create(req.body)
        res.status(201).json({ created: true, msg: "category added successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ created: false, msg: "Internal Server Error" })
    }
}

// get edit category
// @route GET => /api/product/editcategory/:id
module.exports.getEditCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const category = await categoryModel.findById(categoryId)
        if (!category) return res.status(400).json({ status: false, msg: "category not found" })
        res.status(200).json({ status: true, category: category })
    } catch (error) {
        console.error(error)
        res.status(500).json({ deleted: false, msg: "Internal server error" })
    }
}


// update product category
// @route PUT => /api/product/updatecategory/:id
module.exports.updateProductCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const updated = await categoryModel.findByIdAndUpdate({ _id: categoryId }, { category: req.body.category })
        if (!updated) return res.status(400).json({ updated: false, msg: "updation failed" })
        const allCategory = await categoryModel.find()
        res.status(200).json({ updated: true, msg: "Category updated successfully", category: allCategory })
    } catch (error) {
        console.error(error)
        res.status(500).json({ updated: false, msg: "Internal Server Error" })
    }
}

// delete product category
// @route DELETE => /api/product/deletecategory/:id
module.exports.deleteProductCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        await categoryModel.findByIdAndDelete(categoryId)
        const allCategory = await categoryModel.find()
        res.status(200).json({ deleted: true, msg: "Category deleted successfully", category: allCategory })
    } catch (error) {
        console.error(error)
        res.status(500).json({ deleted: false, msg: "Internal server error" })
    }
}


