
import userModel from "../models/userModel.js";
import {v2 as cloudinary} from "cloudinary"
import  validator  from "validator";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import mongoose from "mongoose";

// creating jwt token through user id
const createjwt=(id)=>{
   return jwt.sign({id},process.env.SECRET_TOKEN,{expiresIn:"15d"})
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
    const {name,email,password,phone,gender}=req.body;
    //getting images
    let photo = req.file;

    //Checking email already
    const exists= await userModel.findOne({email})
    if (exists) {
       return res.json({success:false,message:"User already exists"})
    }
    //for uploading image 
    let uploadResult=null
    if (photo.path) {
        uploadResult = await cloudinary.uploader.upload(photo.path, { resource_type: "image" });
    } else {
        uploadResult = { secure_url: "https://res.cloudinary.com/dbg64eker/image/upload/v1727327044/profile_xpm84y.webp" };
    }

    //checking email valid or not
    if (!validator.isEmail(email)) {
        return res.json({success:false,message:"please Enter valid email"})
    }
    //checking password length 
    if (password.length < 8) {
        return res.json({success:false,message:"please Enter Strong Password"})
    }
    //checking Phone length 
    if (phone.length < 8) {
        return res.json({success:false,message:"please Enter Strong Password"})
    }
    

    //hashing password
    const salt =await bcrypt.genSalt(10)
    const hashingPassword= await bcrypt.hash(password,salt);

    //creating User
    const newUser=new userModel({
        name,
        email,
        phone,
        gender,
        password:hashingPassword,
        photo: uploadResult.secure_url, 
    })

    //saving User with jwt token
    const user=await newUser.save()
    const token = createjwt(user._id)
    res.json({
        success:true,
        token,
    })


   } catch (error) {
    console.log(error);
    res.json({ success:true,message:error})
    
    
   }
}

//update user function
const updateUser = async (req, res) => {
    const id = req.params.id;
     // Validate the ID format
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }
       // Check if user exists
       const user = await userModel.findById(id);
       if (!user) {
           return res.status(404).json({ success: false, message: "User not found" });
       }
    try {
       
        const { name, email, password, phone, gender } = req.body;
        let photo = req.file;
       

        // Prepare the update data object
        const updateData = {};

        // Handle image upload if a new image is provided
        if (photo) {
            // Extract the public ID from the existing photo URL if it exists
            if (user.photo) {
                const publicId = user.photo.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            // Upload the new image
            const newPhoto = await cloudinary.uploader.upload(photo.path, { resource_type: "image" });
            updateData.photo = newPhoto.secure_url;
        }

        // Validate phone number length
        if (phone) {
            if (phone.length !== 10) {
                return res.status(400).json({ success: false, message: "Please enter a valid phone number." });
            }
            updateData.phone = phone;
        }

        // Validate and hash the password if provided
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ success: false, message: "Your password should be at least 8 characters long." });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        // Update other fields if provided
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (gender) updateData.gender = gender;

        // Update the user details in the database
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        // If user was not found during update
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const token = createjwt(updatedUser._id)
        const { password:_, ...rest } =updatedUser._doc

        res.status(200).json({ success: true, message: "Successfully updated", data: {rest}, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, could not update user" });
    }
};

const getUserProfile = async (req, res) => {
    try {
        // Getting userId from middleware
        const { userId } = req.body;

        // Finding user profile
        const user = await userModel.findOne({ _id: userId });
        // If user not found
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Exclude password from user data
        const { password, ...rest } = user._doc;
        return res.json({ success: true, data: { ...rest } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong, can't get your profile" });
    }
};



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

export {loginUser,registerUser,adminUser,getUserProfile,updateUser};