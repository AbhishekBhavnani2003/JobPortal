const express = require('express');
const router = express.Router();
const auth = require('../controllers/authenticate');
const application = require('../controllers/application')

router.post('/newapplication', auth.authenticatetoken , application.application);
router.get('/getapplicants/:id', auth.authenticatetoken , application.applicants)
router.put('/updatestatus/:id' , auth.authenticatetoken , application.statusapply)
router.post('/appbyname' , auth.authenticatetoken , application.applicationbyname)

module.exports = router ; 