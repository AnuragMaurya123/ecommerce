import jwt from "jsonwebtoken";

// function for admin is authorized or not
const adminAuth=(req,res,next)=>{
    try {
        //getting token
        const {token}=req.headers;
      
        if (!token) {
            res.json({ success: false, msg:"Your not Authorized to Login this page"});           
        }
        
        //verify token is genuine 
        const token_decode=jwt.verify(token,process.env.SECRET_TOKEN);
        if (token_decode !== process.env.ADMIN_USERNAME+process.env.ADMIN_PASSWORD) {
            res.json({ success: false, msg:"Your not Authorized to Login this page"});           
        }
        next();

        
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error.message})
        
    }
}

export default adminAuth