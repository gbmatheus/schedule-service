const {Sequelize} = require('sequelize');

const dbConfig = require('../config/database');

const PatientModel = require('../models/Patient');
const UserModel = require('../models/User');

const sequelize = new Sequelize(dbConfig);

UserModel.init(sequelize);
PatientModel.init(sequelize);
PatientModel.associate(sequelize.models);

// Testing the connection
// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// 
// }catch(error) {
//   console.error('Unable to connect to the database.');
// 
// }

module.exports = sequelize;

