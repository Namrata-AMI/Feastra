const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    items:[
        {
            menuItem:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Menu',
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                min:1,
            },
        },
    ],
    totalAmount:{
        type:Number,
        required:true,
        min:0,
    },
    status:{
        type:String,
        enum:['Pending','Completed'],
        required:true,
    },
}, {timestamps:true});

module.exports = mongoose.model('Order',orderSchema);