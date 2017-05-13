const express = require('express'),
      router = express.Router(),
      auth = require('./routes/auth');
      walks = require('./routes/walks'),
      users = require('./routes/users'),
      invites = require('./routes/invites'),
      passportAuth = require('./config/passport');

router.use('/auth', auth);
router.use('/walks', walks);
router.use('/users', users);
router.use('/invites', invites);

module.exports = router;