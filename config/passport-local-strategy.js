const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/user");

//Authentication using passport
passport.use(new LocalStrategy({
    //NAMES ARE FROM SCHEMA
    usernameField: 'email'
}, 
function(email, password , done){
//Find the user and establishing the identity
    User.findOne({email: email},function(err, user){
        if(err){console.log('Error in finding user --> Passport');
        return done(err);
    }
    if(!user || user.password != password){
        console.log('Invalid Username/Password');
        return done(null, false);
    }
    return done(null, user);
    })
}
));

//serializing the user to decide which user key is kept to be in cookies
passport.serializeUser(function(user, done){
        return done(null, user);
    });

//deserializing the user from key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
         if (err) {
           console.log("Error in finding user --> Passport");
           return done(err);
         }
         return done(null,user);
    })
})