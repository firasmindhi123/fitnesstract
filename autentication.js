const jwt=require('jsonwebtoken')
const Admin=require('./model/adminModel')

exports.authenticate=async(req,res,next)=>{
    try{
       const auth=req.header('Authorization')
       const token=auth.split(" ")[1]
       const admin_verify= await jwt.verify(token,'adminlogin')
       const adminData= await Admin.findById(admin_verify.AdminId)

       req.admin =adminData
        next()
       }
    catch(err)
    {
console.log(err)
        return res.status(402).json({success:false,message:'please login'})
    }
}