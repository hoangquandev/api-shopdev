// models/Product.js

const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
    },
    published: {
        type: Boolean,
        default: false,
    },
    sold: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    thumbnail: {
        type: String,
    },
    images: [
        {
            type: String,
        },
    ],
    ratings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
            },
            comment: {
                type: String,
            },
        },
    ],
    slug: {
        type: String,
        unique: true,
    },
    // You can add more fields based on your specific product requirements
});

// Pre-save middleware to generate and set the slug
productSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true });
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
