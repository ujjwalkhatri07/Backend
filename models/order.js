const mongoose = require('mongoose');
const orderSchema =  new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Food',
        required:true
    },
    quanity:{
        type:String,
        required:true
    },
    notes:{
        type:String,
    },
    dateTime:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Order',orderSchema);