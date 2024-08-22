const mongoose = require('mongoose')
const Schmea= mongoose.Schema
const categorySchema = new Schmea({
    userName:{
        type:String,
        require:true,
        unique:true
    },
   
},{timestamps:true})
module.exports=mongoose.model('category',categorySchema)