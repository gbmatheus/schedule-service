const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const User = require('../../models/User');

async function AutheticationUser ({email, password}) {

  const user = await User.findOne({ where: { email }});

  if(!user) {
    throw new Error({ error: 'Email or password incorrect'});
  }

  const passwordMatched = compare(password, user.password);

  if(!passwordMatched) {
    throw new Error({ error: 'Email or password incorrect'});
  }

  const {secret, expiresIn} = authConfig.jwt; 

  const token = sign({ id: user.id, email: user.email },
    secret, 
    { subject: String(user.id), expiresIn: expiresIn}
  )

  delete user.password;

  return {user, token};

}

module.exports = AutheticationUser;