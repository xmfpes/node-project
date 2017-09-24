var express = require('express')
var app = express();
var port = 3000;
//admin module get
var admin = require('./routes/admin');
app.get('/', function(req, res){
    res.send("Hello, Node.js");
});
//routes add
app.use('/admin', admin);
app.listen(port, function(){
    console.log("server start!");
});