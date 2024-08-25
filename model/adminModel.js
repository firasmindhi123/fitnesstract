const mongoose = require('mongoose')
const Schmea= mongoose.Schema
const userSchema = new Schmea({
    adminId:{
        type:String,
        require:true,
        unique:true
    },
    adminName:{
        type:String,
        require:true
    },
   
    password:{
        type:String,
        require:true
    }
},{timestamps:true})
module.exports=mongoose.model('Admin',userSchema)