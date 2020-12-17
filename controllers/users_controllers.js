const User = require('../models/user');
const Friendship = require('../models/friendship');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

module.exports.profile = async function(req,res){
    try {
          let user =  await User.findById(req.params.id);
          
          let isfriend = await Friendship.findOne({ from_user:req.user._id, to_user: req.params.id } || 
            { from_user:req.params.id , to_user:req.user._id  });

          return res.render('userProfile',{ title: "Profile", profile_user: user, isfriend : isfriend });      
    } catch (error) {
        console.log(error);
        return;
    }
 
}


//Rendering Sign In page
module.exports.signin = function(req, res){
    //Restricting the page when a user is logged in 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('users_sign_in',{
        title: "Codeial | Sign In"
    })
}       



//Rendering Sign Up Page
module.exports.signup = function(req, res){
    //Restricting the page when a user is logged in 
    if (req.isAuthenticated()) {
        return res.redirect("/users/profile");
    }
    return res.render('users_sign_up', {
        title: "Codeial | Sign Up"
    })
}



//get sign up form data
module.exports.create = function(req, res){
    //redirecting back to the same page if password of two field does not match 
    if (req.body.password != req.body.confirm_password){
        req.flash('error','Password do not match!!');
        return res.redirect('back');
    }
    //Find a user with entered email address, if exists
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in signing in');return}
    //If the user does not exist for the entered email address
        if(!user){
            //Create a new User and save it to database
            User.create(req.body, function(err,user){
                if(err){console.log("Error in creating user while Signing Up"); return}
                return res.redirect('/users/sign-in');
            })
        }
    //If user exist for the entered email address
        else{
            req.flash('error','Email Id is already in use');
            return res.redirect('back');
        }
    })

}




//login and create session for the user
module.exports.createSession = function(req, res){
    //Setting messages in request and to put these messages in the response 
    // middleware is used
    req.flash('success', 'Successfully logged in!!');
    return res.redirect('/');
}




//log out and destroy session
module.exports.destroySession = function (req, res) {
    req.flash('success','You have been logged out!!');
    //remove the user's session cookies to remove the signed in user
  req.logout();
  return res.redirect("/");
};

//Update User Profile
module.exports.update = async function(req,res){
    let userId = req.params.id;
    // if(req.user.id == userId){
    //     //Find the user and update its profile
    //     User.findByIdAndUpdate(userId,{ name: req.body.name , email: req.body.email },function(err,user){
    //         return res.redirect('back');
    //     })
    // }
    if(req.user.id == userId){
        try {
            //Find user using userID
            let user = await User.findById(userId);
            User.uploadedAvatar(req,res,function(err){
                if(req.fileValidationError){
                    req.flash('error',req.fileValidationError);
                    return res.redirect('back');
                }
                // else if(!req.file){
                //     req.flash('error','Please select an image to upload');
                //     return res.redirect('back');
                // }
                else if(err instanceof multer.MulterError){
                    if(err.code === 'LIMIT_FILE_SIZE'){
                        req.flash('error','File should be less than 1 MB in size!!');
                    }
                    else{ 
                        req.flash('error',err);
                    }
                    return res.redirect('back');
                }
                else if(err){
                    req.flash('error',err);
                    return res.redirect('back');
                }
                user.name = req.body.name;
                user.email = req.body.email;           
                //If any file is uploaded
                if(req.file){
                    //Deleting if previous avatar is present
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                    //Saving the path of uploaded image in the avatar field of user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    req.flash('success','Profile Updated!!');
                }
                user.save();
                return res.redirect('back');
           });
        } catch (error) {
            console.log(`Error: ${error}`);
            return;
        }
    }
    else {
        req.flash('error',Unauthorized);
        return res.status(401).send('Unauthorized');
    }
   
}