const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController =require('../controllers/users_controllers');
router.get("/profile/:id", passport.checkAuthentication, usersController.profile);
router.get('/sign-in', usersController.signin);
router.get('/sign-up', usersController.signup);
router.post('/create', usersController.create);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

//Passport middleware to authenticate user before log in
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}),usersController.createSession);

//Router for log out
router.get('/sign-out', usersController.destroySession);


//For authentication from google-oauth
//scope is a array of strings having all the fields whose permission is to be taken
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/sign-in'}),usersController.createSession)

//exporting 
module.exports = router;