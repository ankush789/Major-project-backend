const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');
const resetPasswordController = require('../controllers/resetPassword_controller');

console.log("router loaded");

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/comments', require('./comments'));
router.use('/posts', require('./post'));

// Require route file for APIs
router.use('/api',require('./api'));


router.use('/reset_password', require('./resetPassword'));
router.get('/forgot_password',resetPasswordController.forgotPassword);
router.get('/:id', resetPasswordController.setNewPassword);

module.exports = router;