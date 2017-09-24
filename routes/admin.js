var express = require('express');
var router = express.Router();
router.get('/', function(req, res){
    res.send("admin main page");
});
router.get('/products', function(req, res){
    res.send("admin product page");
});
module.exports = router;