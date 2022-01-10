const crypto = require('crypto');
var express = require('express');
var router = express.Router();
const dbconnect = require('../database/dbconnect');
const Sequelize = require('sequelize');
const {use} = require("express/lib/router");

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    return sha256.update(password).digest('base64');
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

/*const getUser = (username) => {

    let query = 'select a.id, a.email email, a.mobile mobile, a.password, a.user from admins a union all select c.id, c.email email, c.mobile mobile, c.password, c.user from customers c where email = :username or mobile = :username;';

    return dbconnect.connection.query(query, {
        replacements: {username: username},
        type: Sequelize.QueryTypes.SELECT
    }).then(function (result) {
        console.log("###############")
        console.log(result);
        return result[0];
    });
}

const sql = (query, params, type) => {

    return dbconnect.connection.query(query, {
        replacements: params,
        type: type
    });
}*/

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    let querySelect = 'select a.id, a.email email, a.mobile mobile, a.password, a.user, a.token from admins a where email = :username or mobile = :username union all select c.id, c.email email, c.mobile mobile, c.password, c.user, c.token from customers c where email = :username or mobile = :username;';

    return dbconnect.connection.query(querySelect, {
        replacements: {username: username},
        type: Sequelize.QueryTypes.SELECT
    }).then(function (result) {

        console.log(result);
        let user = result[0];
        if (user) {

            console.log(user);
            let query;
            if (user.password === hashedPassword){
                const authToken = generateAuthToken();
                if (user.user === 0){
                    query = "Update admins set token = :authToken where id = :id ";
                }
                else {
                    query = "Update customers set token = :authToken where id = :id ";
                }
                dbconnect.connection.query(query, {
                    replacements: {authToken: authToken, id: user.id},
                    type: Sequelize.QueryTypes.UPDATE
                }).then(function (result2) {
                    console.log("###################");
                    console.log(result2[1]);

                    if (result2[1] === 1){
                        return dbconnect.connection.query(querySelect, {
                            replacements: {username: username},
                            type: Sequelize.QueryTypes.SELECT
                        }).then(function (result3) {
                            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                            res.append('Access-Control-Allow-Headers', 'Content-Type');
                            res.status(200).send({message: true, token: result3[0].token});
                        });
                    }
                    else {
                        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        res.append('Access-Control-Allow-Headers', 'Content-Type');
                        res.status(200).send({
                            message: 'Error logging in',
                            messageClass: 'alert-danger'
                        });
                    }

                    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    res.append('Access-Control-Allow-Headers', 'Content-Type');
                    res.status(200).send(result2);
                });
            }
            else {
                res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                res.append('Access-Control-Allow-Headers', 'Content-Type');
                res.status(200).send({
                    message: 'Error logging in',
                    messageClass: 'alert-danger'
                });
            }

        } else {
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.append('Access-Control-Allow-Headers', 'Content-Type');
            res.status(200).send({
                message: 'Error logging in',
                messageClass: 'alert-danger'
            });
        }

    });
});

router.post('/logout', (req, res) => {

    let querySelect = 'select a.id, a.email email, a.mobile mobile, a.password, a.user, a.token from admins a where token = :token union all select c.id, c.email email, c.mobile mobile, c.password, c.user, c.token from customers c where token = :token;';

    return dbconnect.connection.query(querySelect, {
        replacements: {token: req.body.token},
        type: Sequelize.QueryTypes.SELECT
    }).then(function (result) {

        console.log(result);
        let user = result[0];

        if (user) {
            let query = "";
            if (user.user === 0){
                query = "Update admins set token = null where id = :id ";
            }
            else {
                query = "Update customers set token = null where id = :id ";
            }
            dbconnect.connection.query(query, {
                replacements: {id: user.id},
                type: Sequelize.QueryTypes.UPDATE
            }).then(function (result2) {
                res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                res.append('Access-Control-Allow-Headers', 'Content-Type');
                res.status(200).send(true);
            });

        } else {
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.append('Access-Control-Allow-Headers', 'Content-Type');
            res.status(200).send({
                message: 'Invalid token',
                messageClass: 'alert-danger'
            });
        }

    });
});

module.exports = router;
