const mongoose = require('mongoose');

const resetPassportSchema = new mongoose.Schema({
   user: {
       //Setting type of user to have logged in user Object Id
        type: mongoose.Schema.Types.ObjectId,
        //Referring the user Schema to set the ObjectId of the logged in user
        ref: 'User'
   },
   accessToken: {
       type: String
   },
   isValid: {
       type: Boolean,
       default: true
   }
},
{
    timestamps: true
}
);

const resetPassword = mongoose.model('resetPassword',resetPassportSchema);

module.exports = resetPassword;
