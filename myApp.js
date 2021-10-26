var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//npm install dotenv for local environment varibles
//require('dotenv').config();

console.log("Hello World");

// POST METHOD MIDDLEWEAR to convert the REQ Body to JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Middleware - for root - above every route function with app.USE
app.use(function middleware(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  });

 // Serving HTML page 
app.get("/",(req,res)=>{
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname + '/public'));

//Environment Variable
app.get("/json",(req,res)=>{
    if(process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
});

//Middleware Chaining
app.get('/now',(req,res,next) => {
    req.time = new Date().toString();
    next();
},(req,res) => {
    res.json({"time": req.time});
});

//Accessing URL Params and returning the request accordingly 
app.get('/:word/echo',(req,res) => {
    res.json({"echo" :req.params.word});
});

//Query Params
app.get('/name',(req,res) => {
    const fullName = req.query['first'] + ' ' + req.query['last'];
    res.json({name : fullName});
});
// could have also done it in the chaining fashion  
// app.route(path).get(handler).post(handler)

//POST

app.post('/name',(req,res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const fullName = firstName + ' ' + lastName;
    res.json({"name": fullName});
});

 module.exports = app;
