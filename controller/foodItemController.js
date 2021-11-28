var express = require('express');
var router = express.Router();
const dbconnect = require('../database/dbconnect');


router.get('/', async function (req, res) {
    const items = await dbconnect.FoodItem.findAll();
    res.send(items);
});

router.post('/new', function(req, res){

    return dbconnect.FoodItem.create({
        name: req.body.name,
        veg: req.body.veg,
        price: req.body.price,
        description: req.body.description,
        rating: req.body.rating,
        url: req.body.url

    }).then(function (article) {
        if (article) {
            res.send(article);
        } else {
            res.status(400).send('Error in inserting new record');
        }
    });
});

module.exports = router;