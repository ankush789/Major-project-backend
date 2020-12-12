const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const imageFilter = require('../helper/imageFilter');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    friendships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friendship'
      }
    ]
},
{
    timestamps: true
});


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..', AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Static methods or functions
//"single" accept a single file with the name avatar. The single file will be stored in req.file
userSchema.statics.uploadedAvatar = multer({ 
  storage: storage, fileFilter: imageFilter.imageFilter, 
  limits: {fileSize: 1*1024*1024}
}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;