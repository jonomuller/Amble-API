const express = require('express'),
      router = express.Router(),
      auth = require('./routes/auth');

router.use('/auth', auth);

module.exports = router;