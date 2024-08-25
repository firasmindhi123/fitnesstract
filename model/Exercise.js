const mongoose = require('mongoose');
const Schmea= mongoose.Schema
const  ObjectId = mongoose.Schema.Types.ObjectId;
const exerciseSchema = new Schmea({
    exerciseName:{
        type:String,
        require:true
    },
    exerciseType:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true   
    }
   ,
    level:{
        type:String,
        require:true
    },
    repeat:{
        type:String,
    },
    duration:{
        type:String,
    },

    userId:{

        type:ObjectId,
        ref:'Admin'
    },
  
})
module.exports=mongoose.model('Exercise',exerciseSchema)