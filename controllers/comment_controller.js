const Comment = require('../models/comment');
const Post = require('../models/post');
const mailer = require('../mailers/comments_mailer');
const CommentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');


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

            // //For setting mailer
            // comment = await comment.populate('user','name email').execPopulate();        
            // //mailer.newComment(comment);

            // //Adding comments to the queue for delayed jobs
            // let job = queue.create('emails',comment).save(function(err){
            //     if(err){
            //         console.log('Error in creating a queue',err);
            //         return;
            //     } 
            //     console.log(job.id);
            // });

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'name').execPopulate();
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

                return res.redirect('back');
            };
    } catch (error) {
        console.log(`Error while creating comment ${error}`);
        return;
    }
}

module.exports.deleteComment = async function(req,res){
    try {
       // console.log(req.user._id);
        //Pre-populating the post in the Comment Schema to get post's user
         let comment = await Comment.findById(req.params.id).populate('post').exec();
               
               //postUser contains the user who created the post
               let postUser = await comment.post.user;
                 
                //Only person who made the comment or the person on whom post comment is made can delete the comment
               if(comment.user == req.user.id || postUser == req.user.id ){
                    let postId = comment.post._id;
                    comment.remove();

                //Deleting comment ids from the post.comments array 
                Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

                //Destroy the associated likes for this comment
                await Like.deleteMany({likable: comment._id, onModel: 'Comment'});


                        // send the comment id which was deleted back to the views
                        if (req.xhr){
                            return res.status(200).json({
                                data: {
                                    comment_id: req.params.id
                                },
                                message: "Post deleted"
                            });
                        }
                        req.flash('success','Comment deleted!');
                        return res.redirect('back')
                    
                }
                else{
                    req.flash('error', 'Unauthorized');
                    return res.redirect('back');
                }
    } catch (err){
        req.flash('error',err);
        return;
    }    
}