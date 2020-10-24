// const auth = require('../middleware/auth');
// const bcrypt = require('bcrypt');
// const { User, validate } = require("../models/user.model");
// const express = require('express');
// const router = express.Router();

// router.get('/current', auth, async (req,res) => {
//     const user = await User.findById(req.user._id).select("-password");
//     res.send(user);
// });

// router.post('/', async(req,res) => {
//     //validating request body
//     const { error } = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     //find an existing User
//     let user = await User.findOne({ personal: { email: req.body.email}});
//     if(user) return res.status(400).send("User already registered.");

//     user = new User({
//         personal: {
//             firstname: req.body.firstname,
//             lastname: req.body.lastname,
//             password: req.body.password,
//             email: req.body.email,
//             dob: Date.parse(req.body.dob),
//             mobile: req.body.mobile,
//             address: {
//                 house: req.body.house,
//                 district: req.body.district,
//                 state: req.body.state,
//                 pincode: req.body.pincode,
//             }
//         },
//     });

//     user.personal.password = await bcrypt.hash(user.personal.password,10);
//     await user.save();

//     const token = user.generateAuthToken();
//     res.header("x-auth-token", token).send({
//         _id: user._id,
//         personal: {
//             firstname: user.firstname,
//             lastname: user.lastname,
//             email: user.email,
//         }
//     });
// });

// module.exports = router;