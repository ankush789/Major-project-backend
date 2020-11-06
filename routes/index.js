const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');
console.log("router loaded");

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/comments', require('./comments'));
router.use('/posts', require('./post'));

// Require route file for APIs
router.use('/api',require('./api'));

module.exports = router;