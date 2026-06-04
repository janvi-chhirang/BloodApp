const jwt=require("jsonwebtoken")

module.exports=(req,res,next)=>{
   try{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY)
    if(!decoded){
        return res.status(401).json({message:"Unauthorized"})
    }

    req.user=decoded
    next()

   }catch(error){
    return res.status(401).json({message:"Unauthorized"})
   }
}
