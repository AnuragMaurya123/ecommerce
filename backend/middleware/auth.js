import jwt from "jsonwebtoken";

// function for admin is authorized or not
const authUser=(req,res,next)=>{
     //getting token

    const {token}=req.headers;
    
    if (!token) {
        res.json({ success: false, msg:"Your not Authorized Login Again"});           
    }
    try {
        //verify token is genuine 
        const token_decode=jwt.verify(token,process.env.SECRET_TOKEN);
        req.body.userId=token_decode.id 
        next();
   
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error.message})
        
    }
}

export default authUser