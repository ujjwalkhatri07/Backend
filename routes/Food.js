const express = require('express');
const Food  = require('../models/Food');
const router = express.Router();

router.route('/')
  //Getting  All food item from database
.get((req,res,next)=>{
    Food.find({})
    .populate({path: 'restaurant'})
    .populate({path: 'category'})
    .then((food)=>{
        status=200;
        res.json(food);

    })
    .catch((err)=>next(err));

})
 //inserting  new food item to the database
.post((req,res,next)=>{
    Food.create({
        foodname:req.body.foodname,
        price: req.body.price,
        foodimage:req.body.foodimage,
        restaurant:req.body.restaurant,
        category:req.body.category
    })
    .then((food)=>{
        res.status=200;
        res.json(food);
    })
    .catch((err) => next(err));
})

.put((req,res,next)=>{
    res.statusCode=201;
    res.json("You cannot update Food");

})

 //Deleting  All food item from database
.delete((req,res,next)=>{
    // Food.deleteMany({})
    // .then((food)=>{
    //     res.json(food);

    // })
    res.statusCode=201;
    res.json("You cannot delete all Food");
});

 //Getting particular food iteam by id from database
 router.route('/:id')
  .get((req,res,next)=>{
    Food.findById(req.params.id)
    .populate({path: 'restaurant'})
    .populate({path: 'category'})
     .then((food)=>{
        res.json(food);
     })
     .catch((err) => next(err));
 })
 .post((req,res,next)=>{
     res.statusCode=201;
     res.json("You cannot add food on here");
 })
 //Updating the particular food item by id

 .put((req,res,next)=>{
     Food.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
     .then((food)=>{
         res.json(food);
     })
     .catch((err)=> next(err));
 })

 // Deleting particular food by id

 .delete((req,res,next)=>{
     Food.findByIdAndDelete(req.params.id)
     .then((food)=>{
         res.json(food);
     })
     .catch((err)=> next(err));
 })

 //search food by category with id
 router.get('/searchByCat/:catId', (req, res, next)=>{
    Food.find({category: req.params.catId})
    .populate({path:'category'})
    .then((food) => {
       res.json(food);
   })
   .catch((err) => next(err));
})

//search food by restaurant id
router.get('/searchByRes/:resId', (req, res, next)=>{
   Food.find({restaurant: req.params.resId})
   .populate({path:'restaurant'})
   .then((food) => {
      res.json(food);
  })
  .catch((err) => next(err));
})

//search food by name
router.get('/searchByName/:name', (req, res, next)=>{
    console.log(req.params.name)
   Food.find({foodname: new RegExp(req.params.name, 'i')})
    .then((food) => {
        res.json({food:food});
        })
    .catch((err) => next(err));
})

module.exports= router;


