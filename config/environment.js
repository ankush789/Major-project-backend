const dotenv = require('dotenv').config();
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

//It defines where the log are saved
const logDirectory = path.join(__dirname, '../production_logs');
//CHECKS IF logDirectory already exists other it creates it
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//acess.log is the name of the file
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'randomKey',
    db:'codeial_development',
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, //Not using 2 factor authentication
        auth: {
            user: 'ankushsharma.nbd',
            pass: 'Ankush@19991'
        }
    },
    google_client_id:"592110481684-ob99drlm06vaibeolpp8u29t4cviejn8.apps.googleusercontent.com",
    google_client_secret:"yPk5ar8omY-OHWrOx0Q55IVb",
    google_callback_url:"http://localhost:9000/users/auth/google/callback",
    jwt_secret : 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, //Not using 2 factor authentication
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODIEAL_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? 'development' : eval(process.env.CODEIAL_ENVIRONMENT);