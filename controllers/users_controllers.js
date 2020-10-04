const User = require('../models/user');

module.exports.profile =function(req,res){
    const d = req.cookies.user_id;
    if(d){
    User.findById(d , function(err, user){
        if (err) { console.log('Error in finding user in signing in'); return }
        if(!user){
            return res.redirect('/users/sign-in');
        }
        return res.render('userProfile', { title: 'Profile', user: user });
    })
    }
    else {
        return res.redirect('/users/sign-in');
    }
}

//Rendering Sign In page
module.exports.signin = function(req, res){
    return res.render('users_sign_in',{
        title: "Codeial | Sign In"
    })
}

//Rendering Sign Up Page
module.exports.signup = function(req, res){
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
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if (err) { console.log('Error in finding user in signing in'); return }

        //handle user found
        if(user){
        //handle password which don't match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
        //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
       //handle user not found
        else{
            return res.redirect('back');
        }
    })
}

module.exports.signOut = function(req,res){
    res.cookie('user_id','');
    return res.redirect('/users/sign-in');
}