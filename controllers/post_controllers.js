const Post = require('../models/post');
const Comment = require('../models/comment');
const { post } = require('../routes');
const Like = require('../models/like');

module.exports.createPost = async function(req,res){
 try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        console.log("#########",post);
        //Checking if there is a ajax request
        if(req.xhr){
           // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();

            req.flash('success','Post published!');
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!!"
            });
        }
        req.flash('success','Post published!');
        return res.redirect('back');    
 } catch (error) {
      console.log(`Error creating post: ${err}`);
      return;
 }
}

//Deleting a post 
module.exports.destroy = async function(req,res){
    try {
         //Find the post having the id passed in URL
        let post =  await Post.findById(req.params.id);
        // .id means converting the object id into string
        if( post.user == req.user.id ){

            //Delete the associated likes for the post and its comment likes too
            await Like.deleteMany({likable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            
            post.remove();
            //Delete all those comments which have post: req.params.id
            await Comment.deleteMany({post: req.params.id });

            if(req.xhr){
                return res.status('200').json({
                    //This data is sent back to the AJAX request
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                })
            }
            req.flash('success','Post deleted!!');
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        return;
    }
}



