const Category = require('../models/category.model')
const asyncHandler = require('express-async-handler')


const createCategory = asyncHandler(async (req, res) => {
    const response = await Category.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Can not create new category"
    })
})
const getCategories = asyncHandler(async (req, res) => {
    const response = await Category.find().select('name _id')
    return res.status(200).json(
        // success: response ? true : false,
        response ? response : "Can not get categories list"
    )
})
const updateCategory = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const response = await Category.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json(
        // success: response ? true : false,
        response ? response : "Can not get categories list"
    )
})
const deleteCategory = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const response = await Category.findByIdAndDelete(pid)
    return res.status(200).json({
        success: response ? true : false,
        mess: response ? 'deleted' : 'can not delete category'
    })
})

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}