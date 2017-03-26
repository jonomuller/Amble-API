const config = require('./config/main'),
      express = require('express'),
      app = express(),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      server = app.listen(config.port);

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
 
app.get('/', function (req, res) {
  res.send('<html><body><h1>Hello World</h1></body></html>');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

