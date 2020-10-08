const User = require('../models/user');

module.exports.profile =function(req,res){
    return res.render('userProfile', {title: "Profile"});
}

//Rendering Sign In page
module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('users_sign_in',{
        title: "Codeial | Sign In"
    })
}

//Rendering Sign Up Page
module.exports.signup = function(req, res){
    if (req.isAuthenticated()) {
        return res.redirect("/users/profile");
    }
    return res.render('users_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//get sign up form data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in signing in');return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log("Error in creating user while Signing Up"); return}
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })

}

//login and create session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

//log out and destroy session
module.exports.destroySession = function (req, res) {
    //remove the user's session cookies to remove the signed in user
  req.logout();
  return res.redirect("/");
};