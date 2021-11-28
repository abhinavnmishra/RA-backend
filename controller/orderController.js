var express = require('express');
var router = express.Router();
const dbconnect = require('../database/dbconnect');


router.get('/', async function (req, res) {
    const orders = await dbconnect.Order.findAll();
    res.send(orders);
});

router.post('/new', function(req, res){

    return dbconnect.Order.create({
        foodItemId: req.body.foodItemId,
        customerId: req.body.customerId,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice

    }).then(function (article) {
        if (article) {
            res.send(article);
        } else {
            res.status(400).send('Error in inserting new record');
        }
    });
});

module.exports = router;