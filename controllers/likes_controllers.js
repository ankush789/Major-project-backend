const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');
const { findOne } = require('../models/like');


module.exports.toggleLike = async function(req,res) {
    try {
        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //Check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        //If a like already exists then delete it
        if(existingLike){
            //Pulling existing like from the likes array in "Post or Comment"
            likeable.likes.pull(existingLike._id);
            likeable.save();

            // removing existing like
            existingLike.remove();
            deleted = true;
        }
        //Make a new like
        else {
            //Creating a new Like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            //Pushing new like to the likes array of "Post or Comment"
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200, {
            message: "Request successful",
            data: {
                deleted: deleted
            }
        });

    } catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}