const User = require('../model/userModel')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')
function IsStringInvalid(str)
{
    if(str==undefined||str.length===0)
    {
        return true
    }
    else
    {
        return false
    }
}
function tokengenerated(id){
  return jwt.sign({userId:id},'adminlogin')
}
exports.signup= async(req,res,next)=>{
        try{
          
          const username=req.body.userName
          const email=req.body.email
          const weight=req.body.weight
          const height=req.body.height
          const age=req.body.age
          const gender=req.body.gender
          const password=req.body.password
          const bmi= (weight/(height*height))*10000
          if(IsStringInvalid(username)||IsStringInvalid(password)|| IsStringInvalid(email)||IsStringInvalid(weight)||IsStringInvalid(height)||IsStringInvalid(age)||IsStringInvalid(gender))
            {
                return res.status(400).json({err:"userId or passwor is missing"})
            }
            const findUser = await User.findOne({email:email})
            if(findUser)
            {
              return res.status(403).json({err:"user exist"})
            }
          bcrypt.hash(password,10,async(err,hash)=>{
            if(err)
            {
              console.log(err)
              res.status(504).json({message:'unsuccesul'})
            }
            else{
              const  user=new User({userName:username,email:email,height:height,weight:weight,age:age,gender:gender,bmi:bmi,password:hash})
              await user.save()
            }

            
          })
           res.status(201).json({message:'success123'})
      
        }
        catch(err){
            res.status(500).json({message:'internal problem'})
        }
}

exports.login =async(req,res,next)=>{
    try{
        const email =req.body.email
        const password=req.body.password
        const findUser = await User.findOne({email:email})
   if(IsStringInvalid(email)||IsStringInvalid(password))
      {
          return res.status(400).json({err:"userId or password is missing"})
      }
      if(!findUser)
      {
        return res.status(502).json({err:"user is not exists"})
      }
      bcrypt.compare(password,findUser.password,async(err,result)=>{
    if(err)
    {
        console.log(err)
    }
    else{
        res.status(201).json({message:'login succesful',token:tokengenerated(findUser._id)})
    }
   })

    }
    catch(err){
        res.status(500).json({message:'internal problem'})
    }
    
}
exports.userDetail =async(req,res)=>{
  try{
    res.status(200).json({data:req.user})

  }
  catch(err)

  {
    res.status(404).json({message:'data not found'})
  }
    
  
}
