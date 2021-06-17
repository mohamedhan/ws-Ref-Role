const jwt=require("jsonwebtoken")
const User=require("../models/User")
const isAuth=async(req,res,next)=>{
    const token=req.headers["x-auth"]
    
    if(!token){
        return res.status(401).json({msg:"unauthorized"})
    }

    const decoded=await jwt.verify(token,"SecretKey")
    if(!decoded){
        return res.status(401).json({msg:"unauthorized"})
    }

    // find user
    const user= (await User.findOne({_id:decoded.userId}))
    req.user=user
    next()
}
module.exports=isAuth