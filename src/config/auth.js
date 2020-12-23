module.exports = {
  jwt: {
    secret: process.env.SECRET || 'eita',
    expiresIn: '1d'
  }
}