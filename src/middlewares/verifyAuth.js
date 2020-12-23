const {verify} = require('jsonwebtoken');

const {jwt} = require('../config/auth');

// retornar se está autenticado;
async function verifyAuth (req, res, next) {
  
  const authorization  = req.headers.authorization;

  if(!authorization) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  const [bearer, token] = authorization.split(' ');
  

  try {
    const decodeToken = await verify(token, jwt.secret);

    res.user = {
      id: decodeToken.sub
    }

    return next();
  } catch (error) {
    return res.status(401).json('Token is invalid');
  }

}

module.exports = verifyAuth;
