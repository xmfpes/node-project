var express = require('express');
var router = express.Router();
var ProductsModel = require('../models/ProductsModel');

router.get('/', function(req, res){
    res.send("admin main page");
});

router.get('/products', function(req, res){
    ProductsModel.find(function(err, products){
        res.render('admin/products', 
            { products : products }    
            //ProductModel의 products를 받아서
            //admin/products로 response를 보낸다.
        );
    });
});

router.get('/products/write', function(req,res){
    res.render( 'admin/form');
});

router.post('/products/write', function(req,res){
    var product = new ProductsModel({
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
    });
    product.save(function(err){
        res.redirect('/admin/products');
    });
});

module.exports = router;