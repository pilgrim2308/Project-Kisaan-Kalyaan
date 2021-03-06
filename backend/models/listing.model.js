const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
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
        default: null,
    },
    payment: {
        mode: {
        type: String,
        default: "Cash On Delivery",
        },
        ispaid: {
            type: Boolean,
            default: false,
        },
    },
    status: {
        type: String,
        default: "Available",
    }
});

const Listing = mongoose.model('Listing',listingSchema);

module.exports = Listing;