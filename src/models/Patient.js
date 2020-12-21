const { Model, DataTypes } = require('sequelize');

class Patient extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      birth: DataTypes.STRING,
      genre: DataTypes.STRING,
    },{sequelize});
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  }

}

module.exports = Patient;