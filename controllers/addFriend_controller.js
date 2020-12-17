const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.addFriend = async function(req,res){
    let friendShip = await Friendship.create({
        from_user: req.query.from,
        to_user: req.query.to
    });
    
    //Find the user 
    let sender = await User.findById(req.query.from);
    let receiver = await User.findById(req.query.to);


    //console.log("###############",friendShip);
    sender.friendships.push(friendShip._id);
    sender.save();
    receiver.friendships.push(friendShip._id);
    receiver.save();
    
    return res.redirect('/');
}

