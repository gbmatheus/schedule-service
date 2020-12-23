const AutheticationUser = require('../../services/User/AutheticationUserService');

module.exports = {
  async signIn (req, res) {
    const {email, password} = req.body;

    const {user, token} =  await AutheticationUser({email, password});

    return res.status(200).json({user, token});

  }
}