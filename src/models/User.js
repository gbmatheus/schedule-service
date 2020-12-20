const { Model, DataTypes, Sequelize } = require('sequelize');

class User extends Model {
  static init (connection) {
    super.init ({
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull:  false,
      },
    }, {sequelize:connection});
  }
}

module.exports = User;