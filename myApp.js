var express = require('express');
var app = express();
//npm install dotenv for local environment varibles
//require('dotenv').config();

console.log("Hello World");

//Middleware - for root - above every route function
app.use(function middleware(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  });

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

app.get('/:word/echo',(req,res) => {
    res.json({"echo" :req.params.word});
});



























 module.exports = app;
