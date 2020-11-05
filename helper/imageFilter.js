const path = require('path');
// const imageFilter = function(req, file, cb) {
//     // Accept images only
//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'Only image files are allowed!';
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };

const imageFilter = function(req, file, cb){
    //Allowed Extensions
    const filetypes = /jpeg|jpg|png|gif/;
    //Check Extensions -> test() functions checks if any pattern of filetypes exist in file original name
    // test() function returns a boolean
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //check mime --> mimetype: 'image/png',
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    }
    else {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    
}
exports.imageFilter = imageFilter;


//SAMPLE req.file 
// {
//   fieldname: 'avatar',
//   originalname: 'avatar.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: 'D:\\Major Project BackEND\\uploads\\users\\avatars',
//   filename: 'avatar-1604598453805.png',
//   path: 'D:\\Major Project BackEND\\uploads\\users\\avatars\\avatar-1604598453805.png',
//   size: 8229
// }