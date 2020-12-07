const express = require('express');
const router = express.Router();
const passport = require('passport');
const resetPasswordController = require('../controllers/resetPassword_controller');
const resetPassword = require('../models/reset_password');


router.post('/', resetPasswordController.resetPassword);
router.post('/:id',resetPasswordController.newPasswordSubmission);

module.exports = router;