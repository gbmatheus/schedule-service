const jwt = require('jsonwebtoken');

require('dotenv-safe').load();

module.exports = (req, res, next) => {
  // Authorization: Bearer <token>
  
  //Alterado apenas para pegar o token pela session, alterar depois para colocar o token no headers
  // const authHearder = req.headers.authorization;
  console.log('\nAuth \n',req.session);
  const authHearder = req.session.authorization;
  
  if(!authHearder)
  return res.status(401).send({ error: 'No token provided '});

  // Authorization: Bearer <token> estrutura do toke
  const parts = authHearder.split(' ');

  //Verificar se o token tem duas partes
  if(!parts.legnth === 2)
  res.status(401).send({ error: 'Token error '});

  const [scheme, token ] = parts;

  //estrutura do reject /^ $/ - /^inicio da verificação $fim da verificação/
  if(!/^Bearer$/i.test(scheme))
  return res.status(401).send({ error: 'Token malformatted '});

  jwt.verify(token, process.env.SECRET, (err, decode) => {
    if(err) return res.status(401).send({ error: 'Token invalid ' });

    req.userId = decode.id;
    req.userType = decode.typeUser;

    return next();
  });
}
