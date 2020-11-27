const passport = require('passport');
//Importing Strategy
const JWTStrategy = require('passport-jwt').Strategy;
//Importing ExtractJWT to extract JWT from header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

//Keys to encrypt
let opts = {
    //header is list of keys. it has a key called authorization 
    //which has a key called bearerToken,which is to be extracted
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //Encryption and Decryption key
    secretOrKey:'codeial'
}
//Using JWT Strategy
//jwtPayLoad contains user information in encrypted form
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    //Find the user using jwtPayload Id
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){console.log('Error in finding the user from JWT');return;}
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}));

module.exports = passport;