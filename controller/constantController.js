var express = require('express');
var router = express.Router();
const dbconnect = require('../database/dbconnect');

router.get('/', async function (req, res) {
    const constants = await dbconnect.Constants.findAll();
    res.send(constants);
});

router.get('/getByKey', async function (req, res) {
    dbconnect.Customer.findAll({
        where: {
            key: req.query.key
        }
    }).then(function (constants){
        if (constants.length!==0){
            res.status(200).send(constants[0]);
        }
        else {
            res.status(400).send(false);
        }
    });
});

router.post('/new', function(req, res){

    return dbconnect.Constants.create({
        key: req.body.key,
        value: req.body.value

    }).then(function (article) {
        if (article) {
            res.send(article);
        } else {
            res.status(400).send('Error in inserting new record');
        }
    });
});

router.post('/update', function(req, res){

    return dbconnect.Constants.update({
        key: req.body.key,
        value: req.body.value,
    },{
        where: {
            key: req.body.key
        }
    }).then(function (constant) {
        if (constant) {
            res.send(constant);
        } else {
            res.status(400).send('Error in inserting new record');
        }
    });
});

module.exports = router;