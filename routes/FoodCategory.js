const express = require('express');
const Cat  = require('../models/FoodCategoey');
const router = express.Router();

router.route('/')
  //Getting  All food item from database
.get((req,res,next)=>{
    Cat.find({})
    .then((cat)=>{
        status=200;
        res.json(cat);

    })
    .catch((err)=>next(err));

})
 //inserting  new food item to the database
.post((req,res,next)=>{
    Cat.create({
        category:req.body.category,
        catImg:req.body.catImg
    })
    .then((cat)=>{
        res.status=200;
        res.json(cat);
    })
    .catch((err) => next(err));
})

//update 

.put((req,res,next)=>{
    res.statusCode=201;
    res.json("You cannot update category");

})

 //Deleting  All food item from database
.delete((req,res,next)=>{
    Cat.deleteMany({})
    .then((cat)=>{
        res.json(cat);
    })
});

 //Getting particular category by id from database
 router.route('/:id')
  .get((req,res,next)=>{
    Cat.findById(req.params.id)
     .then((cat)=>{
        res.json(cat);
     })
     .catch((err) => next(err));
 })
 .post((req,res,next)=>{
     res.statusCode=201;
     res.json("You cannot add category on here");
 })

 //Updating the particular each category item by id
 .put((req,res,next)=>{
     Cat.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
     .then((cat)=>{
         res.json(cat);
     })
     .catch((err)=> next(err));
 })

 // Deleting particular each category by id

 .delete((req,res,next)=>{
     Cat.findByIdAndDelete(req.params.id)
     .then((cat)=>{
        res.json(cat);
     })
     .catch((err)=> next(err));
 })

module.exports= router;


