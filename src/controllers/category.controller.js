const Category = require('../models/category.model')
const asyncHandler = require('express-async-handler');
const { sendResponse } = require('../utils/sendResponse');


const createCategory = asyncHandler(async (req, res) => {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    sendResponse(res, 201, 'Category created successfully', savedCategory);
})

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    sendResponse(res, 200, 'Categories retrieved successfully', categories);
})
const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
        sendResponse(res, 404, 'Category not found', null);
    } else {
        sendResponse(res, 200, 'Category retrieved successfully', category);
    }
})
const updateCategory = asyncHandler(async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        { new: true }
    );
    if (!updatedCategory) {
        sendResponse(res, 404, 'Category not found', null);
    } else {
        sendResponse(res, 200, 'Category updated successfully', updatedCategory);
    }
})
const deleteCategory = asyncHandler(async (req, res) => {
    const deletedCategory = await Category.findByIdAndRemove(req.params.categoryId);
    if (!deletedCategory) {
        sendResponse(res, 404, 'Category not found', null);
    } else {
        sendResponse(res, 200, 'Category deleted successfully', deletedCategory);
    }
})

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}