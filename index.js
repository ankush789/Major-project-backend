const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 9000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//for Session cookies and their encryption
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')

app.use(express.urlencoded());
app.use(cookieParser());

//Extracting styles and scripts files from subpages to include them in layout at desired place
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setting folder for Static Files
app.use(express.static('./assets'));


//install ejs and setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Middleware which encrypts session-cookie and set properties for it
app.use(session({
    name: 'codeial',
    secret: 'randomKey',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: ( 1000*60*100 )
    }
}));

//Use session-cookie
app.use(passport.initialize());
app.use(passport.session());

//Setting express router
app.use('/', require('./routes'));

//listening app on the port
app.listen(port, function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
        return;
    }
    console.log(`server running on port: ${port}`);
})
 