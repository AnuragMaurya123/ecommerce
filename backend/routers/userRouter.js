import express from "express"
import { loginUser,registerUser,adminUser, getUserProfile, updateUser } from "../controllers/userController.js"
import authUser from "../middleware/auth.js";
import upload from '../middleware/multer.js';
const userRouter=express.Router();
 userRouter.post("/register",upload.single('photo'),registerUser);
 userRouter.post("/login",loginUser);
 userRouter.post("/admin",adminUser);
 userRouter.get("/profile",authUser,getUserProfile);
 userRouter.post("/update/:id", authUser, upload.single('photo'), updateUser);

 export default userRouter;