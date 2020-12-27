const env = require('./environment');
const fs = require('fs');
const path = require('path');

//Setting assetPath function to the locals so that it can be accessed by files in views
module.exports = (app) =>{
    //assetPath function is called from ejs file passing path to the css or js file
    app.locals.assetPath = function(filePath){
        //in development mode it returns back the exact path 
        if(env.name == 'development'){
            return filePath;
        }
        //in production mode
        //readFileSync returns the content of the path
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}