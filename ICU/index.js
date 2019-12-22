//mvc moddel view control
const express = require('express');
const app = express();
//we add the path module which is built in node.js
const path = require('path');
//we add the handlebars engine module
const exphbs = require('express-handlebars');
//connecting the routes/home/main file to index file to make them see each other
const main = require('./routes/main');
//require body parser to parse date from front-end
const bodyParser = require('body-parser');
//setting the methodoverride to be able to use put,patch,etc in the url
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
//we add the middle ware for the public folder and join it to the path to call our styles from it
app.use(express.static(path.join(__dirname,'public')));


//we add the middle wares for the engine
app.engine('handlebars',exphbs({defaultLayout: 'home'}));
app.set('view engine','handlebars');

//always put it before the routes or it will not work
app.use(bodyParser.urlencoded({extended: true}));
//to be able to parse json fvar fruits = ["apple", "orange", "cherry"];

app.use(bodyParser.json());

//using the method override in the middleware
app.use(methodOverride('_method'));




//use --- midlleware
// / (means every file in maain will start with / login registration
app.use('/',main);



const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));