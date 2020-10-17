//In this MiddleWare messages are fetched from the
// request flash and set it to the locals
module.exports.setFlash = function(req,res,next){
    //Setting values to the locals so that they can be accessed in template
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}