const nodeMailer = require('../config/nodemailer');

//new way to export a method
exports.newComment = (comment)=>{
    console.log("Inside new comment mailer");

    //Function to send mails
    nodeMailer.transporter.sendMail({
        from: 'ankushsharma.nbd@gmail.com',
        to: comment.user.email,
        subject: 'New comment published!',
        html: '<h1>Your comment is now published</h1>'
    }, (err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}