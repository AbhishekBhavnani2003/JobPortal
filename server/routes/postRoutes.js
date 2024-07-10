const express = require('express');
const router = express.Router();
const auth = require('../controllers/authenticate');
const post = require('../controllers/postController')

router.post('/newpost', auth.authenticatetoken , post.newpost);
router.get('/displaypost',auth.authenticatetoken,post.displaypost) ; 
router.put('/updatepost/:id',auth.authenticatetoken,post.updatepost) ; 
router.delete('/deletepost/:id',auth.authenticatetoken,post.deletePost) ; 
router.get('/getpost/:id',auth.authenticatetoken,post.postbyid)
router.post('/getpostbyname',auth.authenticatetoken,post.postbyname)

module.exports = router;
