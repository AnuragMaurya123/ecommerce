import jwt from "jsonwebtoken";

// function for admin is authorized or not
const authUser=(req,res,next)=>{
     //get token from header
     const authToken=req.headers.authorization

     //checking token exists 
     if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({success:false, message:"No token, Your not Authorized Please Login Again"}) 
     }
 
     try {
         //spilting bearer from token
        const token = authToken.split(" ")[1];
        //decoding token 
        const decoded_token= jwt.verify(token,process.env.SECRET_TOKEN)
        //after decoding token passing id and role
        req.body.userId=decoded_token.id
         next()
     } catch (error) {
         if(error.name === "TokenExpiredError"){
          return res.status(401).json({ success:false,message:"Session is Expire! Please Login Again"})
         }
        console.log(error);
        
        return res.status(401).json({ success:false,message:"Invalid Session! Please Login Again"})
     }
   
}

export default authUser