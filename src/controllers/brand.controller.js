const Brand = require('../models/brand.model')
const asyncHandler = require('express-async-handler');
const { sendResponse } = require('../utils/sendResponse');


const createBrand = asyncHandler(async (req, res) => {
    const brand = new Brand(req.body);
    const savedBrand = await brand.save();
    sendResponse(res, 201, 'Brand created successfully', savedBrand);
})

const getAllBrand = asyncHandler(async (req, res) => {
    const brands = await Brand.find();
    sendResponse(res, 200, 'Categories retrieved successfully', brands);
})
const getBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.brandId);
    if (!brand) {
        sendResponse(res, 404, 'Brand not found', null);
    } else {
        sendResponse(res, 200, 'Brand retrieved successfully', brand);
    }
})
const updateBrand = asyncHandler(async (req, res) => {
    const updatedBrand = await Brand.findByIdAndUpdate(
        req.params.brandId,
        req.body,
        { new: true }
    );
    if (!updatedBrand) {
        sendResponse(res, 404, 'Brand not found', null);
    } else {
        sendResponse(res, 200, 'Brand updated successfully', updatedBrand);
    }
})
const deleteBrand = asyncHandler(async (req, res) => {
    const deletedBrand = await Brand.findByIdAndRemove(req.params.brandId);
    if (!deletedBrand) {
        sendResponse(res, 404, 'Brand not found', null);
    } else {
        sendResponse(res, 200, 'Brand deleted successfully', deletedBrand);
    }
})

module.exports = {
    createBrand,
    getAllBrand,
    getBrand,
    updateBrand,
    deleteBrand
}