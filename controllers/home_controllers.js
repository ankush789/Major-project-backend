module.exports.home = function(req,res){
    // //printing cookies
    // console.log(req.cookies);
    // //Setting cookies in response
    // res.cookie('user_id',200);
    return res.render ('home', {
        title: "Home"
    })
}