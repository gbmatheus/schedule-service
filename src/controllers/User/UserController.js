const sequelize = require('../../database');

const User = require('../../models/User');
const UserCreate = require('../../services/User/CreateUserService');

module.exports = {
  async index (req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store (req, res) {
    const { username, email, password } = req.body;

    const t = await sequelize.transaction();
    try {
      
      const user = await UserCreate({username, email, password}, {transaction: t});

      t.commit()
      return res.status(201).json(user);
    } catch (err) {
      t.rollback();
      return res.status(500).json({error: err.message});
    }

  },

  async show (req, res) {

  },

  async update (req, res) {

  },

  async delete (req, res) {

  }

}