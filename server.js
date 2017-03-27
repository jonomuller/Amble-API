const config = require('./config/config'),
      express = require('express'),
      app = express(),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      User = require('./models/user'),
      server = app.listen(config.port);

mongoose.connect(config.database, function(error) {
  if (error) throw error;
  console.log('Database connected to', config.database);
  console.log('App is running on port', config.port);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 
app.get('/', function (req, res) {
  res.send('<html><body><h1>Hello World</h1></body></html>');
});