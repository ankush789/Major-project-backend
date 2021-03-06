const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

//To send emails you need a transporter object
//transporter is going to be an object that is able to send mail
//It have the details of the sender 
let transporter = nodemailer.createTransport(env.smtp);

//Function to render a ejs template for the mail
//relativePath is the place from where mail is to be sent
let renderTemplate = (data, relativePath) => {
    //console.log("Inside node mailer**********",data);
    let mailHTML; //Stores all the HTML which is to be send
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data, //data passed to the ejs
        function(err, template){ 
            if(err){console.log('Error in rendering template');return;}
            mailHTML = template;
        }
    );
    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}