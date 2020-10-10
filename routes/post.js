const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/post_controllers');

router.post('/create-post', postController.createPost);

module.exports = router;