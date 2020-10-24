const   mongoose                = require('mongoose');
        passportLocalMongoose   = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    personal : {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },
        dob: {
            type: Date
            // required: true,
        },
        mobile: {
            type: String,
            trim: true,
            required: true,
        },
        address : {
            house: {
                type: String
                // required: true
            },
            district: {
                type: String
                // required: true,
            },
            state: {
                type: String
                // required: true,
            },
            pincode: {
                type: String
                // required: true,
            }
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        _id: {
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
    }],
    orders: [{
        _id: {
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
    }],
    listings: [{
        _id: {
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
    }],
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
module.exports = User;