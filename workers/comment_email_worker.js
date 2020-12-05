
const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');


//Instead of sending mail directly through the controllers to commentMailer
//Mails are send through queue (Workers)

//Controller send a job to the process function.
// Jobs are added to the queue.
//job.data contain the actual data which is being required 
//this data is passed to the "mailer" to process the mail




//Every worker has a process function
//Everytime a new task is added to the queue, worker has to execute
//the code inside the process function
//First arguement is the name of the queueu
//job.data contains the data which is being used for the mail
queue.process('emails',function(job,done){
    console.log('Emails worker is processing a job',job.data);
//Passing job data to the comment mailer to process the mail
    commentsMailer.newComment(job.data);
    done();
});