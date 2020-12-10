const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        //Setting type of user to have logged in user Object Id
        type: mongoose.Schema.Types.ObjectId,
        //Referring the user Schema to set the ObjectId of the logged in user
        ref: 'User'
    },
    //Include array of ids of all the comments for a post in the postSchema
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},
{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;