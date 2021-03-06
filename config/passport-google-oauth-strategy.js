const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');
//Telling passport to use new google strategy
//this is the credentials of our web application
passport.use(new googleStrategy({
        clientID:env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callback_url
    },
    function(accessToken, refreshToken, profile, done){
        //Find a user in the database
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log("Error in google strategy-passport",err);return;}

            console.log(profile);
        //If found, set it in req.user
            if(user){
                return done(null,user);
            }
            //If user does not exist, Create a new user with the provided details from GoogleId and set it in req.user
            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){console.log("error in creating new user using google strategy",err);return;}

                    return done(null,user);
                })
            }
        })
    }
));
module.exports = passport;