const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/post_controllers');

//Restricting only Authenticated users to create a post
router.post('/create-post', passport.checkAuthentication, postController.createPost);

module.exports = router;