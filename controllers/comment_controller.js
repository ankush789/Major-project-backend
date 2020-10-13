const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.createComment = function(req,res){
    // Find post with passed post-id in the ejs file
    Post.findById(req.body.post, function(err, post){
        if(err){console.log(`Error while finding post ${err}`);return;}
        if(post){
            // Adding comment and the post-id to the database
            Comment.create({
                 content: req.body.content,
                  post: req.body.post,
                  user: req.user._id
            }, function(err, comment){
                if(err){console.log(`Error while writing comments to database ${error}`);return;}
                // Pushing comment-id to the post -> comments array which of type objectId 
                post.comments.push(comment);
                post.save();

               return res.redirect('back');
            });
        }
    });
}