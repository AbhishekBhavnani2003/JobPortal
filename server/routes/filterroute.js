const express = require('express');
const router = express.Router();
const auth = require('../controllers/authenticate');
const filter = require('../controllers/filter');
const { route } = require('./postRoutes');


router.post('/getpostbycategory' , auth.authenticatetoken,filter.categoryfilter )
router.post('/getpostbygender' , auth.authenticatetoken,filter.genderfilter )
router.post('/getpostbyexp' , auth.authenticatetoken,filter.expfilter )

module.exports = router ;