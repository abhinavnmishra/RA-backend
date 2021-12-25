var express = require('express');
var router = express.Router();
const dbconnect = require('../database/dbconnect');


router.get('/', async function (req, res) {
    const orders = await dbconnect.Order.findAll();
    res.send(orders);
});

router.get('/getById', async function (req, res) {
    const order = await dbconnect.Order.findByPk(req.query.id);
    res.send(order);
});

router.post('/new', function(req, res){

    let total = 0.0;
    let items = req.body.foodItem;

    items.forEach(calculate);

    async function calculate(value, index, array) {
        const food = await dbconnect.FoodItem.findByPk(value.id);
        total = total + food.price * value.quantity;
    }

    return dbconnect.Order.create({
        foodItem: req.body.foodItem,
        customerId: req.body.customerId,
        totalPrice: total

    }).then(function (article) {
        if (article) {
            res.send(article);
        } else {
            res.status(400).send('Error in inserting new record');
        }
    });
});

async function query(sql, params){
    return null;
}

module.exports = router;