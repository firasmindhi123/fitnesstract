const Exercise = require('../model/Exercise')
exports.Exercise=async(req,res)=>{
    try{
        const{exerciseName,description,level,repeat,duration} =req.body
         const findexercise =await Exercise.find().select({exerciseName:exerciseName})
         if(findexercise){
            res.status(403).json({message:'exercise exists'})
         }
        const exercise = await Exercise.create({exerciseName,description,level,repeat,duration,userId:req.admin._id})
       
        res.status(201).json({message:'succeful', exercise})
    
       }
       catch(err){
         res.status(500).json({message:'internal problem'})
       }
    }
    exports.getexercises=async(req,res)=>{
        try{
            
            const data=await Exercise.find()
           
            res.status(201).json({message:'succeful', data})
        
           }
           catch(err){
             res.status(500).json({message:'internal problem'})
           }
        }
    
 