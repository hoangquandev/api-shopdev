const Product = require('../models/product.model')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const { sendResponse } = require('../utils/sendResponse');

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    sendResponse(res, 201, 'Product created successfully', savedProduct);
})
const getProduct = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const product = await Product.findOne({ slug }).populate('category', 'name');

    if (!product) {
        return sendResponse(res, 404, 'Product not found', null);
    }

    sendResponse(res, 200, 'Product retrieved successfully', product);
})
const ratingProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const { rating, comment } = req.body;
    const userId = req.user.id; // Assuming you have user authentication middleware

    // Check if the user has a delivered order
    const hasDeliveredOrder = await Order.exists({
        customer: userId,
        orderStatus: 'Delivered',
    });

    if (!hasDeliveredOrder) {
        return sendResponse(res, 403, null, 'You can only rate products after a delivered order.');
    }
    // Validate rating value
    if (rating < 1 || rating > 5) {
        return sendResponse(res, 400, null, 'Invalid rating value. Must be between 1 and 5.');
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
        return sendResponse(res, 404, null, 'Product not found.');
    }

    // Check if the user has already rated the product
    const existingRating = product.ratings.find((r) => r.userId.toString() === userId);
    if (existingRating) {
        return sendResponse(res, 400, null, 'You have already rated this product.');
    }

    // Add the new rating
    product.ratings.push({
        userId,
        rating,
        comment,
    });

    // Recalculate the average rating (optional)
    // product.averageRating = calculateAverageRating(product.ratings);

    // Save the updated product
    await product.save();

    sendResponse(res, 200, 'Rating added successfully.');
})
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        minPrice,
        maxPrice,
        inStock,
        sortBy,
        sortOrder,
        rating,
        category,
        brand
    } = req.query;

    // Build the filter object based on the provided parameters
    const filter = {};

    if (minPrice !== undefined && maxPrice !== undefined) {
        filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice !== undefined) {
        filter.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice !== undefined) {
        filter.price = { $lte: parseFloat(maxPrice) };
    }

    if (inStock !== undefined) {
        filter.inStock = inStock === 'true'; // Convert string to boolean
    }
    const categoryIds = category ? category.split(',') : [];
    if (categoryIds.length > 0) {
        filter.category = { $in: categoryIds };
    }

    if (brand) {
        filter.brand = brand;
    }

    if (rating !== undefined) {
        // Handle products with and without ratings
        filter.$or = [
            { 'ratings.rating': { $exists: false } }, // Products without ratings
            { 'ratings.rating': { $gte: parseFloat(rating) } }, // Products with ratings
        ];
    }

    // Fetch products based on the filter and populate the category details
    let query = Product.find(filter).populate('brand', 'name').populate('category', 'name');

    // Sorting
    if (sortBy) {
        let sortOption = {};

        // Xác định trường và thứ tự sắp xếp
        if (sortBy === 'createdAt') {
            sortOption = { createdAt: sortOrder === 'desc' ? -1 : 1 };
        } else if (sortBy === 'price') {
            sortOption = { price: sortOrder === 'desc' ? -1 : 1 };
        }

        query = query.sort(sortOption);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalProducts = await Product.countDocuments(filter);
    const products = await query.skip(startIndex).limit(limit);

    // Construct the response object with pagination details
    const response = {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        products,
    };

    sendResponse(res, 200, "All products with fillter", response);
})
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
    );

    if (!updatedProduct) {
        return sendResponse(res, 404, 'Product not found', null);
    }

    sendResponse(res, 200, 'Product updated successfully', updatedProduct);
})
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        return sendResponse(res, 404, 'Product not found', null);
    }

    sendResponse(res, 200, 'Product deleted successfully', deletedProduct);
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratingProduct
}