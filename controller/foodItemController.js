var express = require('express');
var router = express.Router();
const dbconnect = require('../database/dbconnect');


router.get('/', async function (req, res) {
    dbconnect.Customer.findAll({
        where: {
            token: req.query.token
        }
    }).then(async function (customer) {
        if (customer.length !== 0) {
            const items = await dbconnect.FoodItem.findAll();
            res.status(200).send(items);
        } else {
            res.status(400).send(false);
        }
    });

});

router.post('/new', function(req, res){

    return dbconnect.FoodItem.create({
        name: req.body.name,
        type: req.body.type,
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