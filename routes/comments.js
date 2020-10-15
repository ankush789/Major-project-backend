const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentController = require('../controllers/comment_controller');

router.post('/create-comment', passport.checkAuthentication, commentController.createComment);
router.get('/delete/:id', passport.checkAuthentication, commentController.deleteComment)

module.exports = router;