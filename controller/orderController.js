var express = require('express');
var router = express.Router();
const dbconnect = require('../database/dbconnect');
const Sequelize = require("sequelize");


async function validate(req){
    if (Object.keys(req.query).length === 0)
        return 1;
    const token = req.query.token;
    let querySelect = 'select a.id, a.email email, a.mobile mobile, a.password, a.user, a.token from admins a where token = :token union all select c.id, c.email email, c.mobile mobile, c.password, c.user, c.token from customers c where token = :token;';

    let result = await dbconnect.connection.query(querySelect, {
        replacements: {token: token},
        type: Sequelize.QueryTypes.SELECT
    });
    if (result.length === 0){
        return null;
    }
    else
        return result[0];
}

router.get('/', async function (req, res) {

    let user = await validate(req);
    if (user != null){
        const orders = await dbconnect.Order.findAll({
            where: {customerId: user.id}
        });
        res.send(orders);
    }
    else{
        res.status(400).send(false);
    }
});

router.get('/getById', async function (req, res) {
    let user = await validate(req);
    if (user != null){
        const order = await dbconnect.Order.findByPk(req.query.id);
        res.send(order);
    }
    else{
        res.status(400).send(false);
    }
});


router.post('/new', async function(req, res){

    let user = await validate(req);
    return dbconnect.Order.create({
        foodItem: req.body.foodItem,
        customerId: user.id,
        totalPrice: req.body.price

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