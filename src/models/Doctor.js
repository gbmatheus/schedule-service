const { Model, DataTypes } = require('sequelize');

class Doctor extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      crm: DataTypes.STRING,
      birth: DataTypes.STRING
    }, {sequelize})

  }

  static associate (models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id', as: 'user'
    })
  }
}

module.exports = Doctor;