const express = require('express');
const { session } = require('passport');
const router = express.Router();
const passport = require('passport');

const postsApi = require('../../../controllers/api/v1/post_api');

router.get('/',postsApi.index);
//{session: false} prevents the session cookies to be generated
//and setting authentication using jwt
router.delete('/:id', passport.authenticate('jwt', {session : false}) ,postsApi.destroy);

module.exports = router;

