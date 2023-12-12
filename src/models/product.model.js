const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     lowercase: true
    // },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    regular_price: {
        type: Number,
    },
    category: {
        type: String,
        // type: mongoose.Types.ObjectId,
        // ref: 'Category'
    },
    stock: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: true
    },
    sold: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: String,
    },
    images: {
        type: Array
    },
    color: {
        type: String,
        enum: ['Black', 'Grown', 'Red']
    },
    ratings: [
        {
            star: { type: Number },
            postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
            comment: { type: String }
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);