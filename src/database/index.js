const {Sequelize} = require('sequelize');

const dbConfig = require('../config/database');
<<<<<<< HEAD

const PatientModel = require('../models/Patient');
const UserModel = require('../models/User');
const DoctorModel = require('../models/Doctor');

const sequelize = new Sequelize(dbConfig);

UserModel.init(sequelize);
PatientModel.init(sequelize);
PatientModel.associate(sequelize.models);

DoctorModel.init(sequelize);
DoctorModel.associate(sequelize.models);
=======

const sequelize = new Sequelize(dbConfig);

>>>>>>> 13316ee81264c64f55acc5ef2109c27d9bc9312e
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

