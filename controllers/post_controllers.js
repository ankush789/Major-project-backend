const Post = require('../models/post');
const Comment = require('../models/comment');
const { post } = require('../routes');

module.exports.createPost = async function(req,res){
 try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        //Checking if there is a ajax request
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!!"
            })
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
        if(post.user == req.user.id){
            post.remove();
            //Delete all those comments which have post: req.params.id
            await Comment.deleteMany({post: req.params.id });
            req.flash('success','Post deleted!!')
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



