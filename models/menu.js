const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        enum:['Appetizers', 'Main Course','Desserts'],
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    availabiltiy:{
        type:Boolean,
        default:true,
    },
    image:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model("Menu",menuSchema);