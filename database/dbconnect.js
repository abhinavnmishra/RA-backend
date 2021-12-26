const Sequelize = require('sequelize');
const credentials = require('./dbcredentials');
const models = require('./models');

const connection = new Sequelize(credentials.database, credentials.user, credentials.password, {
    host: credentials.host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const Customer = connection.define("customer", models.customer);
const Admin = connection.define("admin", models.admin);
const FoodItem = connection.define("foodItem", models.foodItem);
const Order = connection.define("order", models.order);
const Constants = connection.define("constants", models.constants);


connection.sync();

module.exports = {connection,Customer,Admin,FoodItem,Order,Constants};