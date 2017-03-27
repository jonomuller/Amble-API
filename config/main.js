module.exports = {
  port: process.env.PORT || 3000,
  database: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  secret: 'amble4lyfe'
}