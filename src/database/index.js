const {Sequelize} = require('sequelize');

const dbConfig = require('../config/database');

const PatientModel = require('../models/Patient');
const UserModel = require('../models/User');
const DoctorModel = require('../models/Doctor');

const sequelize = new Sequelize(dbConfig);

UserModel.init(sequelize);
PatientModel.init(sequelize);
PatientModel.associate(sequelize.models);
DoctorModel.init(sequelize);
DoctorModel.associate(sequelize.models);

module.exports = sequelize;

