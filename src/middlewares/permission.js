
module.exports = {
  A (req, res, next) {
    console.log('req baseUrl', req.baseUrl);
    console.log('req path', req.path);
    console.log('req id ',req.userId);
    console.log('req type ',req.userType);
    
    if(req.userType !== 'A')
     return res.status(403).send({ error: 'Você não tem permissão'});
     
    next();
  },
  
  P (req, res, next) {
    console.log('req baseUrl - ', req.baseUrl);
    console.log('req path - ', req.path);
    console.log('req id - ',req.userId);
    console.log('req type - ',req.userType);
    
    if(req.userType === 'M')
      return res.status(403).send({ error: 'Você não tem permissão'});
     
    next();
  },
  
  M (req, res, next) {
    console.log('req baseUrl - ', req.baseUrl);
    console.log('req path - ', req.path);
    console.log('req id - ',req.userId);
    console.log('req type - ',req.userType);
    
    if(req.userType === 'P')
     return res.status(403).send({ error: 'Você não tem permissão'});
     
    next();
  },

  idP (req, res, next) {
    console.log('req baseUrl', req.baseUrl);
    console.log('req path', req.path);
    console.log('req path', req.params);
    console.log('req id ',req.userId);
    console.log('req type ',req.userType);
    

    if(req.userType === 'M')
      return res.status(403).send({ error: 'Você não tem permissão'});
    
    if(req.userType === 'P' && parseInt(req.params.id) !== parseInt(req.userId))
      return res.status(403).send({ error: 'Você não tem permissão'});
     
    next();
  },
  
  idM (req, res, next) {
    console.log('req baseUrl', req.baseUrl);
    console.log('req path', req.path);
    console.log('req path', req.params);
    console.log('req id ',req.userId);
    console.log('req type ',req.userType);
    
    if(req.userType === 'P')
     return res.status(403).send({ error: 'Você não tem permissão'});
    
    if(req.userType === 'M' && parseInt(req.params.id) !== parseInt(req.userId))
      return res.status(403).send({ error: 'Você não tem permissão'});
     
    next();
  },

}

// exports.permissionA = (req, res, next) => {
//   console.log('req id ',req.userId);
//   console.log('req type ',req.userType);
  
//   if(req.userType !== 'A')
//    return res.status(403).send({ error: 'Você não tem permissão'});
   
//   next();
// };

// exports.permissionP = (req, res, next) => {
//   console.log('req id ',req.userId);
//   console.log('req type ',req.userType);
  
//   if(req.userType !== 'A' || req.userType !== 'P')
//    return res.status(403).send({ error: 'Você não tem permissão'});
   
//   next();
// };

// exports.permissionM = (req, res, next) => {
//   console.log('req id ',req.userId);
//   console.log('req type ',req.userType);
  
//   if(req.userType !== 'A' || req.userType !== 'M')
//    return res.status(403).send({ error: 'Você não tem permissão'});
   
//   next();
// };