const bcrypt = require('bcryptjs');

const User = require('../../models/User');

async function UserCreate ({username, email, password}, {transaction}) {
  
  const userByEmailExist = await User.findOne({where: { email }});

  if(userByEmailExist) {
    throw Error('This email is already in use');
  }

  const encryptedPassword = await bcrypt.hash(password, 8);

  const user = await User.create({
    username, email, password: encryptedPassword
  }, {transaction});

  delete user.password;

  return user;
}

module.exports = UserCreate;