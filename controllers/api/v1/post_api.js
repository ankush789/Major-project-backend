//index is used when you want to list down something
module.exports.index = function(req,res){
    return res.json(200,{
        message: "List of posts",
        posts: []
    })
}
