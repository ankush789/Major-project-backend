const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.createPost = function(req,res){

    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log(`Error creating post: ${err}`);
            return;
        }
        console.log('*********',post);
        return res.redirect('back');
    });
}

//Deleting a post 
module.exports.destroy = function(req,res){
    //Find the post having the id passed in URL
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            //Delete all those comments which have post: req.params.id
            Comment.deleteMany({post: req.params.id }, function(err, comment){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}


