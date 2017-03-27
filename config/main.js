module.exports = {
  port: process.env.PORT || 3000,
  database: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  jwtSecret: 'amble4lyfe',
  jwtSession: {
    session: false
  }
}