const express = require('express');
const router = express.Router();
const auth = require('../controllers/authenticate');
const post = require('../controllers/postController')

router.post('/newpost', auth.authenticatetoken , post.newpost);
router.get('/displaypost',auth.authenticatetoken,post.displaypost) ; 
router.put('/updatepost/:id',auth.authenticatetoken,post.updatepost) ; 
router.delete('/deletepost/:id',auth.authenticatetoken,post.deletePost) ; 


module.exports = router;
