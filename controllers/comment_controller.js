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

module.exports.deleteComment = function(req,res){
    Comment.findById(req.params.id, function(err, comment){
        
        //Pre-populating the post in the Comment Schema to get post's user
           Comment.find({ _id: req.params.id }).populate('post').exec(function(err, Comment){

               //postUser contains the user who created the post
                let postUser = Comment[0].post.user;

                //Only person who made the comment or the person on whom post comment is made can delete the comment
               if(comment.user == req.user.id || postUser == req.user.id ){
                    let postId = comment.post;
                    comment.remove();

                //Deleting comment ids from the post.comments array 
                    Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}},function(err, post){
                        return res.redirect('back')
                    })
                }
                else{
                    return res.redirect('back');
                }
            })
    })
}