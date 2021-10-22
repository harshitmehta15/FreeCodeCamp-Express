var express = require('express');
var app = express();
//npm install dotenv for local environment varibles
//require('dotenv').config();

console.log("Hello World");

app.get("/",(req,res)=>{
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname + '/public'));

app.get("/json",(req,res)=>{
    if(process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }

});































 module.exports = app;
