import express from "express"
import {addToCart,updateToCart,getUserCart, deleteToCart} from "../controllers/cartController.js"
import authUser from "../middleware/auth.js";

const cartRouter=express.Router();

cartRouter.post("/add",authUser,addToCart)
cartRouter.post("/update",authUser,updateToCart)
cartRouter.post("/user-cart",authUser,getUserCart)
cartRouter.delete("/delete",authUser,deleteToCart)

export default cartRouter