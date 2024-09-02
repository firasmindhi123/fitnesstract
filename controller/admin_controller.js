const User = require('../model/adminModel')
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
  return jwt.sign({AdminId:id},'adminlogin')
}
exports.signup= async(req,res,next)=>{
        try{
          
          const userId=req.body.userName
          const password=req.body.password
          const name =req.body.name
          if(IsStringInvalid(userId)||IsStringInvalid(password)|| IsStringInvalid(name))
            {
                return res.status(403).json({err:"userId or passwor is missing"})
            }
            const findUser = await User.findOne({adminId:userId})
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
              const  user=new User({adminId:userId, adminName:name,password:hash})
               const data=await user.save()
               res.status(201).json({message:'success123',data})
            }

            
          })
          
      
        }
        catch(err){
          res.status(500).json({message:'internal problem'})
        }
}

exports.login =async(req,res,next)=>{
  try{
    const userId =req.body.AdminId
    const password=req.body.password
    const findUser = await User.findOne({adminId:userId})
    if(IsStringInvalid(userId)||IsStringInvalid(password))
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
  exports.aminDetail =async(req,res)=>{
    try{
      res.status(200).json({data:req.admin})
  
    }
    catch(err)
  
    {
      res.status(404).json({message:'data not found'})
    }
  }
  exports.changePassword=async(req,res,next)=>{
    try{
    const {oldPassword, newPassword } = req.body;
  
    if ( !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'old password, and new password are required.' });
    }
  
  const isMatch = await bcrypt.compare(oldPassword, req.admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect.'  });
    }
  
    const newHash = await bcrypt.hash(newPassword, 10);
      await User.replaceOne({_id:req.admin._id},{password:newHash})
     
    res.status(200).json({ message: 'Password changed successfully.' });
  }
  catch(err)
  {
    res.status(500).json({status:'failed',error:err})
  }
  }