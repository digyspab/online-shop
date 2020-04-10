const Sequelize = require('sequelize');

const sequelize = new Sequelize('academind', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

