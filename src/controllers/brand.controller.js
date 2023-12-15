const Brand = require('../models/brand.model')
const asyncHandler = require('express-async-handler')


const createBrand = asyncHandler(async (req, res) => {
    const response = await Brand.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Can not create new Brand"
    })
})
const getBrands = asyncHandler(async (req, res) => {
    const response = await Brand.find()
    return res.status(200).json(
        // success: response ? true : false,
        response ? response : "Can not get brands list"
    )
})
const updateBrand = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const response = await Brand.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json(
        // success: response ? true : false,
        response ? response : "Can not get brands list"
    )
})
const deleteBrand = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const response = await Brand.findByIdAndDelete(pid)
    return res.status(200).json({
        success: response ? true : false,
        mess: response ? 'deleted' : 'can not delete Brand'
    })
})

module.exports = {
    createBrand,
    getBrands,
    updateBrand,
    deleteBrand
}