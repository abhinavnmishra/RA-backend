const Sequelize = require('sequelize');
const credentials = require('./dbcredentials');
const models = require('./models');

const connection = new Sequelize(credentials.database, credentials.user, credentials.password, {
    host: credentials.host,
    dialect: 'postgres'
});

const Customer = connection.define("customer", models.customer);
const Admin = connection.define("admin", models.admin);

connection.sync();

module.exports = {connection,Customer,Admin};