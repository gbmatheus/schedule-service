const User = require('../../models/User');

  
async function UserCreate ({username, email, password}, {transaction}) {
  
  const userByEmailExist = await User.findOne({where: { email }});

  if(userByEmailExist) {
    throw Error('This email is already in use');
  }

  const user = await User.create({
    username, email, password
  }, {transaction});

  return user;
}

module.exports = UserCreate;