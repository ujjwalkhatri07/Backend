const mongoose = require('mongoose');
const resturantSchema = new mongoose.Schema({
    resturant_name:{
        type:String,
        required:true
    },
    resturant_address:{
        type:String,
        required:true
    },
    res_image:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('Resturant',resturantSchema);