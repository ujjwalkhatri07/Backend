const express = require('express');
const Order = require('../models/order');
const router = express.Router();
const auth = require('../auth');

router.route('/')
.get(auth.verifyUser, (req, res, next) => {
    Order.aggregate([
        {
            $match:{user:req.user._id}
        },
        {
            $group:{
                _id:"$dateTime"
            }
        },
        {
            $sort:{createdAt:-1}
        }
    ], function (err, result){
        if(err){
            next(err);
        }else{
            res.json(result);
        }
    })
})

.post((req,res,next)=>{
    let order = Order(req.body);
    order.user = req.user._id;
    order.save()
    .then((order)=>{
        res.statusCode = 201;
        res.json(order);
    }).catch(next)
})

.put((req,res,next)=>{
    res.send("Cannot update");
})

.delete((req,res,next)=>{
    Order.deleteMany({})
    .then((order)=>{
        res.send("Deleted Succesfully");
    })
});


router.route('/:id')
.get(auth.verifyUser, (req,res,next)=>{
    Order.find({'dateTime':req.params.id})
    .populate({path:'food'})
    .then((order)=>{
        res.statusCode = 200;
        res.json(order);
    })
})

.post((req,res,next)=>{
    res.send("Cannot post");
})

.put((req,res,next)=>{
    Order.findByIdAndUpdate(req.body.id,{$set: req.body},{new:True})
    .then((order)=>{
        res.statusCode = 200;
        res.json(order);
    })
})

.delete((req,res,next)=>{
    Order.findByIdAndDelete(req.body.id)
    .then((order)=>{
        res.send("Deleted succefully");
    })
})

router.get('/orders/show',function(req,res){
    Order.find().then(function(data){
        res.send(data);
    })
})

module.exports = router;