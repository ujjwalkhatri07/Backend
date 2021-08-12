const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
    foodname:{
        type:String,
     
    },
    foodimage:{
        type:String
    },
    price:{
        type:String,
     
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Resturant"
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"FoodCategory"
    },
},{timestamps:true});

module.exports=mongoose.model('Food',foodSchema);