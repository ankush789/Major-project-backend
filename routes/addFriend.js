const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/addFriend_controller');

router.get('/friend',friendshipController.addFriend);


module.exports = router;