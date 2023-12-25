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

    const product = await Product.findOne({ slug });

    if (!product) {
        return sendResponse(res, 404, 'Product not found', null);
    }

    sendResponse(res, 200, 'Product retrieved successfully', product);
})
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search, brand, minPrice, maxPrice, categories, inStock, sortBy, sortOrder } = req.query;

    // Build the filter object
    const filter = {};
    if (search) {
        filter.name = { $regex: search, $options: 'i' };
    }
    if (brand) {
        filter.brand = brand;
    }
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (categories) {
        filter.category = { $in: categories.split(',') };
    }
    if (inStock === 'true') {
        filter.stock = { $gt: 0 };
    }

    // Build the sort object
    const sort = {};
    if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // Execute the query with pagination, filtering, and sorting
    const products = await Product.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();

    // Count the total number of products matching the filter
    const totalProducts = await Product.countDocuments(filter).exec();

    sendResponse(res, 200, 'Products retrieved successfully', {
        products,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts
    });
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
    deleteProduct
}