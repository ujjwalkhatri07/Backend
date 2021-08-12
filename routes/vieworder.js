const express = require('express');
const Order = require('../models/order');
const router = express.Router();
const auth = require('../auth');


router.get('/orders/show/admin',function(req,res){
    Order.find().then(function(data){
        res.send(data);
    })
})

module.exports = router;