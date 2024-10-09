
import userModel from "../models/userModel.js";
import  validator  from "validator";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// creating jwt token through user id
const createjwt=(id)=>{
   return jwt.sign({id},process.env.SECRET_TOKEN)
}

//User login function
const loginUser=async(req,res)=>{
   try {
    
    const {email, password}=req.body;

    //checking user is exists
    const user=await userModel.findOne({email});
    if (!user) {
       return res.json({success:false,message:"User dosn't not exists"}) 
    }

    // compare both password to login
    const isMatch= await bcrypt.compare(password,user.password)
    if (!isMatch) {
        return res.json({success:false,message:"Invalid parameter"})  
    }

    //creating token for user 
    const token= createjwt(user._id)

    return res.json({success:true,token}) 
   } catch (error) {
    console.log(error);
    res.json({ success:false,message:error})
   }    
}

//Register login function
const registerUser=async(req,res)=>{
   try {
    const {name,email,password}=req.body;

    //Checking email already
    const exists= await userModel.findOne({email})
    if (exists) {
       return res.json({success:false,message:"User already exists"})
    }

    //checking email valid or not
    if (!validator.isEmail(email)) {
        return res.json({success:false,message:"please Enter valid email"})
    }
    //checking password length 
    if (password.length > 8) {
        return res.json({success:false,message:"please Enter Strong Password"})
    }

    //hashing password
    const salt =await bcrypt.genSalt(10)
    const hashingPassword= await bcrypt.hash(password,salt);

    //creating User
    const newUser=new userModel({
        name,
        email,
        password:hashingPassword
    })

    //saving User with jwt token
    const user=await newUser.save()
    const token = createjwt(user._id)
    res.json({
        success:true,
        token
    })


   } catch (error) {
    console.log(error);
    res.json({ success:true,message:error})
    
    
   }
}

//Admin login function
const adminUser=async(req,res)=>{
    try {
      const {email,password} =req.body;
      if(email===process.env.ADMIN_USERNAME && password===process.env.ADMIN_PASSWORD){
           //creating token to authorized admin
            const token=jwt.sign(email+password,process.env.SECRET_TOKEN)
            res.json({success:true,token})
      }  else{
        res.json({success:false,message:"Invalid parameter"})
      }
    } catch (error) {
        console.log(error);
        res.json({ success:true,message:error})
        
    }
}

export {loginUser,registerUser,adminUser};