var express = require('express');
var router = express.Router();
const dbconnect = require('../database/dbconnect');
const crypto = require("crypto");

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    return sha256.update(password).digest('base64');
}

router.get('/', function(req, res){
    res.send("Admin");
});

router.post('/new', function(req, res){

    return dbconnect.Admin.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        email: req.body.email,
        password: getHashedPassword(req.body.password),
        user: 0

    }).then(function (article) {
        if (article) {
            res.send(article);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
});

module.exports = router;