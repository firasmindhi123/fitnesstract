const jwt=require('jsonwebtoken')
const Admin=require('./model/adminModel')
const user=require('./model/userModel')

exports.authenticate=async(req,res,next)=>{
    try{
       const auth=req.header('Authorization')
       const token=auth.split(" ")[1]
       const user_verify= await jwt.verify(token,'adminlogin')
       const userData= await user.findById(user_verify.userId)

       req.user =userData
       console.log(req.admin,user_verify,userData)
        next()
       }
    catch(err)
    {
        return res.status(402).json({success:false})
    }
}