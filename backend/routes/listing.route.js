const router = require('express').Router();
let Listing = require('../models/listing.model');

//listing new crop
router.route('/add').post((req,res) => {
    const crop = req.body.crop;
    const variety = req.body.variety;
    const harvestdate = Date.parse(req.body.harvestdate);
    const quantity = Number(req.body.quantity);
    const price = Number(req.body.price);
    const sellerid = req.body.sellerid;

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
});

//viewing a particular listing
router.route('/:id').get((req,res) => {
    Listing.findById(req.params.id)
        .then(listing => res.json(listing))
        .catch(err => res.status(400).json('Error: ' + err));
})

//deleting a listing
router.route('/:id').delete((req,res) => {
    Listing.findByIdAndDelete(req.params.id)
        .then(() => res.json('Listing deleted!'))
        .catch(() => res.status(400).json('Error: ' + err));
})

//editing a listing
router.route('/update/:id').post((req,res) => {
    Listing.findByIdAndUpdate(req.params.id)
        .then(listing => {
            listing.crop = req.body.crop;
            listing.variety = req.body.variety;
            listing.harvestdate = Date.parse(req.body.harvestdate);
            listing.quantity = Number(req.body.quantity);
            listing.price = Number(req.body.price);
            listing.sellerid = req.body.sellerid;

            listing.save()
                .then(() => res.json('Listing updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;