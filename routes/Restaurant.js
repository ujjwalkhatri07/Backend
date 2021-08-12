const express = require('express');
const Resturant = require('../models/Restaurant');
const router = express.Router();
const Food = require('../models/Food');

router.route('/')
.get((req,res,next)=>{
    Resturant.find({})
    .then((resturant)=>{
        res.status=200;
        res.json(resturant);
    })
    .catch((err)=>(next));
})
.post((req,res,next)=>{
    Resturant.create({
        resturant_name:req.body.resturant_name,
        resturant_address: req.body.resturant_address,
        // food_item:req.body.food_item,
        res_image:req.body.res_image
    })
    .then((resturant)=>{
        res.status=201;
        res.json(resturant);
        
    })
    .catch((err)=>(next));
})
.put((req,res,next)=>{
    res.statusCode=401;
    res.send("You cannot update resturant");
})
.delete((req,res,next)=>{
    // Resturant.deleteMany({})
    // .then((resturant)=>{
    //     res.json(resturant);
    // })
    // .catch((err)=>(next));
    res.statusCode=401;
    res.send("You cannot delete resturant");
});

router.route('/:id')
.get((req,res,next)=>{
    Resturant.findById(req.params.id)
    .populate('fooditem')
    .then((resturant)=>{
        res.statusCode=200;
        res.json(resturant);
    })
    .catch((err)=>(next));
 })

.post((req,res,next)=>{
    res.statusCode=401;
    res.json("You cannot add resturant");
})

.put((req,res,next)=>{
    Resturant.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    .then((resturant)=>{
        res.json(resturant);
    })
    .catch((err)=>(next));
})

.delete((req,res,next)=>{
    Food.find({restaurant:req.params.id})
        .then((rest)=>{
            if(rest!=null){
                Food.deleteMany({restaurant:req.params.id})
                    .then((rest)=>{
                        res.statusCode(201);
                        res.json("Food related with restaurant deleted")
                    })
                    .catch(next);
                }
                Resturant.findByIdAndDelete(req.params.id)
                .then((resturant)=>{
                    res.statusCode=200;
                    res.json(resturant);
                })
        })
        .catch(next);
});

module.exports=router;