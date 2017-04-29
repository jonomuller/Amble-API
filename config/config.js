const secret = require('./secret');

module.exports = {
  port: process.env.PORT || 3000,
  database: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  awsBucket: 'amble',
  awsRegion: 'eu-west-2',
  awsAccessKeyID: process.env.AWS_ACCESS_KEY_ID || secret.awsAccessKeyID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || secret.awsSecretAccessKey,
  jwtSecret: process.env.JWT_SECRET || secret.jwtSecret,
  jwtSession: {
    session: false
  }
}