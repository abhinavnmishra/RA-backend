const Sequelize = require('sequelize');

module.exports = {

    customer : {
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
        address: {
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
    }

}
