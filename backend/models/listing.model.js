const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    cropid: {
        type: String,
        required: true,
        trim: true,
    },
    crop: {
        type: String,
        required: true,
    },
    variety: {
        type: String,
        required: true,
    },
    harvestdate: {
        type: Date,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sellerid: {
        type: String,
        required: true,
    },
    buyerid: {
        type: String,
        required: true,
        default: null,
    },
    payment: {
        mode: {
        type: String,
        required: true,
        },
        ispaid: {
            type: Boolean,
            default: false,
        },
    },
    status: {
        type: String,
        required: true,
    }
});

const Listing = mongoose.model('Listing',listingSchema);

module.exports = Listing;