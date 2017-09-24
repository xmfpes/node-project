var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send("admin main page");
});

router.get('/products', function(req, res){
    res.render('admin/products', 
        {message : "hello, ejs"}    
    );
});

module.exports = router;