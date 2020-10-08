const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController =require('../controllers/users_controllers');
router.get("/profile", passport.checkAuthentication, usersController.profile);
router.get('/sign-in', usersController.signin);
router.get('/sign-up', usersController.signup);
router.post('/create', usersController.create);

//Passport middleware to authenticate user before log in
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}),usersController.createSession);

//Router for log out
router.get('/sign-out', usersController.destroySession);
//exporting 
module.exports = router;