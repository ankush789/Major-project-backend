const Post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.home = async function(req,res){
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

try{
     //Pre-Populating to get the whole user in post.user field
    // populate the comments in that post and the user of each of the comments
    let posts = await Post.find({})
    .sort('-createdAt') //Sort post according to the time of creation
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        populate: {
            path: 'likes'
        }
    }).populate('comments')
    .populate('likes');

    let user = await User.find({});
    
   //Getting th euser logges in and populating its 'friendships' array and further 'to_users'
   //to friends
   let USER;
   if(req.user){
        USER = await User.findById(req.user._id).populate({
        path: 'friendships',
        populate: {
            path: 'to_user'
        }
    });
   }
   

   
    return res.render('home',{
        title: 'Home',
        posts: posts,
        all_users: user,
        all_friends: USER
    });
}catch(err){
    console.log(`Error in home controller: ${err}`);
    return;
}

}
