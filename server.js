let express = require('express');
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let book = require('./app/routes/book');

let app = express();


//let config = require('config'); //we load the db location from the JSON files
//db options
let options = { 
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              }; 

//db connection      
// mongoose.connect("mongodb://localhost/book", options);
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

var dev_db_url = 'mongodb://localhost/book';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//don't show the log when it is test
// if(config.util.getEnv('NODE_ENV') !== 'test') {
//     //use morgan to log at command line
//     app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
// }

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));

app.use('/books', book);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing aa