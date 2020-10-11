const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req,res){
    // //printing cookies
    // console.log(req.cookies);
    // //Setting cookies in response
    // res.cookie('user_id',200);
    // User.findById(id, function(err,user){
    // })

    // Post.find({},function(err, posts){
    //     return res.render ('home', {
    //     title: "Home",
    //     posts: posts,
    // })
    // })

    //Pre-Populating to get the whole user in post.user field
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: 'Home',
            posts: posts
        })
    });
}
