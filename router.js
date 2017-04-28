const express = require('express'),
      router = express.Router(),
      auth = require('./routes/auth');
      walks = require('./routes/walks'),
      users = require('./routes/users');

router.use('/auth', auth);
router.use('/walks', walks);
router.use('/users', users);

module.exports = router;