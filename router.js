const express = require('express'),
      router = express.Router(),
      auth = require('./routes/auth');
      // walks = require('./routes/walks');

router.use('/auth', auth);
// router.use('/walks', walks);

module.exports = router;