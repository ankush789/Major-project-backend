const nodeMailer = require('../config/nodemailer');

//new way to export a method
exports.resetPassword = (resetPassword)=>{
    console.log("##################",resetPassword);
    //Calling renderTemplate function and passing data and relative path to render ejs template
    const htmlString = nodeMailer.renderTemplate({resetPassword: resetPassword}, '/resetpassword/resetpassword.ejs');

    //Function to send mails
    nodeMailer.transporter.sendMail({
        from: 'ankushsharma.nbd@gmail.com',
        to: resetPassword.user.email,
        subject: 'Link to reset password',
        html: htmlString
    }, (err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}