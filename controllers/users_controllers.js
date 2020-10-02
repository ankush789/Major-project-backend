module.exports.profile =function(req,res){
    return res.render('userProfile');
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
    
}

//login and create session for the user
module.exports.createSession = function(req, res){

}