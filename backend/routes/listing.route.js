const router = require('express').Router();
const multer = require('multer');
let Listing = require('../models/listing.model');
let User = require('../models/user.model');


//get all listings of the user
router.route('/:userid/listings').get((req,res) => {
    User.findById(req.params.userid)
        .then(user => res.json(user.listings))
        .catch(err => res.status(400).json('Error here is '+ err));
});

//listing new crop
router.route('/:userid/listings/add').post((req,res) => {
    const crop = req.body.crop;
    const variety = req.body.variety;
    const harvestdate = Date.parse(req.body.harvestdate);
    const quantity = Number(req.body.quantity);
    const price = Number(req.body.price);
    const sellerid = req.params.userid;

    const newListing = new Listing({
        crop: crop,
        variety: variety,
        harvestdate: harvestdate,
        quantity: quantity,
        price: price,
        sellerid: sellerid
    });

    newListing.save()
    .then( () => res.json('Listing added!'))
    .catch( err => res.status(400).json('Error is ' + err));

    const cropid = newListing._id;
    
    User.updateOne({"_id":sellerid}, {
           "$push": { listings: {
                _id :cropid,
                crop: crop,
                variety: variety,
                harvestdate: harvestdate,
                quantity: quantity,
                price: price,
            }}
        }, () => console.log("Updated!"));
    
});

//viewing a particular listing
router.route('/:userid/listings/:id').get((req,res) => {
    Listing.findById(req.params.id)
        .then(listing => res.json(listing))
        .catch(err => res.status(400).json('Error: ' + err));
})

//deleting a listing
router.route('/:userid/listings/delete/:id').delete((req,res) => {
    Listing.findByIdAndDelete(req.params.id)
        .then(() => res.json('Listing deleted!'))
        .catch(() => res.status(400).json('Error: ' + err));
    
    User.updateOne({"_id": req.params.userid},{
        "$pull":{
            "listings": { "_id": req.params.id}
        }
    }, () => console.log("Deleted! "+ req.params.userid + ' '+req.params.id)); 
})

//editing a listing
router.route('/:userid/listings/update/:id').post((req,res) => {
    Listing.findByIdAndUpdate(req.params.id)
        .then(listing => {
            listing._id = req.params.id;
            listing.crop = req.body.crop;
            listing.variety = req.body.variety;
            listing.harvestdate = Date.parse(req.body.harvestdate);
            listing.quantity = Number(req.body.quantity);
            listing.price = Number(req.body.price);
            listing.sellerid = req.params.userid;

            listing.save()
                .then(() => res.json('Listing updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    
    User.update({"_id":req.params.userid},{
        "$set":{
            "listings.$[elem]._id" : req.params.id,
            "listings.$[elem].crop" : req.body.crop,
            "listings.$[elem].variety" : req.body.variety,
            "listings.$[elem].harvestdate" : Date.parse(req.body.harvestdate),
            "listings.$[elem].quantity" : Number(req.body.quantity),
            "listings.$[elem].price" : Number(req.body.price)
        }
    },
    { arrayFilters: [{"elem._id": req.params.id }] });
})

module.exports = router;