const express = require('express');
const router = express.Router();
const auth = require('../controllers/authenticate');
const application = require('../controllers/application')

router.post('/newapplication', auth.authenticatetoken , application.application);


module.exports = router ; 