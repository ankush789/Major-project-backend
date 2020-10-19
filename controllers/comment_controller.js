const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = async function(req,res){
    try {
        // Find post with passed post-id in the ejs file
        let post = await Post.findById(req.body.post);
        if(post){
            // Adding comment and the post-id to the database
            let comment = await Comment.create({
                 content: req.body.content,
                  post: req.body.post,
                  user: req.user._id
            });
                // Pushing comment-id to the post -> comments array which of type objectId 
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            };
    } catch (error) {
        console.log(`Error while creating comment ${error}`);
        return;
    }
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
                        req.flash('success','Comment deleted!');
                        return res.redirect('back')
                    })
                }
                else{
                    return res.redirect('back');
                }
            })
    })
}