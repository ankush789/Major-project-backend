const resetPassword = require('../models/reset_password');
const User = require('../models/user');
const crypto = require('crypto');
const resetPasswordMailer = require('../mailers/reset_password_mailer');

module.exports.resetPassword = async function(req,res){
    try {
        let randomString = crypto.randomBytes(20).toString('hex');
        let email = req.body.email;
        let user = await User.findOne({email:email}).exec();
        
        if(user){
            let ResetPassword = await resetPassword.create({
                user: user._id,
                accessToken: randomString
            });
            ResetPassword = await ResetPassword.populate('user','name email').execPopulate();        
            resetPasswordMailer.resetPassword(ResetPassword);
            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }

    } catch (error) {
        if(error){
            console.log('Error in reset password controller',error);
            return;
        }
    }
}


module.exports.forgotPassword = async function(req,res){
    try {
        return res.render('emailToReset', {title: 'Forgot Password'})


    } catch (error) {
        if(error){
            console.log('Error in reset password controller',error);
            return;
        }
    }
}

module.exports.setNewPassword = async function(req,res){
    try {
        let token = await resetPassword.findOne({accessToken:req.params.id }).exec();
        if(token.isValid){
             return res.render('resetPasswordForm',{title: 'Reset Password', accessToken: req.params.id})
       }
       else {
           return res.redirect('/');
       }
    } catch (error) {
        if(error){
            console.log('Error in reset password controller',error);
            return;
        }     
    }
}
module.exports.newPasswordSubmission = async function(req,res){
    if(req.body.password!= req.body.confirmPassword){
         req.flash('error','Password does not match!');
         console.log('do not match');
         return;
    }

    let ResetPassword = await resetPassword.findOneAndUpdate({accessToken: req.params.id},{isValid: false}).exec();
     ResetPassword = await ResetPassword.populate('user','name email').execPopulate(); 
     console.log("##############",ResetPassword);
     await User.findOneAndUpdate({email: ResetPassword.user.email}, {password: req.body.password}).exec();
    return res.redirect('/users/sign-in');
}