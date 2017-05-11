const env = require('env2')('env.json');

module.exports = {
  port: process.env.PORT || 3000,
  database: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  awsBucket: 'amble',
  awsRegion: 'eu-west-2',
  awsAccessKeyID: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  jwtSecret: process.env.JWT_SECRET,
  apnsPrivateKey: process.env.APNS_PRIVATE_KEY,
  jwtSession: {
    session: false
  }
}