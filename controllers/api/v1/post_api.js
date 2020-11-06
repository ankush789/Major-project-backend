const Post = require('../../../models/post')
const Comment = require('../../../models/comment');

//index is used when you want to list down something
module.exports.index = async function(req,res){
 let posts = await Post.find({})
    .sort('-createdAt') //Sort post according to the time of creation
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.json(200,{
        message: "List of posts",
        posts: posts
    })
}

//Deleting Posts from the API
module.exports.destroy = async function(req,res){
    try {
         //Find the post having the id passed in URL
        let post =  await Post.findById(req.params.id);
            post.remove();
            //Delete all those comments which have post: req.params.id
            await Comment.deleteMany({post: req.params.id });

            return res.json(200, {
                message: "Post and associated comments deleted"
            })
        
        // else{
        //     return res.redirect('back');
        // }
    } catch (error) {
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}