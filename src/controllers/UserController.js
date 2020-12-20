const User = require('../models/User');

module.exports = {
  async index (req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store (req, res) {
    const { username, email, password } = req.body;

    const user = await User.create({
      username, email, password
    })

    return res.json(user);

  },

  async show (req, res) {

  },

  async update (req, res) {

  },

  async delete (req, res) {

  }

}