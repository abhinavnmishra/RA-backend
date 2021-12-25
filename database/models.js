const Sequelize = require('sequelize');

module.exports = {

    customer : {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
            },
        name: {
            type: Sequelize.STRING,
        },
        mobile: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        user: {
            type: Sequelize.INTEGER,
        },
        token: {
            type: Sequelize.STRING,
        }
    },

    admin : {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
        },
        lastName: {
            type: Sequelize.STRING,
        },
        mobile: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        user: {
            type: Sequelize.INTEGER,
        },
        token: {
            type: Sequelize.STRING,
        }
    },

    foodItem : {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
        },
        veg: {
            type: Sequelize.BOOLEAN,
        },
        price: {
            type: Sequelize.FLOAT,
        },
        description: {
            type: Sequelize.TEXT,
        },
        rating: {
            type: Sequelize.INTEGER,
        },
        url: {
            type: Sequelize.TEXT,
        }
    },

    order : {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        foodItem: {
            type: Sequelize.JSON,
        },
        customerId: {
            type: Sequelize.INTEGER,
        },
        totalPrice: {
            type: Sequelize.FLOAT,
        }
    }
}
