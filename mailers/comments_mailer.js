const nodeMailer = require('../config/nodemailer');

//new way to export a method
exports.newComment = (comment)=>{
    //Calling renderTemplate function and passing data and relative path to render ejs template
    const htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    //Function to send mails
    nodeMailer.transporter.sendMail({
        from: 'ankushsharma.nbd@gmail.com',
        to: comment.user.email,
        subject: 'New comment published!',
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