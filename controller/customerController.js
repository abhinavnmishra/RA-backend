var express = require('express');
var router = express.Router();
const dbconnect = require('../database/dbconnect');
const crypto = require("crypto");


const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    return sha256.update(password).digest('base64');
}

router.get('/', async function (req, res) {
    const users = await dbconnect.Customer.findAll();
    res.send(users);
});

router.post('/new', function(req, res){

    return dbconnect.Customer.create({
        id: req.id,
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: getHashedPassword(req.body.password),
        user: 1

    }).then(function (article) {
        if (article) {
            res.send(article);
        } else {
            res.status(400).send('Error in inserting new record');
        }
    });
});


module.exports = router;