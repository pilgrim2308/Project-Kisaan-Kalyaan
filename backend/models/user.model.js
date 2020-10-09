const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

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
            type: Date,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            minlength: 5,
            maxlength: 255,
        },
        password: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255
        },
        mobile: {
            type: String,
            trim: true,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    cart: [{
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
    }],
    orders: [{
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
        buyerid: {
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
});

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'));
    return token;
}

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;