const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 9000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

//for Session cookies and their encryption
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

//Require MongoDB
const MongoStore = require('connect-mongo')(session);
//Require node-sass-middleware to precompile SCSS code to CSS
const sassMiddleware = require('node-sass-middleware');
//Require connect-flash
const flash = require('connect-flash');
const flashMiddleware = require('./config/flashMiddleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookieParser());

//Setting folder for Static Files
app.use(express.static('./assets'));

//make the uploads path available to the browser
///uploads --> majorProjectBackend/uploads
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);

//Extracting styles and scripts files from subpages to include them in layout at desired place
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


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
    },
    //Mongo Store is used to save session cookie permanently
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove:'disabled'
    }, function(err){
        console.log(err);
    })
}));

//Use session-cookie
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//Middleware to use flash
app.use(flash());
// MiddleWare to set flash values to the response
app.use(flashMiddleware.setFlash);

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
 