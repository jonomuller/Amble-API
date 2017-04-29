module.exports = {
  port: process.env.PORT || 3000,
  database: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  awsBucket: 'amble',
  awsRegion: 'eu-west-2',
  jwtSession: {
    session: false
  }
}