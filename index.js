const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//Setting folder for Static Files
app.use(express.static('./assets'));

//Setting express router
app.use('/', require('./routes'));

//install ejs and setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//listening app on the port
app.listen(port, function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
        return;
    }
    console.log(`server running on port: ${port}`);
})
 