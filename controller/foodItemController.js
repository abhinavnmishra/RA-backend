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

    console.log(user);
    if (user != null) {
        const items = await dbconnect.FoodItem.findAll();
        res.status(200).send(items);
    } else {
        res.status(400).send(false);
    }
});

router.get('/getById', async function (req, res) {
    let user = await validate(req);
    if (user != null){
        const order = await dbconnect.FoodItem.findByPk(req.query.id);
        res.send(order);
    }
    else{
        res.status(400).send(false);
    }
});

router.get('/delete', async function (req, res) {
    let user = await validate(req);
    if (user != null){
        const order = await dbconnect.FoodItem.delete(req.query.id);
        res.send(order);
    }
    else{
        res.status(400).send(false);
    }
});

router.post('/update', async function(req, res){

    let user = await validate(req);

    if (user != null) {
        return dbconnect.FoodItem.update({
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            description: req.body.description,
            rating: req.body.rating,
            url: req.body.url
        },{
            where: {
                id: req.query.id
            }
        }).then(function (food) {
            if (food) {
                res.status(200).send(food);
            } else {
                res.status(400).send('Error in inserting new record');
            }
        });
    } else {
        res.status(400).send(false);
    }

});

router.post('/new', async function(req, res){

    let user = await validate(req);

    if (user != null) {
        return dbconnect.FoodItem.create({
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            description: req.body.description,
            rating: req.body.rating,
            url: req.body.url

        }).then(function (article) {
            if (article) {
                res.status(200).send(article);
            } else {
                res.status(400).send('Error in inserting new record');
            }
        });
    } else {
        res.status(400).send(false);
    }
});

module.exports = router;