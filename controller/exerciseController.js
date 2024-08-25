const Exercise = require('../model/Exercise')
exports.Exercise=async(req,res)=>{
    try{
        const{exerciseName,exerciseType,description,level,repeat,duration} =req.body
         const findexercise =await Exercise.find({'exerciseName':exerciseName})
         if(findexercise.length>0){
            res.status(403).json({message:'exercise exists',findexercise})
         }
        const exercise = new Exercise({exerciseName,exerciseType,description,level,repeat,duration,userId:req.admin._id})
        const data=await exercise.save()
        res.status(201).json({message:'succeful', data})
    
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
    exports.updateExercise=async(req,res)=>{
      try{
        const{exerciseName,exerciseType,description,level,repeat,duration} =req.body
        const exerciseId =req.params.id
        await Exercise.updateOne({_id:exerciseId},req.body)
   
     res.status(200).json({succsess:'true',message:'upadeted'})
      }
      catch(err){
        res.status(502).json({message:'something went wrong'})
      }
       
    }    
    exports.deleteExercise=async(req,res)=>{
      try{
        const exerciseId =req.params.id
         const data= await Exercise.deleteOne({_id:exerciseId})
         console.log(data)
   
  res.status(200).json({succsess:'true',message:'deleted'})
      }
      catch(err){
        res.status(502).json({message:'something went wrong'})
      }
       
    }    
    
 